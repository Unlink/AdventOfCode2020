(async () => {
  class TicketField {
    
    name;
    ranges = [];
    ticketPosition = [];
    
    constructor(row) {
      let match = row.match(/(.+): (\d+)-(\d+) or (\d+)-(\d+)/);
      this.name = match[1];
      this.ranges = [[parseInt(match[2]), parseInt(match[3])], [parseInt(match[4]), parseInt(match[5])]];
    }
  
    isInRange(value) {
      return (value >= this.ranges[0][0] && value <= this.ranges[0][1]) || (value >= this.ranges[1][0] && value <= this.ranges[1][1]);
    }
  
    removePosition(pos) {
      this.ticketPosition = this.ticketPosition.filter(p => p != pos);
    }
  }
  
  let response = await fetch("https://adventofcode.com/2020/day/16/input");
  let str = await response.text();
  
 /* str = `class: 1-3 or 5-7
row: 6-11 or 33-44
seat: 13-40 or 45-50

your ticket:
7,1,14

nearby tickets:
7,3,47
40,4,50
55,2,20
38,6,12`;*/
  
  let parts = str.trim().split("\n\n");
  let fields = [];
  for (let row of parts[0].trim().split("\n")) {
    fields.push(new TicketField(row));
  }

  let myTicket = parts[1].trim().split("\n")[1].split(",").map(x => parseInt(x));
  let otherTickets = parts[2].trim().split("\n").slice(1).map(r => r.split(",").map(x => parseInt(x)));
  
  //console.log([fields, myTicket, otherTickets]);

  let errorCode = otherTickets.map(r => r.filter(x => !fields.some(f => f.isInRange(x))).reduce((s, c) => s + c, 0)).reduce((s, c) => s + c);  

  console.log(errorCode);

  let goodTickets = otherTickets.filter(x => x.every(e => fields.some(f => f.isInRange(e))));
  //console.log(goodTickets);
  goodTickets.push(myTicket);
  
  for (let ticketField of fields) {
    for (let i = 0; i < fields.length; i++) {
      if (goodTickets.every(t => ticketField.isInRange(t[i]))) {
        ticketField.ticketPosition.push(i);    
      }
    }
  }

  for (let i = 0; i < fields.length; i++) {
    for (let ticketField of fields) {
      if (ticketField.ticketPosition.length == 1) {
        fields.forEach(f => f != ticketField ? f.removePosition(ticketField.ticketPosition[0]) : null);
      }
    }
  }

  console.log(fields);

  let result = fields.filter(f => f.name.startsWith("departure")).map(f => myTicket[f.ticketPosition[0]]).reduce((s, c) => s * c, 1);
  console.log(result);

})();