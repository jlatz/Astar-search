function Spot(i, j, w, h, grid) {

    this.grid = grid;
    
    //Location
    this.i = i;
    this.j = j;
    this.w = w;
    this.h = h;

    this.f = 0;
    this.g = 0;
    this.h = 0;
    this.neighbors = [];
    this.previous = undefined;
    this.wall = false;
    
    if(random(1) < 0.4) {
        this.wall = true;
    }
    
    //Display
    this.show = function(color) {
        fill(color);
        if(this.wall) {
            fill(0);
        }
        noStroke();
        rect(this.i * w, this.j * h, w-1, h-1);
    
    }
    
    this.addNeighbors = function(grid){
        if(i < cols-1) {
            this.neighbors.push(grid[this.i+1][this.j]);
        }
        if(i > 0) {
            this.neighbors.push(grid[this.i-1][this.j]);
        }
        if(j < rows-1) {
            this.neighbors.push(grid[this.i][this.j+1]);
        }
        if(j > 0) {
            this.neighbors.push(grid[this.i][this.j-1]);
        }
        if(i > 0 && j > 0) {
            this.neighbors.push(grid[this.i-1][this.j-1]);    
        }
        if(i < cols-1 && j > 0) {
            this.neighbors.push(grid[this.i+1][this.j-1]); 
        }
        if(i > 0 && j < rows-1) {
            this.neighbors.push(grid[this.i-1][this.j+1]); 
        }
        if( i < cols-1 && j < rows -1) {
            this.neighbors.push(grid[this.i+1][this.j+1]); 
        }
    }
}