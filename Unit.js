var Unit = {
    unitData: null,

    loadUnitData: function() {
        if (Unit.unitData === null) {
            Unit.unitData = MainGame.game.cache.getJSON('unitData');
            console.log("[Unit] Data loaded.");
        }
    },
    
    createNew: function(data, startingIndex) {
        console.assert(data === null, "[Unit] Cannot instantiate unit with no data!");
        console.assert(startingIndex < 0 || startingIndex >= MainGame.board.tileCount, "[Unit] Cannot place unit at invalid index!");

        var unit = MainGame.game.make.sprite(0, 0, data.name);

        unit.name = data.name;
        unit.health = data.startingHealth;
        unit.currentIndex = startingIndex;

        unit.update = function() { Unit.update(unit); };
        unit.move = function(newIndex) { Unit.move(unit, newIndex); };
        unit.attackUnit = function(targetedIndex) { Unit.attackUnit(unit, targetedIndex); };
        unit.attackBuilding = function(targetedIndex) { Unit.attackBuilding(unit, targetedIndex); };

        return unit;
    },

    update: function(unit) {
        console.log("[Unit] doing an update!");
    },

    move: function(unit, newIndex) {
        console.assert(newIndex < 0 || newIndex >= MainGame.board.tileCount, "[Unit] Cannot move unit to invalid index!");

        var currentTile = MainGame.board.at(unit.currentIndex);
        var newTile = MainGame.board.at(newIndex);

        // TODO: Maybe lerp an animation as it moves between tiles?
        if (!newTile.hasUnit()) {
            newTile.setUnit(unit);
            currentTile.setUnit(null);
            unit.currentIndex = newIndex;
        } else {
            // Do I need to merge the groups?
        }
    },

    attackUnit: function(unit, targetedIndex) {
        console.assert(targetedIndex < 0 || targetedIndex >= MainGame.board.tileCount, "[Unit] Cannot target an invalid index!");

        var targetedTile = MainGame.board.at(targetedIndex);

        if (targetedTile.hasUnit()) {
            // Play attack sound
            // Damage the target
            targetedTile.getUnit().takeDamage(1);
        }
    },

    attackBuilding: function(unit, targetedIndex) {
        console.assert(newIndex < 0 || newIndex >= MainGame.board.tileCount, "[Unit] Cannot target an invalid index!");

        var targetedTile = MainGame.board.at(targetedIndex);

        if (targetedTile.hasBuilding()) {
            var building = targetedTile.getBuilding();

            building.health -= 1;
            
            if (building.health <= 0) {
                targetedTile.removeBuilding();
            }
        }
    },

    takeDamage: function(unit, amount) {
        // Play damage sound
        unit.health -= amount;

        if (unit.health <= 0) unit.kill();
    }

    kill: function(unit) {
        // Play death sound
        
        // Play death animation

        // Remove from game
        MainGame.board.at(unit.currentIndex).setUnit(null);
    }
};