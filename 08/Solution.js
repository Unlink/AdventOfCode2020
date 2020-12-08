(async () => {
  
  class Program {
    
    step = 0;
    program = [];
  	ip = 0;
  	acc = 0;
  	debugFn = null;
  
  	constructor(code) {
      for (let op of code) {
        let opParts = op.split(" ");
        this.program.push([opParts[0], parseInt(opParts[1])]);
      }
    }
  
  	run() {
      while (this.ip >= 0 && this.ip < this.program.length && ++this.step < 1000000) {
        let instruction = this.program[this.ip];
        if (typeof this.debugFn === 'function') {
          if (this.debugFn(instruction)) {
            return -1;
          }
        }
        
        switch (instruction[0]) {
          case "acc":
            this.acc += instruction[1];
            break;
          case "jmp":
            this.ip += instruction[1] - 1;
            break;
          case "nop":
            break;
        }
        this.ip++;
      }
      return 0;
    }
  }
  
  let response = await fetch("https://adventofcode.com/2020/day/8/input");
  let str = await response.text();

	let code = str.trim().split("\n").map(l => l.trim());

  let runnedInstructions = new Set();
  let program = new Program(code);
  program.debugFn = (x) => {
    if (runnedInstructions.has(program.ip)) {
      console.log(program.acc);
      return true;
    }
    runnedInstructions.add(program.ip);
    return false;
  };
  
  program.run();

	for (let i = 0; i < code.length; i++) {
    console.log(i);
    let runnedInstructions = new Set();
    let program = new Program(code);
    
    if (program.program[i][0] == "acc") continue;
    program.program[i][0] = program.program[i][0] == "jmp" ? "nop" : "jmp";
    
    program.debugFn = (x) => {
      if (runnedInstructions.has(program.ip)) {
        return true;
      }
      runnedInstructions.add(program.ip);
      return false;
    };
    
    if (program.run() == 0) {
      console.log(program.acc);
      break;
    }
  }
	
  
})();