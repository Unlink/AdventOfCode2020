(() => {
  let seq = `16,1,0,18,12,14,19`.split(",").map(x => parseInt(x));
  
  let spoken = {};
  seq.forEach((n, i) => spoken[n] = i + 1);
  
  let lastNum = seq[seq.length-1];
  for (let cur = seq.length; cur < 30000000; cur++) {
    //console.log(lastNum);
    if (lastNum in spoken) {
      let oldLastNumPos = spoken[lastNum];
      spoken[lastNum] = cur;
      lastNum = cur - oldLastNumPos;
    }
    else {
      spoken[lastNum] = cur;
      lastNum = 0;
    }
  }

  console.log(lastNum);
})();