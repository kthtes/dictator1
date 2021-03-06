var showNewBuildings = function(callback) {
    var makeBuildingCompletionEvents = function(list, listIndex) {
        // If we've handled every new building, bail out and execute the callback.
        if (listIndex >= list.length) {
            callback();
            return;
        }

        // Make sure the construction effect gets removed when we display this event
        MainGame.board.at(list[listIndex]).getBuilding().removeConstructionEffect();

        // Figure out our pretty data - like a custom message and image.
        var buildingName = MainGame.board.at(list[listIndex]).getBuilding().playerLabel;

        var article = 'A';
        if (['A', 'E', 'I', 'O', 'U'].includes(buildingName[0])) {
            article = 'An';
        }

        var message = article + ' ' + buildingName + ' has been constructed!';

        // Tween to the tile
        MainGame.board.cameraCenterOn(list[listIndex]);

        // Wait a bit, then spawn the event.
        var timer = MainGame.game.time.create(true);
        timer.add(500, function() {
            MainGame.game.make.audio('building_ready').play();

            var e = Event.createNew();
            e.setModel([
                            {
                                portrait: 'exclamation_01', 
                                description: message, 
                                buttonTexts: ["Continue"]
                            }
                        ]);

            e.setController([
                [function() {
                    e.suicide();
                    makeBuildingCompletionEvents(list, ++listIndex);
                }]
            ]);
        }, null);
        timer.start();
    };

    // Start by getting a list of all new buildings that will appear this turn.
    var newBuildingIndexes = MainGame.board.findBuilding().filter(function(buildingIndex) {
        return (MainGame.board.at(buildingIndex).getBuilding().startingTurn === MainGame.global.turn) && MainGame.board.at(buildingIndex).getBuilding().name !== 'shantyTown';
    });
    
    // Then, start recursively spawning events to handle each notification
    makeBuildingCompletionEvents(newBuildingIndexes, 0);
};

var showHomelessCamps = function(callback) {
    var makeBuildingCompletionEvents = function(list, listIndex) {
        // If we've handled every new building, bail out and execute the callback.
        if (listIndex >= list.length) {
            callback();
            return;
        }

        // Tween to the tile
        MainGame.board.cameraCenterOn(list[listIndex]);

        // Wait a bit, then spawn the event.
        MainGame.game.time.events.add(500, function() {
        var e = Event.createNew();
            e.setModel([
                {
                    portrait: 'exclamation_01', 
                    description: 'A homeless camp has formed due to a lack of available housing!', 
                    buttonTexts: ["Continue"]
                }
            ]);

            e.setController([
                [function() {
                    e.suicide();
                    makeBuildingCompletionEvents(list, ++listIndex);
                }]
            ]);
        }, null);
    };

    // Start by getting a list of all new buildings that will appear this turn.
    var newBuildingIndexes = MainGame.board.findBuilding('shantyTown').filter(function(buildingIndex) {
        return MainGame.board.at(buildingIndex).getBuilding().startingTurn === MainGame.global.turn;
    });
    
    // Then, start recursively spawning events to handle each notification
    makeBuildingCompletionEvents(newBuildingIndexes, 0);
};

var showThermometerUpdate = function(callback) {
    updateHomes(true);

    // Get new delta (how much the thermometer will change by this turn)
    Global.thermometerDelta = Global.freedom + Global.unrest - 100;

    // Apply delta
    Global.thermometerFill = Phaser.Math.clamp(Global.thermometerFill + Global.thermometerDelta, 0, 100);

    // Check if unit spawn
    if (Global.thermometerFill === 100) {
        // Force the panel to update
        MainGame.hud.funPanel.updateData();

        // Wait a bit
        MainGame.game.time.events.add(1000, function() {
            MainGame.game.make.audio('boiling').play();
            
            // Lower the thermometer and spawn a unit
            Global.thermometerFill = 50;

            // Compute angriest citizen
            var workingClass = MainGame.population.lowList();
            workingClass.sort(function(a, b) {
                return b.unrest - a.unrest;
            });
            var citizenToRiot = workingClass[0];
        
            var didSpawn = Unit.spawnUnitAt(Unit.Riot, citizenToRiot.home);

            if (didSpawn) {
                // Tween to the tile
                MainGame.board.cameraCenterOn(citizenToRiot.home);

                // Remove them from their home
                MainGame.board.at(citizenToRiot.home).getBuilding().removePerson();
                citizenToRiot.home = null;

                // Remove them from their workplace
                var workIndex = citizenToRiot.workplace;
                if (workIndex !== null) {
                    var workPlace = MainGame.board.at(workIndex).getBuilding();
                    workPlace.removePerson();
                    citizenToRiot.work = null;
                }

                MainGame.population.people.splice(MainGame.population.people.indexOf(citizenToRiot),1);

                // Wait a bit, then spawn the event.
                MainGame.game.time.events.add(2100, function() {
                    var e = Event.createNew();
                    e.setModel([
                        {
                            portrait: 'exclamation_01', 
                            description: 'A citizen has begun rioting!', 
                            buttonTexts: ["Continue"]
                        }
                    ]);

                    e.setController([
                        [function() {
                            e.suicide();
                            callback();
                        }]
                    ]);
                }, null);
            }
        }, null);
    } else {
        // Else, no spawn occured, so we should just move on
        callback();
    }
};

