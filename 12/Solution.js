(async () => {
  let response = await fetch("https://adventofcode.com/2020/day/12/input");
  let str = await response.text();
  
/*  str = `F10
N3
F7
R90
L90
F11`;*/
  
  let moves = {
    N: [0, -1],
    E: [1, 0],
    S: [0, 1],
    W: [-1, 0]
  };
  let dirs = [moves.N, moves.E, moves.S, moves.W];
  let move = (curr, move, size) => [curr[0] + move[0] * size, curr[1] + move[1] * size]; 
  let rotate = (p, angle) => [Math.round(Math.cos(angle * (Math.PI / 180)) * p[0] - Math.sin(angle * (Math.PI / 180)) * p[1]), Math.round(Math.sin(angle * (Math.PI / 180)) * p[0] + Math.cos(angle * (Math.PI / 180)) * p[1])];
  
  let currentDirection = 1; //East
  let currentPos = [0, 0];
  
  //Part 1
  for (let line of str.trim().split("\n")) {
    let instruction = line.substring(0, 1);
    let count = line.substring(1);
    
    switch (instruction) {
      case "N": 
        currentPos = move(currentPos, moves.N, count);
        break;
      case "S": 
        currentPos = move(currentPos, moves.S, count);
        break;
      case "E": 
        currentPos = move(currentPos, moves.E, count);
        break;
      case "W": 
        currentPos = move(currentPos, moves.W, count);
        break;
      case "F": 
        currentPos = move(currentPos, dirs[currentDirection], count);
        break;
      case "L": 
        currentDirection = currentDirection - count / 90;
        while (currentDirection < 0) currentDirection += 4;
        break;
      case "R": 
        currentDirection = (currentDirection + count / 90) % 4;
        break;
    }
  }
  console.log([currentPos, Math.abs(currentPos[0]) + Math.abs(currentPos[1])]);
 
  
  currentPos = [0, 0];
  let wayPoint = [10, -1]
  //Part 2
  for (let line of str.trim().split("\n")) {
    let instruction = line.substring(0, 1);
    let count = line.substring(1);
    
    switch (instruction) {
      case "N": 
        wayPoint = move(wayPoint, moves.N, count);
        break;
      case "S": 
        wayPoint = move(wayPoint, moves.S, count);
        break;
      case "E": 
        wayPoint = move(wayPoint, moves.E, count);
        break;
      case "W": 
        wayPoint = move(wayPoint, moves.W, count);
        break;
      case "F": 
        currentPos = move(currentPos, wayPoint, count);
        break;
      case "L": 
        wayPoint = rotate(wayPoint, -count);
        break;
      case "R": 
        wayPoint = rotate(wayPoint, count);
        break;
    }
    console.log([line, currentPos, wayPoint]);
  }
  console.log([currentPos, Math.abs(currentPos[0]) + Math.abs(currentPos[1])]);
  
})();