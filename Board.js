// Board
var Board={
    // init func
    createNew: function(g,w,h,pw,terrain,res,building){
        var board={};
        
        // Class members
        board.game=g;
        board.width=w;
        board.height=h;
        board.map=g.add.group();
        
        // returns the tile sprite at [i]
        board.at=function(i){return Board.at(board,i);};
        // returns the adjacent index at clock direction [cd] of tile [i]
        board.adjacent=function(i,cd,warning){return Board.adjacent(board,i,cd,warning);};
        // returns all adjacent indice within [N] steps of tile [i]
        board.allAdjacent=function(i,N){return Board.allAdjacent(board,i,N);};
        // returns the (x,y) of i
        board.xyOf=function(i){return Board.xyOf(board,i);};
        // returns the step distance between i and j
        board.distanceOf=function(i,j){return Board.distanceOf(board,i,j);};
        
        // init
        var N=w*h;
        var ph=pw*(1.732/2.0);
        for(var i=0;i<N;i++){
            var ix=i%w;
            var iy=Math.floor(i/w);
            var x=pw*0.75*ix;
            var y=ph*iy;
            if(ix%2===1){
                y+=ph*0.5;
            }
            // create the tile group
            var oneTile=g.add.group(board.map);
            oneTile.x=x;
            oneTile.y=y;
            
            // create map table
            var terrainTable=['undefined', 'coast', 'desert', 'grass', 'mountain', 'water'];
            var resTable=['undefined', 'forest', 'oil'];
            var buildingTable=['undefined', 'apartments', 'factory', 'hospital', 'palace', 'shanties'];
            
            // create terrain, res and building
            var terrainIndex=parseInt(terrain[i],10);
            oneTile.create(0,0,terrainTable[terrainIndex]);
            
            var resIndex=parseInt(res[i],10);
            if(resIndex>=1){
                oneTile.create(0,0,resTable[resIndex]);
            }
            
            var buildingIndex=parseInt(building[i],10);
            if(buildingIndex>=1){
                oneTile.create(0,0,buildingTable[buildingIndex]);
            }
        }
        return board;
    },

    // returns the tile sprite at [i]
    at: function(b,i){
        return b.map.children[i];
    },
    // returns the adjacent index at clock direction [cd] of tile [i]
    adjacent: function(b,i,cd,warning){
        var w=b.width, h=b.height;
        var x=i%w;
        //              0   1   2   3   4   5   6   7   8   9   10  11
        var adj_even=[-w, -w+1,-w+1,0, +1,  +1, +w,-1,  -1, 0,  -w-1,-w-1];
        var adj_odd= [-w, +1,   +1, 0, +w+1,+w+1,+w,+w-1,+w-1,0,-1,     -1];
        // see if it is the leftmost/rightmost
        if(x===0){
            adj_even[7]=0, adj_even[8]=0, adj_even[10]=0, adj_even[11]=0;
        }else if(x===w-1){
            adj_even[1]=0, adj_even[2]=0, adj_even[4]=0, adj_even[5]=0;
        }
        var newIndex=(x%2===0?i+adj_even[cd]:i+adj_odd[cd])
        if(newIndex<0 || newIndex>=w*h){
            if(warning) console.warn('[Board] Tile '+i+' does not have an adjacent at '+cd);
            return null;
        }else if(newIndex===i){
            if(warning) console.error('[Board] The clock direction should not be '+cd);
            return null;
        }else{
            return newIndex;
        }
    },
    // returns all adjacent indice within [N] steps of tile [i]
    allAdjacent: function(b,i,N){
        var result=[i];
        var p0=0, p1=1;
        for(var j=0;j<N;j++){
            p1=result.length;
            for(var p=p0;p<p1;p++){
                var index=result[p];
                for(var cd=0;cd<12;cd+=2){
                    var adj=b.adjacent(index,cd);
                    if(adj) result.push(adj);
                }
            }
        }
        result.shift();
        return result;
    },
    // returns the (x,y) of i
    xyOf: function(b,i){
        var w=b.width;
        return {x:i%w, y:Math.floor(i/w)};
    },
    // returns the step distance between i and j
    distanceOf: function(b,i,j){
        var p0=b.xyOf(i), p1=b.xyOf(j);
        if(p0.x===p1.x){
            return Math.abs(p0.y-p1.y);
        }else if(p0.y===p1.y){
            return Math.abs(p0.x-p1.x);
        }else{
            var dx=Math.abs(p0.x-p1.x);
            var dy=Math.abs(p0.y-p1.y);
            if(p0.x%2===1){
                if(p0.y<p1.y){
                    return dx+dy-Math.ceil(dx/2);
                }else{
                    return dx+dy-Math.floor(dx/2);
                }
            }else{
                if(p0.y>p1.y){
                    return dx+dy-Math.ceil(dx/2);
                }else{
                    return dx+dy-Math.floor(dx/2);
                }
            }
        }
    },
};
