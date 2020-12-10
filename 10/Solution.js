(async () => {
  let response = await fetch("https://adventofcode.com/2020/day/10/input");
  let str = await response.text();
  
  let numbers = str.trim().split("\n").map(x => parseInt(x));
  numbers.push(0);
  numbers.push(Math.max(...numbers)+3);
  numbers.sort((a, b) => a - b);
    
  let diffArray = [];
  for (let i = 1; i < numbers.length; i++) {
    diffArray.push(numbers[i] - numbers[i-1]);
  }
  
  console.log(diffArray.filter(x => x == 1).length * diffArray.filter(x => x == 3).length);
  
  console.log(diffArray);
  let combinations = 1;
  let c = 0;
  for (let x of diffArray) {
    if (x == 1) c++;
    else {
      //Number of combinantions for given row of 1s
      combinations *= [1, 1, 2, 4, 7, 13][c];
      c = 0;
    }
  }
  
  console.log(combinations);
  
  
})();