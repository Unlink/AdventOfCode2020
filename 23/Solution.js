(() => {
  
  class Cup {
    prev;
    next;
    value;
    
    constructor(x) {
      this.value = x;
    }
  }
  
  let cups = "523764819".split("").map(x => parseInt(x));
  let cupsList = new Array(1000000+1);
  
  let prevCup = null;
  let cup = null;
  for (let i = 1; i < cupsList.length; i++) {
    let value = i;
    if (i <= cups.length) {
      value = cups[i-1];
    }
    
    cup = new Cup(value);
    cupsList[value] = cup;
    
    if (prevCup != null) {
      prevCup.next = cup;
      cup.prev = prevCup;
    }
    prevCup = cup;
  }
  
  cupsList[cups[0]].prev = cup;
  cup.next = cupsList[cups[0]];
  
  console.log("Filled");
  console.log(cupsList);
  
  
  let current = cupsList[cups[0]];
  
  console.log(current);

  for (let i = 0; i < 10000000; i++) {
    //Step 1
    let removedFirst = current.next;
    let removedLast = current.next.next.next;
    
    current.next = removedLast.next;
    removedLast.next.prev = current;
    

    //Step 2
    let destination = current.value;
    do {
      destination--;
    } while (((removedFirst.value == destination || removedFirst.next.value == destination || removedLast.value == destination) && destination > 0));
    
    if (destination < 1) {
      destination = cupsList.length;
      do {
      	destination--;
    	} while ((removedFirst.value == destination || removedFirst.next.value == destination || removedLast.value == destination))
    }
    
    //Step 3
    let destCup = cupsList[destination];
    //console.log(current.value, destCup.value, cupsList);
    removedLast.next = destCup.next;
    destCup.next.prev = removedLast;
    destCup.next = removedFirst;
    removedFirst.prev = destCup;
    
    
    //Stop 4
    current = current.next;
   
  }
  
  let cupOrder = "";
  current = cupsList[1];
  do {
    current = current.next;
    cupOrder+= current.value;
  } while (current != cupsList[1]);
  console.log(cupOrder);
  
  console.log(cupsList[1].next.value * cupsList[1].next.next.value)
    
})();