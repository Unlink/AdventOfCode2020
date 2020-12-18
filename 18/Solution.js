(async () => {
  
  let tokenize = (str) => {
    let tokens = [];
    let accumulator = "";
    
    for (let c of str.split("")) {
      if (c == " ") {
        continue;
      }
      
      if (c == "+" || c == "*" || c == "(" || c == ")") {
        if (accumulator.length > 0) {
          if (accumulator.match(/^\d+$/)) {
            tokens.push(parseInt(accumulator));
          }
          else {
            tokens.push(accumulator);
          }
          accumulator = "";
        }
        tokens.push(c);
      }
      else {
        accumulator += c;
      }
    }
    
    if (accumulator.length > 0) {
      if (accumulator.match(/^\d+$/)) {
         tokens.push(parseInt(accumulator));
      }
      else {
         tokens.push(accumulator);
      }
    }
    
    return tokens;
  } 
  
  let calculate = (tokens) => {
    let r = 0;
    let lastOperation = "+";
    let subExpression = [];
    let openBrackets = 0;
    for (let t of tokens) {
      if (openBrackets == 0 && Number.isInteger(t)) {
        switch (lastOperation) {
          case "+":
            r += t;
            break;
          case "*":
            r *= t;
        }
      }
      else if (t == "(") {
        openBrackets++;
        if (openBrackets > 1) {
          subExpression.push(t);
        }
      }
      else if (t == ")") {
        openBrackets--;
        if (openBrackets == 0) {
          switch (lastOperation) {
            case "+":
              r += calculate(subExpression);
              break;
            case "*":
              r *= calculate(subExpression);
        	}
          subExpression = [];
        }
        else {
          subExpression.push(t);
        }
      }
      else if (openBrackets > 0) {
        subExpression.push(t);
      }
      else {
        lastOperation = t;
      }
    }
    //console.log(tokens, r);
    return r;
  };
  
  let addBrackets = (tokens) => {
    for (let i = 0; i < tokens.length; i++) {
      //console.log(tokens.join(""));
      if (tokens[i] == "+") {
        let count = 0;
        if (tokens[i-1] == ")") {
          count = 1;
          for (let j = i - 2; j >= 0; j--) {
            if (tokens[j] == ")") count++;
            else if (tokens[j] == "(") {
              count--;
              if (count == 0) {
                tokens.splice(j, 0, "(");
                break;
              }
            }
          }
        }
        else {
          tokens.splice(i - 1, 0, "(");
        }
        i += 2; //Because we added one element
        if (tokens[i] == "(") {
          count = 1;
          for (let j = i+1; j < tokens.length; j++) {
            if (tokens[j] == "(") count++;
            else if (tokens[j] == ")") {
              count--;
              if (count == 0) {
                tokens.splice(j, 0, ")");
                break;
              }
            }
          }
        }
        else {
          tokens.splice(i+1, 0, ")");
        }
        
      }
    }
    return tokens;
  }
  
  let response = await fetch("https://adventofcode.com/2020/day/18/input");
  let str = await response.text();
  /*
  str = `1 + (2 * 3) + (4 * (5 + 6))
2 * 3 + (4 * 5)
5 + (8 * 3 + 9 + 3 * 4 * 3)
5 * 9 * (7 * 3 * 3 + 9 * 3 + (8 + 6 * 4))
((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2`;
  */
  
  let sum = 0;
  let sum2 = 0;
  for (let l of str.trim().split("\n")) {
    console.log(calculate(addBrackets(tokenize(l))));
    sum += calculate(tokenize(l));
    sum2 += calculate(addBrackets(tokenize(l)));
  }
  
  console.log([sum, sum2]);
  
})();