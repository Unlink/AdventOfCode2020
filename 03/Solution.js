(async () => {
  let response = await fetch("https://adventofcode.com/2020/day/3/input");
  let str = await response.text();

  let map = str.split("\n");
  let allChoppedTrees = [];
  let patterns = [
    [1,1],
    [3,1],
    [5,1],
    [7,1],
    [1,2]
  ];
  
  for (let pattern of patterns) {
    let choppedTrees = 0;
    let currRow = 0;
    let currColl = 0;
    
    while (currRow < map.length - pattern[1]) {
      currRow += pattern[1];
      currColl += pattern[0];
      if (map[currRow][currColl % map[0].length] == "#") choppedTrees++;
    }
    
    allChoppedTrees.push(choppedTrees);
  }
  
  console.log(allChoppedTrees);
  console.log(allChoppedTrees.reduce((a, b) => a * b));
  
})();