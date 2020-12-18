(async () => {
  function* generateNeighbors() {
    for (let i = -1; i < 2; i++) {
      for (let j = -1; j < 2; j++) {
      	for (let k = -1; k < 2; k++) {
        	for (let l = -1; l < 2; l++) {
            if (!(i == 0 && j == 0 && k == 0 && l == 0)) {
              yield [i, j, k, l];
            }
          }
    		}
    	}
    }
  }
  
  let response = await fetch("https://adventofcode.com/2020/day/17/input");
  let str = await response.text();
  
/*  str = `.#.
..#
###
`;*/
  
  let cube = [];
  
  let rows = str.trim().split("\n");
  for (let i in rows) {
    let row = rows[i].split("");
    for (let j in row) {
      if (row[j] == "#") {
        cube.push([0, 0, parseInt(i), parseInt(j)]);
      }
    }
  }
  
  for (let i = 0; i < 6; i++) {
    let cubeSet = new Set(cube.map(x => x.join(",")));
    let newCube = [];
    let [minW, minZ, minY, minX] = [
      Math.min(...cube.map(r => r[0])),
      Math.min(...cube.map(r => r[1])),
      Math.min(...cube.map(r => r[2])),
      Math.min(...cube.map(r => r[3]))
      ];
    let [maxW, maxZ, maxY, maxX] = [
      Math.max(...cube.map(r => r[0])),
      Math.max(...cube.map(r => r[1])),
      Math.max(...cube.map(r => r[2])),
      Math.max(...cube.map(r => r[3])),
      ];
    for (let w = minW - 1; w <= maxW + 1; w++) {
      for (let z = minZ - 1; z <= maxZ + 1; z++) {
        for (let y  = minY - 1; y <= maxY + 1; y++) {
          for (let x = minX - 1; x <= maxX + 1; x++) {
            let n = [...generateNeighbors()].filter(n => cubeSet.has([w + n[0], z + n[1], y + n[2], x + n[3]].join(","))).length;
            if (cubeSet.has([w, z, y, x].join(","))) {
              if (n == 2 ||n == 3) {
                newCube.push([w, z, y, x]);
              }
            }
            else if (n == 3) {
              newCube.push([w, z, y, x]);
            }
          }
        }
      }
    }
    cube = newCube;
    console.log(cube);
  }
  
  console.log(cube.length);
  
})();