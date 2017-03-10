/* global MainGame */

var DPageIndicator={
	// ****************** Attention ****************** //	
	// pageCount
	// layOut: {width,textPos}
	// *pageChangedCallback: function(pageIndex)
	// (* === optional)
	createNew: function(pageCount, layout, pageChangedCallback){
		var v=MainGame.game.add.group();
		v.pageCount=pageCount;
		v.curPage=0;
		v.pageChangedCallback=pageChangedCallback;
		// add two buttons as sprites
		v.prevPage=MainGame.game.make.sprite(0,0,"pi_prevPage");
		v.prevPage.inputEnabled=true;
		v.prevPage.input.priorityID=5;
		v.prevPage.events.onInputDown.add(DPageIndicator.onPrevPage,v);
		v.prevPage.visible=false;
		v.addChild(v.prevPage);
		v.nextPage=MainGame.game.make.sprite(0,0,"pi_nextPage");
		v.nextPage.x=layout.width-v.nextPage.width;
		v.nextPage.inputEnabled=true;
		v.nextPage.input.priorityID=5;
		v.nextPage.events.onInputDown.add(DPageIndicator.onNextPage,v);
		v.addChild(v.nextPage);
		// add & update page text 4/7
		v.pageText=MainGame.game.make.text(0,0,"");
		v.addChild(v.pageText);
		DPageIndicator._setPageText_(v);
		v.pageText.x=layout.textPos.x, v.pageText.y=layout.textPos.y;
		return v;
	},
	onPrevPage: function(){
		console.log("PageIndicator: onPrevPage");
		this.curPage--;
		if(this.curPage===0)
			this.prevPage.visible=false;
		this.nextPage.visible=true;
		DPageIndicator._setPageText_(this);
		if(this.pageChangedCallback)
			this.pageChangedCallback(this.curPage);
	},
	onNextPage: function(){
		console.log("PageIndicator: onNextPage");
		this.curPage++;
		if(this.curPage===this.pageCount-1)
			this.nextPage.visible=false;
		this.prevPage.visible=true;
		DPageIndicator._setPageText_(this);
		if(this.pageChangedCallback)
			this.pageChangedCallback(this.curPage);
	},
	_setPageText_: function(view){
		view.pageText.text=""+(view.curPage+1)+" / "+view.pageCount;
	},
};

var PeopleView={
	createNew: function(){
		var pv=MainGame.game.add.sprite(0,0,'peopleViewBg');

		// /*global DListView*/
		pv.left=DListView.createNew(
			{normal:"peopleViewLeftBg",high:"peopleViewRightBg"}, 
			{l:56,t:50}, 			// margin
			{w:200,h:50}, 			// item size
			function(prev,cur){		// item callback
				console.log("Item selected: prev, cur="+prev+","+cur);
			},
			false					// is horizontal
		);
		pv.addChild(pv.left);

		// test: create 3 texts
		var text1=MainGame.game.make.text(0,0,"Text1");
		pv.left.add(text1,0);
		var text2=MainGame.game.make.text(0,0,"Text2");
		pv.left.add(text2,1);
		var text3=MainGame.game.make.text(0,0,"Text3");
		pv.left.add(text3,2);

		pv.pageInd=DPageIndicator.createNew(7,{
			width:300,
			textPos:{x:200,y:50}
		},function(index){
			console.log("Page changed to:"+index);
		});
		pv.pageInd.x=50, pv.pageInd.y=300;
		pv.addChild(pv.pageInd);

		// Class funcs
		pv.setVisible=function(value){pv.visible=value};

		return pv;
	},
};
