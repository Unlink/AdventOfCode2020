(async () => {
  let response = await fetch("https://adventofcode.com/2020/day/6/input");
  let str = await response.text();
 
  let groups = str.split("\n\n");
  
  let groupAnswers = groups.map(g => {
    let questions = new Set();
    g.split("\n").forEach(p => p.split("").forEach(a => questions.add(a)));
    return questions.size;
  });
  
  
  let groupAnswers2 = groups.map(g => {
    //Trim because last line contains \n so normally is parsed as empty answers
    let answers = g.trim().split("\n").map(a => a.split(""));
    let questions = answers[0];
    for (let answer of answers) {
      questions = questions.filter(q => answer.includes(q));
    }
    return questions.length;
  });
  
  console.log(groupAnswers.reduce((s, c) => s+= c));
  console.log(groupAnswers2.reduce((s, c) => s+= c));
  
  
})();
