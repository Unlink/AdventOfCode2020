(async () => {
  let response = await fetch("https://adventofcode.com/2020/day/9/input");
  let str = await response.text();
  
  let numbers = str.split("\n").map(x => parseInt(x));
  let glitch = 0;
  
  for (let i = 25; i < numbers.length; i++) {
    
    let currentNumber = numbers[i];
    let currentWindow = numbers.slice(i - 25, i);
    if (!currentWindow.some(x => currentWindow.filter(a => a != x).includes(currentNumber - x))) {
      console.log(currentNumber);
      glitch = currentNumber;
      break;
    }
  }
  
  let sum = 0;
  
  for (let i = 0, j=0; i < numbers.length; i++) {
    sum += numbers[i];
    while (sum > glitch) {
      sum -= numbers[j];
      j++;
    }
    if (sum == glitch) {
      console.log([j, i, Math.min(...numbers.slice(j, i+1))+Math.max(...numbers.slice(j, i+1))]);
      break;
    }
  }
    
  
})();