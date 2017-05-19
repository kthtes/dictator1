// singleton class for the main game
// a singleton class should use init() for initialization

var MainGame={
    // define props here
    developer: "Ludocracy III",
    
    // the game var
    game: null,
    
    // the board var
    board: null,
    
    // the Map Selector
    // mapSelector: null,

    // The HUD
    hud: null,

    // the people var
    population: null,
    
    // singleton func to initialize
    initialized: false,
    init: function(g){
        if(MainGame.initialized===true)
            return;

        // now init
        MainGame.initialized=true;
        
        // set game var
        MainGame.game=g;
        
        // Prevent default right click behavior
        MainGame.game.canvas.oncontextmenu = function (e) { e.preventDefault(); }

        // set population var
        MainGame.population=null;

        // set global var
        /*global Global*/
        MainGame.global=Global;

        console.log('[MainGame] init with (w,h)=('+g.width+','+g.height+')');
    },
    
    // start the game
    start: function(){
        console.assert(MainGame.initialized);
        console.log('[MainGame] start...');

        // Play Music
        MainGame.music = MainGame.game.add.audio('game_loop');
        MainGame.music.play('', 0, 1, true); // Confusing, but should set the track to loop at full volume
        //MainGame.music.loopFull(1.0);
        
        // create board
        var stage=MainGame.game.cache.getJSON('stageMain');

        /*global Board*/
        MainGame.board=Board.fromJSON(JSON.stringify(stage));

        /*global Population*/
        MainGame.population=Population.createNew(stage.population);

        /*global Hud*/
        MainGame.hud = Hud.createNew();

        /*global updatePopulation*/
        updatePopulation(false,true);
        Global.updateYearViewData();
        //MainGame.global.updateFreedomUnrest();

        /*global Tutorial*/
        Tutorial.generate();
    },
    
    nextTurn: function(){
        // MainGame.board.nextTurn();

        // MainGame.population.nextTurn();

        /*global CoalitionQuest*/
        CoalitionQuest.generate(Global.turn, MainGame.population.highList());
        
        // Everything is currently being handled in Global.nextTurn()
        MainGame.global.nextTurn();
        // TODO
    },
};
