(async () => {
  let response = await fetch("https://adventofcode.com/2020/day/11/input");
  let str = await response.text();
  
  /*str = `L.LL.LL.LL
LLLLLLL.LL
L.L.L..L..
LLLL.LL.LL
L.LL.LL.LL
L.LLLLL.LL
..L.L.....
LLLLLLLLLL
L.LLLLLL.L
L.LLLLL.LL`;*/
  
  let map = str.trim().split("\n").map(l => l.trim().split(""));
  
  let coutnAdj = (m, x, y) => {
    x = parseInt(x); //WFT JS?
    y = parseInt(y); 
    let occupied = 0;
    for (let i = x - 1; i <= x + 1; i++) {
      for (let j = y - 1; j <= y + 1; j++) {
      	if (i == x && j == y) continue;
        if (i < 0 || j < 0 || j >= map.length || i >= map[0].length) continue;
        if (map[j][i] == "#") occupied++;
    	}
    }
    return occupied;
  }
  
  let coutnAdj2 = (m, x, y) => {
    x = parseInt(x); //WFT JS?
    y = parseInt(y); 
    let occupied = 0;
    for (let i = - 1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
      	if (i == 0 && j == 0) continue;
        let curX = x + i;
        let curY = y + j;
        
        while (curX >= 0 && curY >= 0 && curY < map.length && curX < map[0].length) {
          
          if (map[curY][curX] == "#") {
            occupied++;
            break;
          }
          else if (map[curY][curX] == "L") {
            break;
          }
          curX += i;
          curY += j;
        }
    	}
    }
    return occupied;
  }
  
  let changedSeets;
  do {
    changedSeets = 0;
    let newMap = [...map.map(l => [...l])];
    for (let i in map) {
      for (let j in map[i]) {
        if (map[i][j] == "L" && coutnAdj(map, j, i) == 0) {
          newMap[i][j] = "#";
          changedSeets++;
        }
        else if (map[i][j] == "#" && coutnAdj(map, j, i) >= 4) {
          newMap[i][j] = "L";
          changedSeets++;
        }
      }
    }
    map = newMap;
    //console.log(map.map(l => l.join("")).join("\n"))
    
  } while (changedSeets > 0);
  
  console.log(map.flat().filter(m => m == "#").length)
  
  map = str.trim().split("\n").map(l => l.trim().split(""));

  do {
    changedSeets = 0;
    let newMap = [...map.map(l => [...l])];
    for (let i in map) {
      for (let j in map[i]) {
        if (map[i][j] == "L" && coutnAdj2(map, j, i) == 0) {
          newMap[i][j] = "#";
          changedSeets++;
        }
        else if (map[i][j] == "#" && coutnAdj2(map, j, i) >= 5) {
          newMap[i][j] = "L";
          changedSeets++;
        }
      }
    }
    map = newMap;
    //console.log(map.map(l => l.join("")).join("\n"))
    
  } while (changedSeets > 0);
  
  console.log(map.flat().filter(m => m == "#").length)
  
  
})();