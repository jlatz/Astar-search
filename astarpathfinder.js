function AStarPathFinder(start, end) {
    
    this.lastCheckedNode = start;
    this.openSet = [];
    this.closedSet = [];
    this.start = start;
    this.end = end;

    // openSet starts with beginning node only
    this.openSet.push(start);
    
    //Function to delete element from the array
    this.removeFromArray = function(arr, elm){ 
        for(var i = arr.length-1; i>= 0; i--){
            if(arr[i] == elm){
                //splice deletes an element at that perticular index
                arr.splice(i,1);
            }
        }
    }
    
    this.heuristic = function(a,b) {
        var d = dist(a.i,a.j,b.i,b.j);
        //var d = abs(a.i - b.i) + abs(a.j - b.j);
        return d;
    }
    
    this.step = function() {
        
        if (this.openSet.length > 0) {
            //current is the node in openSet having the lowest fScore[] value
            var lowestIndex = 0;
            for(var i = 0; i < this.openSet.length; i++){
                if(this.openSet[i].f < this.openSet[lowestIndex].f){
                    lowestIndex = i;
                }
            }
    
            var current = this.openSet[lowestIndex];
            this.lastCheckedNode = current;

            //current index == this.end then algorithm is done
            if(current === this.end) {
                console.log("DONE!");
                noLoop();
                return -1;
            }
    
            //Best option moves from openSet to closedSet
            this.removeFromArray(this.openSet, current)
            this.closedSet.push(current);
    
            //Check all the neighbors
            var neighbors = current.neighbors;

            for(var i = 0; i<neighbors.length; i++){
                var neighbor = neighbors[i];
    
                //What is the next valid spot
                if(!this.closedSet.includes(neighbor) && !neighbor.wall) {
                    var tempG = current.g + this.heuristic(neighbor, current);
                    
                    //Is this a better path than before?    
                    if(!this.openSet.includes(neighbor)) {
                        this.openSet.push(neighbor);
                    } else if(tempG >= neighbor.g) {
                        //No, it's not a better path
                        continue;
                    } 
                    neighbor.g = tempG;
                    neighbor.h = this.heuristic(neighbor, end);    
                    neighbor.f = neighbor.g + neighbor.h;
                    neighbor.previous = current;
                        
                }
            }
            return 0;
        } else {
            console.log("no solution");
            return -1;
            //no solution
        }
    }
}    