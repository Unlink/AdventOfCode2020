(async () => {
  let response = await fetch("https://adventofcode.com/2020/day/7/input");
  let str = await response.text();
 
  
  let getBagContent = (l) => {
    let bagName = l.split("contain")[0].replace(/bags?/, "").trim();
    let bagConnent = l.split("contain")[1].slice(0, -1).trim();
    if (bagConnent == "no other bags") {
      bagConnent = [];
    }
    else {
      bagConnent = bagConnent.split(",").map(b => {
        let content = b.replace(/bags?/, "").trim().split(" ");
        return {
          name: content[1] + " " + content[2],
          count: parseInt(content[0])
        };
      });
    }
    
    return {
      name: bagName,
      content: bagConnent
    }
  }
 
  let bagRules = {};
  for (let line of str.trim().split("\n")) {
    let rule = getBagContent(line);
    bagRules[rule.name] = rule.content;
  }
  
  
  let usableBags = new Set();
  const myBagColor = "shiny gold";
  
  let toLookup = [myBagColor];
  while (toLookup.length > 0) {
    let examinedBag = toLookup.pop();
    for (let bag in bagRules) {
      if (!usableBags.has(bag) && bagRules[bag].some(e => e.name == examinedBag)) {
        usableBags.add(bag);
        toLookup.push(bag);
      }
    }
    
  }
  
  console.log(usableBags);
  
  let countBagsWithn = (bag) => {
    return 1 + bagRules[bag].reduce((s, v) => s + v.count * countBagsWithn(v.name), 0);
  }
  
  console.log(countBagsWithn(myBagColor) - 1);
  
})();