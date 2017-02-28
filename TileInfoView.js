// fonts list
var fontBrief=[
	{font:"30px myKaiti", fill:"white", boundsAlignH:"top", boundsAlignV:"middle"},
	{font:"30px myKaiti", fill:"white", boundsAlignH:"top", boundsAlignV:"middle"},
	{font:"30px myKaiti", fill:"lightgreen", boundsAlignH:"top", boundsAlignV:"middle"}
];
var fontDetail=[
	{font:"35px myKaiti", fill:"white", boundsAlignH:"top", boundsAlignV:"middle"},
	{font:"30px myKaiti", fill:"white", boundsAlignH:"top", boundsAlignV:"middle"}
];

var TileBriefInfoView={
    style:{font: "30px myKaiti", fill: "#ffffff", wordWrap: true, wordWrapWidth: 500, boundsAlignH: "center", boundsAlignV: "middle" , backgroundColor: "#ffff00" },
	createNew: function(index){
		console.assert(index || index===0);
		/* global MainGame */
		var game=MainGame.game;
		// bg
		var view=game.add.sprite(0,0,"tile_hover_backpanel");
		// label position
		var startPos={x:view.texture.width*0.5, y:view.texture.height*0.5-30};
		// tile index
		view.index=index;

		// creates 3 lines
		var lines=["terrain", "building", "people"];
		for(var i=0;i<lines.length;i++){
			var oneLine=game.make.text(startPos.x, startPos.y+35*i,"",fontBrief[i]);
			oneLine.anchor.set(0.5);
			view.addChild(oneLine);
			view[lines[i]]=oneLine;
		}
		// Class vars
		// view.terrain
		// view.building
		// view.people
		// --- the above class vars can be accessed now ---

		// Class func
		view.updateInfo=function(tile){return TileBriefInfoView.updateInfo(view,tile)};
		view.updatePos=function(){return TileBriefInfoView.updatePos(view)};
		return view;
	},
	updateInfo: function(t, tile){
		console.assert(tile);
        // show terrain+res info
        t.terrain.text=tile.terrain.key+ (tile.getResType()?" ("+tile.getResType()+")":"" );

        // show building+people info
        if(tile.hasBuilding()){
        	// show building info
        	var bld=tile.getBuilding();
        	t.building.text=bld.name.toUpperCase();
        	// show people info
        	if(bld.maxPeople){
	        	if(bld.subtype==="housing")
	        		t.people.text="Residents:"+bld.people+"/"+bld.maxPeople;
	        	else
	        		t.people.text="Jobs:"+bld.people+"/"+bld.maxPeople;
        	}
        	else
        		t.people.text=" - "
        	// now add color!
        	var colorTable={"?":"yellow", "!":"orangered", "$":"seagreen", "-":"white"};
        	console.assert(colorTable[bld.type], "Unknown building type! Must be ?(bureau), !(mil) or $(commercial).");
        	t.building.addColor(colorTable[bld.type],0);
        	t.people.addColor(colorTable[bld.type],0);
        }
	},
	updatePos: function(t){
        /*global MainGame*/
        var board=MainGame.board;
        var tile=board.at(t.index);
        t.x=board.x+tile.x*board.currentScale;
        t.y=board.y+tile.y*board.currentScale;
        t.scale.set(board.currentScale);
	}
};

