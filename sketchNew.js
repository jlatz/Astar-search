

var cols = 50;
var rows = 50;
var grid = new Array(cols);

var start;
var end;
var w, h;

var path = [];
var pathfinder;

function setup(){
    createCanvas(400,400);
    console.log('A*');
  
    w = width / cols;
    h = height / rows;
    
    //making 2d array
    for (var i =0; i<cols; i++) {
        grid[i] = new Array(rows);
    }
    
    for(var i = 0; i < cols; i++) {
        for(var j = 0; j < rows; j++) {
            //each spot in the grid an object
            grid[i][j] = new Spot(i, j, w, h, grid);
        }
    }
    
    for(var i = 0; i < cols; i++) {
        for(var j = 0; j < rows; j++) {
            grid[i][j].addNeighbors(grid);
        }
    }

    start = grid[0][0];
    end = grid[cols - 1][rows -1];

    start.wall = false;
    end.wall = false; 
    
    pathfinder = new AStarPathFinder(start, end);
    
    console.log(grid);
}
    
function draw() {
    
    pathfinder.step();
    
    background(0);
    

    for(var i = 0; i <cols; i++) {
        for(var j = 0; j<rows; j++) {
            grid[i][j].show(color(255)); 
        }
    }
    
    for(var i = 0; i < pathfinder.closedSet.length; i++) {
        pathfinder.closedSet[i].show(color(255,0,0));
    }
        
    for(var i = 0; i < pathfinder.openSet.length; i++) {
        pathfinder.openSet[i].show(color(0,255,0));
    }
       
    var path = calcPath(pathfinder.lastCheckedNode);
    drawPath(path);
}    
function calcPath(endNode) {

    path = [];
    var temp = endNode;
    path.push(temp);
    while(temp.previous){
        path.push(temp.previous);
        temp = temp.previous;    
    }   
    return path;
}

function drawPath(path){
    for(var i = 0; i < path.length; i++) {
       path[i].show(color(0,0,255));
    }
    
}
