(async () => {
  
  let response = await fetch("https://adventofcode.com/2020/day/25/input");
  let str = await response.text();
/*  str = `5764801
17807724
`*/
  let numbers = str.trim().split("\n").map(x => parseInt(x));
  
  let transform = (subjectNumber, loopSize) => {
    let val = 1;
    for (let i = 0; i < loopSize; i++) {
      val = (val * subjectNumber) % 20201227;
    }
    return val;
  };
	
  let findLoopSize = (subjectNumber, key) => {
    let val = 1;
    let loopCounter = 0;
    while (val != key) {
      val = (val * subjectNumber) % 20201227;
      loopCounter++;
    }
    return loopCounter;
  };
  
  
  let cardPK = numbers[0]; 
  let doorPK = numbers[1];
  
  let cardLoopNumber = findLoopSize(7, cardPK);
  let doorLoopNumber = findLoopSize(7, doorPK);
  
  let encKey = transform(doorPK, cardLoopNumber);
  let encKey2 = transform(cardPK, doorLoopNumber);
  
  console.log(cardLoopNumber, doorLoopNumber, encKey, encKey2);
  
  
})();