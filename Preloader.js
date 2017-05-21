var Preloader={
    preload: function(g) {
        var imageDir = 'images/';

        // Builings
        var buildingDir = imageDir + 'buildings/';
        // Vertical Slice assets
        g.load.image('apartment1',      buildingDir + 'apartment.png');
        g.load.image('armyBase1',       buildingDir + 'armyBase.png');
        g.load.image('farm1',           buildingDir + 'farm.png');
        g.load.image('armyBase1',       buildingDir + "armyBase.png");
        g.load.image('factory1',        buildingDir + 'factory.png');
        g.load.image('lumberYard1',     buildingDir + 'factory.png');
        g.load.image('mansion1',        buildingDir + 'mansion.png');                
        g.load.image('palace1',         buildingDir + 'palace.png');
        g.load.image('park1',           buildingDir + 'park.png');
        g.load.image('police1',         buildingDir + 'police.png');
        g.load.image('road1',           buildingDir + 'road.png');
        g.load.image('school1',         buildingDir + 'school.png');
        g.load.image('shantyTown1',     buildingDir + 'shantyTown.png');
        g.load.image('suburb1',         buildingDir + 'suburb.png');
        g.load.image('rubble1',         buildingDir + 'rubble.png');

        // Building Detail Icons
        var detailIconDir = buildingDir + 'detail_icons/';
        g.load.image('apartment_detail',    detailIconDir + 'apartment.png');
        g.load.image('farm_detail',         detailIconDir + 'farm.jpg');
        g.load.image('armyBase_detail',     detailIconDir + 'armyBase.jpg');
        g.load.image('factory_detail',      detailIconDir + 'factory.jpg');
        g.load.image('lumberYard_detail',   detailIconDir + 'factory.jpg');
        g.load.image('mansion_detail',      detailIconDir + 'mansion.png');
        g.load.image('palace_detail',       detailIconDir + 'palace.png');
        g.load.image('road_detail',         detailIconDir + 'road.jpg');
        g.load.image('school_detail',       detailIconDir + 'school.png');
        g.load.image('shantyTown_detail',   detailIconDir + 'shantyTown.png');
        g.load.image('suburb_detail',       detailIconDir + 'suburb.png');
        g.load.image('park_detail',         detailIconDir + 'park.png');
        g.load.image('detail_icon_frame',   detailIconDir + 'detail_icon_frame.png');

        // Terrain
        var resourceDir = imageDir + 'terrains/';

        // Vertical Slice assets
        g.load.image('grass1',    resourceDir + 'grass1.png');
        g.load.image('grass2',    resourceDir + 'grass2.png');
        g.load.image('grass3',    resourceDir + 'grass3.png');
        g.load.image('mountain1', resourceDir + 'mountain1.png');
        g.load.image('mountain2', resourceDir + 'mountain2.png');
        g.load.image('mountain3', resourceDir + 'mountain3.png');
        g.load.image('water1',    resourceDir + 'water1.png');
        g.load.image('water2',    resourceDir + 'water2.png');
        g.load.image('water3',    resourceDir + 'water3.png');

        // load minister port assets
        var portDir = imageDir + 'ports/';
        for (var port = 0; port < 10; port++) {
            g.load.image('bureaucrat_port_' + port, portDir + 'bureaucrat_port_' + port + '.png');
            g.load.image('military_port_' + port,   portDir + 'military_port_' + port + '.png');
            g.load.image('merchant_port_' + port,   portDir + 'merchant_port_' + port + '.jpg');
        }

        // load ui assets
        var uiDir = imageDir + 'ui/';
        g.load.image('tile_hover_backpanel',            uiDir + 'tile_hover_backpanel.png');
        g.load.image('building_detail_backpanel',       uiDir + 'building_detail_backpanel.png');
        g.load.image('buildMenuBg',                     uiDir + 'buildMenuBg.png');
        g.load.image('buildMenuCover1',                 uiDir + 'buildMenuCover1.png');
        g.load.image('buildMenuCover2',                 uiDir + 'buildMenuCover2.png');
        g.load.image('coalition_backpanel',             uiDir + 'coalition_backpanel.png');
        g.load.image('stats_panel_backpanel',           uiDir + 'stats_panel_backpanel.png');
        g.load.image('money_backpanel',                 uiDir + 'money_backpanel.png');
        g.load.image('peopleViewBg',                    uiDir + 'peopleViewBg.jpg');
        g.load.image('peopleViewLeftBg',                uiDir + 'peopleViewLeftBg.png');
        g.load.image('peopleViewRightBg',               uiDir + 'peopleViewRightBg.png');
        g.load.image('peopleViewContractBg',            uiDir + 'peopleViewContractBg.png');
        g.load.image('incButton',                       uiDir + 'incButton.png');
        g.load.image('decButton',                       uiDir + 'decButton.png');
        g.load.image("pi_prevPage",                     uiDir + "pi_prevPage.png");
        g.load.image("pi_nextPage",                     uiDir + "pi_nextPage.png");
        g.load.image("uiMask",                          uiDir + "uiMask.png");
        g.load.image("event_bg",                        uiDir + "event_bg.png");
        g.load.image('freedomUnrestMeter',              uiDir + "freedomUnrestMeter.png");
        g.load.image('freedomUnrestMeter_foreground',   uiDir + 'freedomUnrestMeter_foreground.png');
        g.load.image('fun_panel_backpanel',             uiDir + 'fun_panel_backpanel.png');
        g.load.image('thermometer_bulb',                uiDir + 'thermometer_bulb.png');
        g.load.image('thermometer_tube',                uiDir + 'thermometer_tube.png');
        g.load.image('page_texture',                    uiDir + 'page_texture.png');
        g.load.image('single_folder_texture',           uiDir + 'single_folder_texture.png');
        g.load.image('double_folder_texture',           uiDir + 'double_folder_texture.png');
        g.load.image('folder_tab_texture',              uiDir + 'folder_tab_texture.png');
        g.load.image('clipboard_menu_texture',          uiDir + 'clipboard_menu_texture.png');
        g.load.image('clipboard_menu_clip',             uiDir + 'clipboard_menu_clip.png');
        g.load.image('global_binder_texture',           uiDir + 'global_binder_texture.png');
        g.load.image('building_binder_texture',         uiDir + 'building_binder_texture.png');
        g.load.image('binder_menu_ring',                uiDir + 'binder_menu_ring.png');
        
        // load particle sprites
        var particleDir = uiDir + 'particles/'
        for (var i = 0; i < 25; i++) {
            g.load.image('whitePuff' + i, particleDir + 'whitePuff' + i + '.png');
        }

        //// load button spritesheets
        var buttonDir = uiDir + 'buttons/';
        g.load.spritesheet('build_button',              buttonDir + 'build_button.png', 144, 80, 3);
        g.load.spritesheet('endturn_button',            buttonDir + 'endturn_button.png', 144, 80, 3);
        g.load.image('endturn_button_mask',             buttonDir + 'endturn_button_mask.png');
        g.load.spritesheet('closeButton',               buttonDir + 'close_button.png', 48, 48, 3);
        g.load.spritesheet('buy_button',                buttonDir + 'buy_button.png', 120, 48, 3);
        g.load.spritesheet('small_generic_button',      buttonDir + 'small_generic_button.png', 120, 48, 3);
        g.load.spritesheet('med_generic_button',        buttonDir + 'med_generic_button.png', 144, 80, 3);
        g.load.spritesheet('large_generic_button',      buttonDir + 'large_generic_button.png', 240, 96, 3);
        g.load.spritesheet('nameplate_button',          buttonDir + 'nameplate_button.png', 360, 40, 3);
        g.load.spritesheet('portrait_border_bureau',    buttonDir + 'portrait_border_bureau.png', 56, 56, 3);
        g.load.spritesheet('portrait_border_finance',   buttonDir + 'portrait_border_finance.png', 56, 56, 3);
        g.load.spritesheet('portrait_border_military',  buttonDir + 'portrait_border_military.png', 56, 56, 3);
        g.load.spritesheet('bracketArrowButton',        buttonDir + 'bracket_arrow.png', 48, 48, 3);
        g.load.spritesheet('triangleArrowButton',       buttonDir + 'triangle_arrow.png', 48, 48, 3);
        g.load.spritesheet('redMinusButton',            buttonDir + 'red_minus_button.png', 48, 48, 3);
        g.load.spritesheet('redPlusButton',             buttonDir + 'red_plus_button.png', 48, 48, 3);
        g.load.spritesheet('yellowMinusButton',         buttonDir + 'yellow_minus_button.png', 48, 48, 3);
        g.load.spritesheet('yellowPlusButton',          buttonDir + 'yellow_plus_button.png', 48, 48, 3);
        g.load.spritesheet('pencil_circle_button',      buttonDir + 'pencil_circle_button.png', 120, 48, 3);
        for(var i = 1; i <= 5; ++i){
            g.load.spritesheet('binder_tab_'+i,         buttonDir + 'binder_tab_'+i+'.png',35,100,3);
        }


        //// load icons
        var iconDir = uiDir + 'icons/';
        g.load.image('freedom_icon',            iconDir + 'freedom_icon.png');
        g.load.spritesheet('money_icon',        iconDir + 'money_icon.png', 46, 46, 3);
        g.load.spritesheet('population_icon',   iconDir + 'population_icon.png', 46, 46, 3);
        g.load.image('homeless_icon',           iconDir + 'homeless_icon.png');
        g.load.image('unemployed_icon',         iconDir + 'unemployed_icon.png');
        g.load.image('unrest_icon',             iconDir + 'unrest_icon.png');
        g.load.spritesheet('year_icon',         iconDir + 'year_icon.png', 46, 46, 3);
        g.load.spritesheet('swiss_icon',        iconDir + 'swiss_account_icon.png', 46, 46, 3);
        g.load.image('construction_icon',       iconDir + 'construction_icon.png');
        g.load.image('person_icon',             iconDir + 'person_icon.png');
        g.load.image('exclamation_01',          iconDir + 'exclamation_01.png');
        g.load.image('exclamation_02',          iconDir + 'exclamation_02.png');
        g.load.image('culture_output_full',     iconDir + 'culture_output_full.png')
        g.load.image('freedom_output_full',     iconDir + 'freedom_output_full.png')
        g.load.image('health_output_full',      iconDir + 'health_output_full.png')
        g.load.image('money_output_full',       iconDir + 'money_output_full.png')
        g.load.image('shelter_output_full',     iconDir + 'shelter_output_full.png')
        g.load.image('unrest_output_full',      iconDir + 'unrest_output_full.png')

        for(var i = 1; i <= 4; ++i){
            g.load.spritesheet('counter_icon'+i,iconDir + 'counter_icon'+i+'.png');
        }

        //// load colors
        var colorDir = uiDir + 'colors/';
        g.load.spritesheet('red',    colorDir + 'red.png');
        g.load.spritesheet('blue',   colorDir + 'blue.png');
        g.load.spritesheet('green',  colorDir + 'green.png');
        g.load.spritesheet('purple', colorDir + 'purple.png');

        //// load unit spritesheets
        var unitDir = imageDir + 'units/';
        g.load.spritesheet('army_idle',            unitDir + 'army_idle.png', 256, 222, 5);
        g.load.image('army_moving',                unitDir + 'army_moving.png');
        g.load.image('soldier_icon',               unitDir + 'soldier_icon.png');
        g.load.image('soldier_counter_background', unitDir + 'soldier_counter_background.png');
        g.load.spritesheet('riot_idle',            unitDir + 'riot_idle.png', 256, 222, 5);
        g.load.image('riot_moving',                unitDir + 'riot_moving.png');
        g.load.image('rioter_icon',                unitDir + 'rioter_icon.png');
        g.load.image('rioter_counter_background',  unitDir + 'rioter_counter_background.png');

        // load json files
        var jsonDir = 'json/';
        g.load.json('stage1',         jsonDir + 'stage1.json');
        g.load.json('stage2',         jsonDir + 'stage2.json');
        g.load.json('stageMain',      jsonDir + 'stageMain.json');
        g.load.json('buildingData',   jsonDir + 'buildingData.json');
        g.load.json('names',          jsonDir + 'Names.json');
        g.load.json('CoalitionQuest', jsonDir + 'CoalitionQuest.json');
        g.load.json('Tutorial',       jsonDir + 'Tutorial.json');
        g.load.json('unitData',       jsonDir + 'unitData.json');

        // Load audio assets (should probably be using FMOD for this)
        var audioDir = 'sounds/';

        //// load music
        var musicDir = audioDir + 'music/';
        g.load.audio('game_loop', musicDir + 'Game_Loop_Rough.wav');

        //// load sfx
        var sfxDir = audioDir + 'sfx/';
        g.load.audio('message_open',  sfxDir + 'messages/message_open_SFX.wav');
        g.load.audio('message_close', sfxDir + 'messages/message_close_SFX.wav');
        g.load.audio('money_earned',  sfxDir + 'money_earned/money_earned_SFX.wav');

        //// load riot sfx
        var riotDir = sfxDir + 'rioters/';
        g.load.audio('rioter_spawn',  riotDir + 'spawn_rioters/spawn_rioters_SFX.wav');
        g.load.audio('rioter_attack', riotDir + 'combat_rioters/combat_rioters_SFX_1.wav');
        g.load.audio('rioter_move',   riotDir + 'move_rioters/move_rioters_SFX_1.wav');
        g.load.audio('rioter_death',  riotDir + 'dying_rioters/dying_rioters_SFX.wav');

        //// load soldier sfx
        var soldierDir = sfxDir + 'soldiers/';
        g.load.audio('soldiers_spawn',  soldierDir + 'spawn_soldiers/spawn_soldiers_SFX.wav');
        g.load.audio('soldiers_attack', soldierDir + 'combat_soldiers/combat_soldiers_SFX.wav');
        g.load.audio('soldiers_move',   soldierDir + 'move_soldiers/move_soldiers_SFX.wav');
        g.load.audio('soldiers_death',  riotDir + 'dying_rioters/dying_rioters_SFX.wav');  // Need to get this one from Matt!!

        for (var i = 1; i <= 14; i++) {
            g.load.audio('cloth_click_' + i, sfxDir + 'clicks/cloth_click/cloth_click_' + i + '_SFX.wav');
        }

        for (var i = 1; i <= 8; i++) {
            g.load.audio('paper_click_' + i, sfxDir + 'clicks/paper_click/paper_click_0' + i + '_SFX.wav');
        }

        for (var i = 1; i <= 5; i++) {
            g.load.audio('building_placement_' + i, sfxDir + 'buildings/building_placement_0' + i + '_SFX.wav');
        }
        g.load.audio('building_ready', sfxDir + 'buildings/building_ready_SFX.wav');

        for (var i = 1; i <= 5; ++i) {
            g.load.audio('empty_click_' + i, sfxDir + 'clicks/empty_click/empty_click_' + i + '_SFX.wav');
        }

        for (var i = 1; i <= 5; ++i) {
            g.load.audio('typewriter_click_' + i, sfxDir + 'clicks/typewriter_clicks/typewriter_clicks_' + i + '.wav');
        }
    }
};