(async () => {
  let response = await fetch("https://adventofcode.com/2020/day/5/input");
  let str = await response.text();
  
  let decodeChars = (x) => x.split("").map(x => x == "B" || x == "R" ? 1 : 0);
  let decodeNumber = (x) => (x.reduce((result, current, index) => result += current << x.length - index -1, 0));
  let getId = (x) => {
    let decoded = decodeChars(x);
    let row = decodeNumber(decoded.slice(0, 7));
    let col = decodeNumber(decoded.slice(7, 10));
    //console.log([row, col, decoded.slice(0, 7), decoded.slice(7, 10)]);
    return row * 8 + col;
  }
  

  let boardingIds = str.split("\n").map((x) => getId(x));
  let maxBoardingId = Math.max(...boardingIds);
  
  let missing = Array(maxBoardingId).fill().map((v, i) => i).filter(x => !boardingIds.includes(x));
  
  console.log(maxBoardingId);
  console.log(missing[missing.length - 1]);

})();