var showUnitAction = function(callback) {
    var processUnitUpdates = function(unitList, index) {
        // If we've handled every unit, bail out and execute the callback.
        if (index >= unitList.length) {
            callback();
            return;
        }

        // Tween to the tile
        MainGame.board.cameraCenterOn(unitList[index].currentIndex);

        // Update the unit
        unitList[index].takeTurn();

        // Wait a bit, then process the next unit.
        MainGame.game.time.events.add(2100, function() {
            processUnitUpdates(unitList, ++index);
        }, null);
    }

    // Start by getting a list of all active units.
    var units = MainGame.board.findUnits(null).map(function(unitIndex) {
        return MainGame.board.at(unitIndex).getUnit();
    });
    
    // Then, start recursively spawning events to handle each notification
    processUnitUpdates(units, 0);
};

var showMinisterDemotions = function(callback) {
    var processMinisters = function(ministerList, index) {
        if (index >= ministerList.length) {
            callback();
            return;
        }

        // If a minister is going to be demoted, tween to their house, demote them, then create an event window explaining what happened.
        var minister = ministerList[index];
        var tile = MainGame.board.at(minister.home);
        var home = tile.getBuilding();

        if (home.health < 50 || home.shelter < 50 || home.culture < 50) {
            // Tween to the tile
            MainGame.board.cameraCenterOn(minister.home);

            // Handle demotion
            minister.unSetHighClass();
            minister.setLowClass();

            // Wait a bit, then spawn the event.
            MainGame.game.time.events.add(500, function() {
            var e = Event.createNew();
                e.setModel([
                    {
                        portrait: 'exclamation_01', 
                        description: minister.name + ' has been forced to resign as minister due to a decline in their living conditions!', 
                        buttonTexts: ["Continue"]
                    }
                ]);

                e.setController([
                    [function() {
                        tile.setAlert(false);
                        e.suicide();
                        processMinisters(ministerList, ++index);
                    }]
                ]);
            }, null);
        } else {
            // If the minister is fine, just move on to the next one:
            processMinisters(ministerList, ++index);
        }
    }

    // Start by getting a list of all active minsters.
    var ministers = MainGame.population.highList();
    
    // Then, start recursively spawning events to handle each notification
    processMinisters(ministers, 0);
}

var concludeNextTurnSequence = function() {
    var oldPopulation = MainGame.global.yearViewData[MainGame.global.yearViewData.length - 1].population;
    var deltaPopulation = MainGame.population.count() - oldPopulation;

    var financialMessage = (MainGame.global.moneyPerTurn >= 0) ? ('You have earned ₸' + Math.abs(MainGame.global.moneyPerTurn) + '.') : ('You have lost ₸' + Math.abs(MainGame.global.moneyPerTurn) + '.')

    var e = Event.createNew();
    e.setModel([
        {
            portrait: 'exclamation_01', 
            description: 'The year is now ' + (1949 + MainGame.global.turn) + '.\nThe population has increased by ' + deltaPopulation + ' citizens.\n' + financialMessage, 
            buttonTexts: ["OK"]
        }
    ]);

    e.setController([
        [function() {
            e.suicide();
        }]
    ]);
};