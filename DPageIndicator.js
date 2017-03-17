/* global MainGame */
var DPageIndicator={
	// TODO: set font style here
	style: {font:"20px myKaiti", fill:"white", boundsAlignH: 'center', boundsAlignV: 'middle', shadowBlur: 1, shadowColor: "rgba(0,0,0,0.75)", shadowOffsetX: 2, shadowOffsetY: 2 },
	// ****************** Attention ****************** //	
	// pageCount
	// layOut: {width,textPos}
	// *pageChangedCallback: function(pageIndex)
	// (* === optional)
	createNew: function(pageCount, layout, pageChangedCallback, priorityID){
		var v=MainGame.game.add.group();
		v.pageCount=(pageCount?pageCount:1);
		v.curPage=0;
		v.pageChangedCallback=pageChangedCallback;
		// add two buttons as sprites
		v.prevPage=MainGame.game.make.button(0,0,"triangleArrowButton",function(){
			DPageIndicator.onPrevPage,v},1,0,2,1);
		v.prevPage.anchor.x=1;
		v.prevPage.scale.x*=-1;
		v.prevPage.input.priorityID=priorityID;
		v.prevPage.visible=false;
		v.addChild(v.prevPage);
		v.nextPage=MainGame.game.make.button(0,0,"triangleArrowButton",function(){
			DPageIndicator.onNextPage,v},1,0,2,1);
		v.nextPage.x=layout.width-v.nextPage.width;
		v.nextPage.input.priorityID=priorityID;
		v.nextPage.visible=(pageCount>1);
		v.addChild(v.nextPage);
		// add & update page text 4/7
		v.pageText=MainGame.game.make.text(0,0,"", DPageIndicator.style);
		v.addChild(v.pageText);
		DPageIndicator._setPageText_(v);
		v.pageText.x=layout.textPos.x, v.pageText.y=layout.textPos.y;

		// Class funcs
		// returns the current page index (starting 0)
		v.getCurPage=function(){return v.curPage};
		// sets the callback func of PageChanged
		v.setPageChangedCallback=function(callback){v.pageChangedCallback=callback};

		return v;
	},
	onPrevPage: function(){
		// console.log("PageIndicator: onPrevPage");
		this.curPage--;
		if(this.curPage===0)
			this.prevPage.visible=false;
		this.nextPage.visible=true;
		DPageIndicator._setPageText_(this);
		if(this.pageChangedCallback)
			this.pageChangedCallback(this.curPage);
	},
	onNextPage: function(){
		// console.log("PageIndicator: onNextPage");
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
