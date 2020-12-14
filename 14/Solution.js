(async () => {
    let response = await fetch("https://adventofcode.com/2020/day/14/input");
  let str = await response.text();
  
  /*str = `mask = XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X
mem[8] = 11
mem[7] = 101
mem[8] = 0`;*/
  
  
  let applyMask = (mask, num) => num.split("").map((n, i) => mask[i] == "X" ? n : mask[i]).join("");
  let applyMask2 = (mask, num) => num.split("").map((n, i) => mask[i] == "0" ? n : mask[i]).join("");
  
  function* getAddreses(addr) {
    if (addr.length == 0) {
      yield "";
    }
    else {
      let currChar = addr[0];
      let remaining = addr.substring(1);
      for (let r of getAddreses(remaining)) {
       if (currChar == "X") {
          yield "1" + r;
          yield "0" + r;
       }
       else {
          yield currChar + r
       }
      }
    }
  }
  
  
  let mask = "X".repeat(36);
  let memMap = {};
  let memMap2 = {};
  
  for (let line of str.trim().split("\n")) {
    let match = line.match(/mask = (.+)/);
    if (match != null) {
      mask = match[1];
    }
    else {
      match = line.match(/mem\[(\d+)\] = (.+)/);
      let location = parseInt(match[1]);
      let num = parseInt(match[2]);
      let numStr = num.toString(2).padStart(36, "0");
      let locationStr = location.toString(2).padStart(36, "0");
      
      //console.log([location, numStr, applyMask(mask, numStr)]);
      memMap[location] = applyMask(mask, numStr);
      
      for (let addr of getAddreses(applyMask2(mask, locationStr))) {
        memMap2[addr] = num;
      }
    }
  }
  
  console.log(Object.values(memMap).map(x => parseInt(x, 2)).reduce((a, c) => a + c));
  console.log(Object.values(memMap2).reduce((a, c) => a + c));
  
})();