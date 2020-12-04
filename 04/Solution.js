(async () => {
  let response = await fetch("https://adventofcode.com/2020/day/4/input");
  let str = await response.text();
 

  let keys = {
    byr : (x) => parseInt(x) >= 1920 && parseInt(x) <= 2002,
    iyr : (x) => parseInt(x) >= 2010 && parseInt(x) <= 2020,
  	eyr : (x) => parseInt(x) >= 2020 && parseInt(x) <= 2030,
  	hgt : (x) => (x.endsWith("cm") && parseInt(x) >= 150 && parseInt(x) <= 193) || (x.endsWith("in") && parseInt(x) >= 59 && parseInt(x) <= 76),
  	hcl : (x) => x.match(/^#[0-9a-f]{6}$/),
  	ecl : (x) => ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"].includes(x),
  	pid : (x) => x.match(/^[0-9]{9}$/),
    cid : (x) => true
	}
  
  let optionalFields = ["cid"];
  
  let passports = str.split("\n\n");
  
  let validPassports = 0;
  let validPassports2 = 0;
  for (let passport of passports) {
    var fields = Object.fromEntries(passport.split(/\s+/).filter(x => x != "").map(f => f.split(":").filter(e => e[0].length > 0)));
    //console.log(fields);
    
    let missingFields = new Set(Object.keys(keys));
    for (let key of optionalFields) missingFields.delete(key);
    for (let key in fields) missingFields.delete(key);
    
    if (missingFields.size == 0) {
      validPassports++;
      let valid = true;
      for (let key in fields) {
        if (!keys[key](fields[key])) {
          valid = false;
          //console.log([key, fields[key]])
        }
      }
      if (valid) validPassports2++;
    }
  }
  
  console.log([validPassports, validPassports2]);
})();