var TileDetailInfoView={
    createNew: function(index) {
    	console.assert(index || index===0);

        /*global MainGame*/
        var game=MainGame.game;
        var board = MainGame.board;

        var view = game.add.sprite(0, 0, 'building_detail_backpanel');
        var bdInputPriority = 2;

        // Class vars
        view.name = "BuildingDetail";
        view.index = index;		// Need explanation for what makes these two different

        // bg (the grad)
        var startPos={x:10, y:0};

        // label (bld name/lv)
        var lines=["building","people","health","education","shelter"];
        for(var i=0;i<lines.length;i++){
        	var fontIndex=(i===0?0:1);
        	var oneLine=game.make.text(startPos.x, startPos.y+30*i, fontDetail[fontIndex]);
        	if(i===0)
        		oneLine.anchor.set(0.5);
        	view.addChild(oneLine);
        	view[lines[i]]=oneLine;
        }

        var building=board.at(index).getBuilding();
        console.log(building.startingTurn+" "+MainGame.global.turn);

        if(building.subtype!=="road" && building.type!=="palace" && building.startingTurn>=MainGame.global.turn){
        	if(building.people<building.maxPeople){
        		// Hire button
		        view.addPersonButton = game.make.button(30, startPos.y-50, "btnHire", 
		            function() {
		                //console.log("[MapSelector] Hire people for index: ",view.curIndex);
		                // TODO

		                /*global MainGame*/
		                var bld = MainGame.board.at(view.index).building;
		                if (bld.people >= bld.maxPeople)
		                    return;
		                
		                //console.log("[MapSelector] and the building's type/name is:["+bld.type+","+bld.name+"]");
		                MainGame.population.hire(view.index);
		                //bld.people=bld.people+actual; [this is now done in building.addPerson()]
		                // update display
		                view.people.text="People: "+bld.people+"/"+bld.maxPeople;

		                for(var outIndex=0;outIndex<bld.effects.length;++outIndex){
		                    var outType = bld.effects[outIndex].type;
		                    if(outType==="health"){ 
		                        outType="Health";
		                        /*global updateHomesNearOutput*/
		                        updateHomesNearOutput(view.index);
		                    }else if(outType==="education"){
		                        outType="Edu";
		                        /*global updateHomesNearOutput*/
		                        updateHomesNearOutput(view.index);
		                    }else if(outType==="freedom"){
		                        outType="Extra Freedom";
		                        /*global updateHomesNearOutput*/
		                        updateHomesNearOutput(view.index);
		                    }else if(outType==="unrest"){
		                        outType="Extra Unrest";
		                        /*global updateHomesNearOutput*/
		                        updateHomesNearOutput(view.index);
		                    }else if(outType==="money"){    outType="Money";    }

		                    if(outIndex===0){
		                        view.health.text=outType+" Output: "+bld.effects[outIndex].outputTable[bld.people];
		                    }else if(outIndex===1){
		                        view.education.text=outType+" Output: "+bld.effects[outIndex].outputTable[bld.people];
		                    }else if(outIndex===2){
		                        view.shelter.text=outType+" Output: "+bld.effects[outIndex].outputTable[bld.people];
		                    }
		                }
		                /*global updatePopulation*/
		                updatePopulation(false,false);
		            }, view, 0, 1, 2, 3);
		        view.addPersonButton.input.priorityID = bdInputPriority;
		        view.addChild(view.addPersonButton);
        	}
        	if(building.people>0){
		        // Fire button
		        view.removePersonButton = game.make.button(100, startPos.y-50, "btnFire",
		            function() {
		                /*global MainGame*/
		                var bld=MainGame.board.at(view.index).building;
		                if(bld.people<=0)
		                    return;
		                
		                MainGame.population.fire(view.index);

		                // update display
		                view.people.text="People: "+bld.people+"/"+bld.maxPeople;

		                for(var outIndex = 0; outIndex < bld.effects.length; outIndex++) {
		                    var outType = bld.effects[outIndex].type;
		                    if(outType==="health"){ 
		                        outType="Health";
		                        /*global updateHomesNearOutput*/
		                        updateHomesNearOutput(view.index);
		                    }else if(outType==="education"){
		                        outType="Edu";
		                        /*global updateHomesNearOutput*/
		                        updateHomesNearOutput(view.index);
		                    }else if(outType==="freedom"){
		                        outType="Extra Freedom";
		                        /*global updateHomesNearOutput*/
		                        updateHomesNearOutput(view.index);
		                    }else if(outType==="unrest"){
		                        outType="Extra Unrest";
		                        /*global updateHomesNearOutput*/
		                        updateHomesNearOutput(view.index);
		                    }else if(outType==="money"){
		                        outType="Money";
		                        MainGame.global.updateMoneyPerTurn();                    }

		                    if(outIndex===0){
		                        view.health.text=outType+" Output: "+bld.effects[outIndex].outputTable[bld.people];
		                    }else if(outIndex===1){
		                        view.education.text=outType+" Output: "+bld.effects[outIndex].outputTable[bld.people];
		                    }else if(outIndex===2){
		                        view.shelter.text=outType+" Output: "+bld.effects[outIndex].outputTable[bld.people];
		                    }
		                }
		                /*global updatePopulation*/
		                updatePopulation(false,false);
		            }, view, 0,1,2,3);
		        view.removePersonButton.input.priorityID = bdInputPriority;
		        view.addChild(view.removePersonButton);
        	}
    	}
		// Class func
		view.updateInfo=function(tile){return TileDetailInfoView.updateInfo(view,tile)};
		view.updatePos=function(){return TileDetailInfoView.updatePos(view)};

        return view;
	},
	updateInfo: function(view, tile){
        if(!tile.hasBuilding())
            return;

        var b = MainGame.board;
        var bld = tile.getBuilding();

        // Let's figure out what kind of info we need to display
        var displayName = '';

        // If this tile has no building, display terrain info
        if (bld === null || bld.isEmpty()) {
            // If this terrain has a natural resource, display that, otherwise display the terrain name
            displayName = tile.getRes().key === '__default' ? tile.terrain.key : tile.getRes().key;

            view.people.text = ''; // Make sure this text gets cleared if it's not going to be used
        } else {
            displayName = bld.name;// + " Lv"+bld.level;

            // Most buildings can contain people, but some (like roads) cannot. Be sure to correct for that.
            if (bld.subtype === 'road') {
                view.people.text = '';
            } else {
                view.people.text = "People: " + bld.people + "/" + bld.maxPeople;
            }

            var str3="";
            var str4="";
            var str5="";
            
            if(bld.subtype==="housing"){
                str3="Health: "+bld.health;
                str4="Education: "+bld.education;
                str5="Shelter: "+bld.shelter;
            }
            if(bld.effects[0].type!==null){
                for(var outIndex=0;outIndex<bld.effects.length;++outIndex){
                    var outType = bld.effects[outIndex].type;
                    var outValue = bld.effects[outIndex].outputTable[bld.people];
                    if(outType==="health"){ outType="Health";   }
                    else if(outType==="education"){ outType="Edu";  }
                    else if(outType==="freedom"){   outType="Freedom";    }
                    else if(outType==="unrest"){    outType="Unrest"; }
                    else if(outType==="money"){
                        outType="Money";
                        outValue="$"+outValue+"K";
                    }
            
                    if(outIndex===0){
                        str3=outType+" Output: "+outValue;
                    }else if(outIndex===1){
                        str4=outType+" Output: "+outValue;
                    }else if(outIndex===2){
                        str5.text=outType+" Output: "+outValue;
                    }
                }
            }
            view.health.text=str3;
            view.education.text=str4;
            view.shelter.text=str5;
        }

        view.building.text = displayName;
	},
	updatePos: function(view){
		/*global MainGame*/
		var board=MainGame.board;
		var rect=board.rectOf(view.index,board.currentScale);

        view.x=rect.x-board._offset.x+rect.w*.85;
        view.y=rect.y-board._offset.y;
        view.scale.set(board.currentScale);
	}
};