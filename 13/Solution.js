(async () => {
  function lcm_two_numbers(x, y) {
   if ((typeof x !== 'number') || (typeof y !== 'number')) 
    return false;
  return (!x || !y) ? 0 : Math.abs((x * y) / gcd_two_numbers(x, y));
  }

  function gcd_two_numbers(x, y) {
    x = Math.abs(x);
    y = Math.abs(y);
    while(y) {
      var t = y;
      y = x % y;
      x = t;
    }
    return x;
  }
  
  let response = await fetch("https://adventofcode.com/2020/day/13/input");
  let str = await response.text();
  
//  str = `939
//1789,37,47,1889`;
  
  let data = str.split("\n");
  let depTime = parseInt(data[0]);
  let busIds = data[1].split(",").filter(r => r != "x").map(r => parseInt(r));
  
  let min = 9999;
  let minId = -1;
  for (let id of busIds) {
    let waitTime = id - depTime % id;
    if (waitTime < min) {
      min = waitTime;
      minId = id;
    }
  }
  
  console.log(minId * min);
  
  let nums = data[1].split(",").map((v, i) => [v, i]).filter(x => x[0] != "x").map(x => [parseInt(x[0]), x[1]]);
  console.log(nums);
  
  let t = nums[0][0];
  let p = t;
  
  for (let c = 1; c < nums.length; c++) {
    console.log("Counting for "+nums[c][0] + " ["+ nums[c][1]+"]");
    while (t % nums[c][0] != nums[c][0] - (nums[c][1] % nums[c][0])) t += p;
    p = lcm_two_numbers(p, nums[c][0]);
    console.log("Found for " + nums[c][0] + " > " + t + " lcm = "+p)
  }
  
  console.log(t);
})();