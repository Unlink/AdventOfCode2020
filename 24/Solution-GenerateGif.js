function dynamicallyLoadScript(url) {
  var script = document.createElement("script"); 
  script.src = url;
  document.head.appendChild(script);
}
if (typeof(gifshot) != undefined) {
  dynamicallyLoadScript("https://cdnjs.cloudflare.com/ajax/libs/gifshot/0.3.2/gifshot.min.js");
  console.log("Loading gifLib");
}
  

(async () => {
  class TileDrawing {
    
    frames = [];
    canvasRef;
    
    constructor() {
      let canvas = document.getElementById("tileCanvas");
      if (canvas == undefined) {
        let g = document.createElement('canvas');
				g.setAttribute("id", "mapDrawing");
        g.setAttribute("width", "1000");
        g.setAttribute("height", "1000");
        g.style.width = "1000px";
        g.style.height = "1000px";
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
    
    draw(w, h, black) {
      let hexHeight,
        hexRadius,
        hexRectangleHeight,
        hexRectangleWidth,
        hexagonAngle = 0.523598776, // 30 degrees in radians
        sideLength = 4,
        boardWidth = w,
        boardHeight = h;

        hexHeight = Math.sin(hexagonAngle) * sideLength;
        hexRadius = Math.cos(hexagonAngle) * sideLength;
        hexRectangleHeight = sideLength + 2 * hexHeight; // sideLength = sqrt(hexRectangleHeight / 2 * Math.sin(hexagonAngle))
        hexRectangleWidth = 2 * hexRadius;
      
        let ctx = this.canvasRef.getContext("2d");

        ctx.fillStyle = "#000000";
        ctx.strokeStyle = "#CCCCCC";
        ctx.lineWidth = 1;

        for(let i = 0; i < boardWidth; ++i) {
            for(let j = 0; j < boardHeight; ++j) {
                let x = i * hexRectangleWidth + ((j % 2) * hexRadius);
                let y = j * (sideLength + hexHeight);
              
                ctx.beginPath();
                ctx.moveTo(x + hexRadius, y);
                ctx.lineTo(x + hexRectangleWidth, y + hexHeight);
                ctx.lineTo(x + hexRectangleWidth, y + hexHeight + sideLength);
                ctx.lineTo(x + hexRadius, y + hexRectangleHeight);
                ctx.lineTo(x, y + sideLength + hexHeight);
                ctx.lineTo(x, y + hexHeight);
                ctx.closePath();

                if(black.filter(x => x[0] == i && x[1] == j).length == 1) {
                    ctx.fill();
                } else {
                    ctx.stroke();
                }
            }
        }
      this.frames.push(this.canvasRef.toDataURL('image/jpeg'));
    }
    
  }
  
  
  class Vector {
    value;
    
    constructor(val) {
      this.value = val;
    }
    
    plus(other) {
      return new Vector(this.value.map((val, i) => val + other.value[i]));
    }
    
    toString() {
      return this.value.join(",");
    }
  }
  
  function sleep(ms) {
  	return new Promise(resolve => setTimeout(resolve, ms));
	}
  
  let response = await fetch("https://adventofcode.com/2020/day/24/input");
  let str = await response.text();
  str = `sesenwnenenewseeswwswswwnenewsewsw
neeenesenwnwwswnenewnwwsewnenwseswesw
seswneswswsenwwnwse
nwnwneseeswswnenewneswwnewseswneseene
swweswneswnenwsewnwneneseenw
eesenwseswswnenwswnwnwsewwnwsene
sewnenenenesenwsewnenwwwse
wenwwweseeeweswwwnwwe
wsweesenenewnwwnwsenewsenwwsesesenwne
neeswseenwwswnwswswnw
nenwswwsewswnenenewsenwsenwnesesenew
enewnwewneswsewnwswenweswnenwsenwsw
sweneswneswneneenwnewenewwneswswnese
swwesenesewenwneswnwwneseswwne
enesenwswwswneneswsenwnewswseenwsese
wnwnesenesenenwwnenwsewesewsesesew
nenewswnwewswnenesenwnesewesw
eneswnwswnwsenenwnwnwwseeswneewsenese
neswnwewnwnwseenwseesewsenwsweewe
wseweeenwnesenwwwswnew`;
 
  let directions = {
    e: new Vector([1, -1, 0]),
    se: new Vector([0, -1, 1]), 
    sw: new Vector([-1, 0, 1]), 
    w: new Vector([-1, 1, 0]),
    nw: new Vector([0, 1, -1]),
    ne: new Vector([1, 0, -1])
  };
  let regex = /(se)|(sw)|(nw)|(ne)|(e)|(w)/gm;
  let instructions = str.trim().split("\n").map(r => [...r.matchAll(regex)].map(z => directions[z[0]]));
  
  let blackNeighbords = (c, flipped) => {
    return Object.values(directions).filter(d => d.plus(c) in flipped).length;
  }
  
  let flipped = {};
  for (let instruction of instructions) {
    let tile = new Vector([0, 0, 0]);
    for (let m of instruction) {
      tile = tile.plus(m);
    }
  
    if (tile in flipped) {
      delete flipped[tile];
    }
    else {
      flipped[tile] = tile;
    }
  }
  
  console.log(Object.values(flipped).length);
  
  
  let drawing = new TileDrawing();
  
  for (let day = 0; day < 100; day++) {
    let newFlipped = {};
    for (let tile of Object.values(flipped)) {
      
      if (blackNeighbords(tile, flipped) == 1 || blackNeighbords(tile, flipped) == 2) {
        newFlipped[tile] = tile;
      }
      for (let d of Object.values(directions)) {
        let n = d.plus(tile);
        if (blackNeighbords(n, flipped) == 2) {
        	newFlipped[n] = n;
        }
      }
    }
    flipped = newFlipped;
    console.log("Day "+(day+1)+" black "+Object.values(flipped).length);
    
    drawing.clear();
    let flatBlocks = Object.values(flipped).map(cube => [cube.value[0] + (cube.value[2] - (cube.value[2]&1)) / 2, cube.value[2]]);
    drawing.draw(150, 150, flatBlocks.map(x => [x[0] + 60, x[1] + 60]));
    await sleep(100);
  }
  
  let flatBlocks = Object.values(flipped).map(cube => [cube.value[0] + (cube.value[2] - (cube.value[2]&1)) / 2, cube.value[2]]);
  console.log(flatBlocks);
  
    /*let xMin = Math.min(...flatBlocks.map(x => x[0])),
    yMin = Math.min(...flatBlocks.map(x => x[1])),
    
    xMax = Math.max(...flatBlocks.map(x => x[0])),
    yMax = Math.max(...flatBlocks.map(x => x[1]));
  
  console.log(xMin, yMin);
  
  let w = -xMin + xMax + 1;
  let h = -yMin + yMax + 1;   
  
  //Fix to center
  xMin = -50;
  yMin = -50;*/
  
  drawing.draw(150, 150, flatBlocks.map(x => [x[0] + 60, x[1] + 60]));
  
  gifshot.createGIF({
    'gifWidth': 1000,
		'gifHeight': 1000,
  	'images': drawing.frames
	},function(obj) {
  if(!obj.error) {
    var image = obj.image,
    animatedImage = document.createElement('img');
    animatedImage.src = image;
    document.body.appendChild(animatedImage);
  }
});
  
})();