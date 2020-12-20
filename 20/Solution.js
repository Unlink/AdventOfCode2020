(async () => {
  const transpose = matrix => {
    for (let row = 0; row < matrix.length; row++) {
      for (let column = 0; column < row; column++) {
        let temp = matrix[row][column]
        matrix[row][column] = matrix[column][row]
        matrix[column][row] = temp
      }
    }
    return matrix;
  }
  
  const reverse = matrix =>  matrix.map(row => row.reverse());
  const rotate = matrix => reverse(transpose(matrix));
  
  class MapDrawing {
    
    canvasRef;
    
    constructor() {
      let canvas = document.getElementById("mapDrawing");
      if (canvas == undefined) {
        let g = document.createElement('canvas');
				g.setAttribute("id", "mapDrawing");
        g.setAttribute("width", "600");
        g.setAttribute("height", "600");
        g.style.width = "600px";
        g.style.height = "600px";
        g.style.position = "absolute";
        g.style.top = "0";
        document.body.appendChild(g);
        this.canvasRef = g;
      }
      else {
        this.canvasRef = canvas;
      }
    }
    
    clear() {
      let ctx = this.canvasRef.getContext("2d");
      ctx.clearRect(0, 0, this.canvasRef.width, this.canvasRef.height);
      ctx.fillStyle = "#FFFFFF";
			ctx.fillRect(0, 0, this.canvasRef.width, this.canvasRef.height);
    }
    
    drawPixel(x, y, w, h, color) {
      let ctx = this.canvasRef.getContext("2d");
      ctx.fillStyle = color;
      ctx.fillRect(x, y, w, h);
    }
    
  }
  
  class Tile {
    
    id;
    data;
    
    neighbors = [null, null, null, null];
    
    constructor(text) {
      let textData = text.split("\n");
      this.id = parseInt(textData[0].replace("Tile ", "").replace(":", ""));
      this.data = textData.slice(1).map(r => r.split(""));
    }
    
    rotate() {
      this.data = rotate(this.data);
    }
    
  	flipX() {
      this.data = reverse(this.data);
    }
  
  	print() {
      console.log(this.data.map(r => r.join("")).join("\n"));
    }
  
  	getMissingSides() {
      return this.neighbors.map((e, i) => [e, i]).filter(x => x[0] == null).map(x => x[1]);
    }
  
  	getSide(n) {
      switch (n) {
        case 0:
          return this.data[0];
        case 1:
          return this.data.map(r => r[r.length-1]);
        case 2:
          return this.data[this.data.length-1];
        case 3:
          return this.data.map(r => r[0]);
      }
    }
  
  	canBeRotated() {
      return this.getMissingSides().length == 4;
    }
  
    getImgData() {
      return this.data.filter((c , i, a) => i > 0 && i < a.length-1).map(r => r.filter((c , i, a) => i > 0 && i < a.length-1));
    }
  
  }
 
  let findSeeMonster = (map) => {
  	let pattern = `                  # 
#    ##    ##    ###
 #  #  #  #  #  #   `.split("\n").map(r => r.split("")); 
    let foundMonsters = 0;	
   
    for (let i = 0; i < map.length-pattern.length; i++) {
      for (let j = 0; j < map[i].length-pattern[0].length; j++) {
        
        let found = true;
        for (let y = 0; y < pattern.length; y++) {
      		for (let z = 0; z < pattern[0].length; z++) {
        		if (pattern[y][z] == "#" && map[i+y][j+z] != "#") {
              found = false;
              break;
            }
          }
          if (!found) break;
        }
  			if (found) {
          for (let y = 0; y < pattern.length; y++) {
            for (let z = 0; z < pattern[0].length; z++) {
              if (pattern[y][z] == "#") {
                map[i+y][j+z] = "O";
              }
            }
          }
          foundMonsters++;
        }
      }
    }
  	return [foundMonsters, map];
	}
  
  let response = await fetch("https://adventofcode.com/2020/day/20/input");
  let str = await response.text();
  let strT = `Tile 2311:
..##.#..#.
##..#.....
#...##..#.
####.#...#
##.##.###.
##...#.###
.#.#.#..##
..#....#..
###...#.#.
..###..###

Tile 1951:
#.##...##.
#.####...#
.....#..##
#...######
.##.#....#
.###.#####
###.##.##.
.###....#.
..#.#..#.#
#...##.#..

Tile 1171:
####...##.
#..##.#..#
##.#..#.#.
.###.####.
..###.####
.##....##.
.#...####.
#.##.####.
####..#...
.....##...

Tile 1427:
###.##.#..
.#..#.##..
.#.##.#..#
#.#.#.##.#
....#...##
...##..##.
...#.#####
.#.####.#.
..#..###.#
..##.#..#.

Tile 1489:
##.#.#....
..##...#..
.##..##...
..#...#...
#####...#.
#..#.#.#.#
...#.#.#..
##.#...##.
..##.##.##
###.##.#..

Tile 2473:
#....####.
#..#.##...
#.##..#...
######.#.#
.#...#.#.#
.#########
.###.#..#.
########.#
##...##.#.
..###.#.#.

Tile 2971:
..#.#....#
#...###...
#.#.###...
##.##..#..
.#####..##
.#..####.#
#..#.#..#.
..####.###
..#.#.###.
...#.#.#.#

Tile 2729:
...#.#.#.#
####.#....
..#.#.....
....#..#.#
.##..##.#.
.#.####...
####.#.#..
##.####...
##..#.##..
#.##...##.

Tile 3079:
#.#.#####.
.#..######
..#.......
######....
####.#..#.
.#...#.##.
#.#####.##
..#.###...
..#.......
..#.###...`;

  
  let tiles = str.trim().split("\n\n").map(t => new Tile(t));
  //console.log(tiles);

	let toLookup = [tiles[0]];

	while (toLookup.length > 0) {
    let tile = toLookup.pop();
    for (let s of tile.getMissingSides()) {
      let side = tile.getSide(s);
      let opositeSide = (s + 2) % 4;
     
      let found = undefined;
      
      //Try other remaining to match
      for (let other of tiles) {
        if (tile == other) continue;
        if (other.canBeRotated()) {
          //Try every rotation
          for (let j = 0; j < 4; j++) {
            if (other.getSide(opositeSide).join("") == side.join("")) {
              found = other;
              break;
            }
            other.flipX();
            if (other.getSide(opositeSide).join("") == side.join("")) {
              found = other;
              break;
            }
            other.flipX();
            other.rotate();
          }
          if (found != undefined) break;
        }
        else {
          if (other.getSide(opositeSide).join("") == side.join("")) {
            found = other;
          }
        }
      }
      
      if (found != undefined) {
        if (found.canBeRotated()) {
          toLookup.push(found);
        }
        tile.neighbors[s] = found;
        found.neighbors[opositeSide] = tile;
      }
    }
  }

	let checkSum = 1;
	let first = tiles[0];

	console.log(first);
  
	//Traverse to get first
	while (first.neighbors[0] != null || first.neighbors[3] != null) {
    first = first.neighbors[0] ?? first.neighbors[3];
  }
    
  let topLeft = first;
  
  //Check all corners
  console.log(first);
  checkSum *= first.id;
    
  while (first.neighbors[1] != null) {
    first = first.neighbors[1];
  }
    
  console.log(first);
  checkSum *= first.id;
    
  while (first.neighbors[2] != null) {
    first = first.neighbors[2];
  }
    
  console.log(first);
  checkSum *= first.id;
    
  while (first.neighbors[3] != null) {
    first = first.neighbors[3];
  }
    
  console.log(first);
  checkSum *= first.id;
    
  console.log(checkSum);

  //Generate big img Data
  let img = [];
  let row = topLeft;
  let rowI = 0;
  let imgDim = topLeft.getImgData().length;
  do {
    let col = row;
    
    //Inserts new rows to final image
    for (let i = 0; i < imgDim; i++) {
      img.push([]);
    }
    do {
      let imgData = col.getImgData();
      for (let i = 0; i < imgDim; i++) {
        for (let j = 0; j < imgDim; j++) {
      		img[rowI*imgDim+i].push(imgData[i][j]);
        }
      }
      col = col.neighbors[1];
    } while (col != null);
    
    
    row = row.neighbors[2];
    rowI++;
  } while (row != null);  
    
  console.log(img);
  
  for (let i = 0; i < 4; i++) {
   	let monsterData = findSeeMonster(img);
    if (monsterData[0] > 0) {
      img = monsterData[1];
      break;
    }
    img = reverse(img);
    monsterData = findSeeMonster(img);
    if (monsterData[0] > 0) {
      img = monsterData[1];
      break;
    }
    img = reverse(img);
    img = rotate(img);
  }
    
	let g = new MapDrawing();
	g.clear();
  
  let otherBiom = 0;
  for (let i = 0; i < img.length; i++) {
    for (let j = 0; j < img[i].length; j++) {
      if (img[i][j] == "#") {
        g.drawPixel(j*6, i*6, 6, 6, "#000000");
        otherBiom++;
      }
      else if (img[i][j] == "O") {
        g.drawPixel(j*6, i*6, 6, 6, "#00FF00");
      }
      else {
        g.drawPixel(j*6, i*6, 6, 6, "#0000FF");
      }
  	}
  }
    
  console.log(otherBiom);
})();