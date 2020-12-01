(async function() {

  var result = await fetch("https://adventofcode.com/2020/day/1/input");
  var numbers = (await result.text()).split("\n").map(x => parseInt(x));
  
  for (var i of numbers) {
    for (var j of numbers) {
      if (i + j > 2020) continue;
      for (var k of numbers) {
        if (i + j + k == 2020) {
          console.log(i*j*k);
        }
      }
    }
  }
  
})();