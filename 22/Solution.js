(async () => {
  let response = await fetch("https://adventofcode.com/2020/day/22/input");
  let str = await response.text();
/*  str = `Player 1:
9
2
6
3
1

Player 2:
5
8
4
7
10`;*/
  
  let cards = str.trim().split("\n\n").map(x => x.trim().split("\n").slice(1).map(z => parseInt(z)));
  
  while (cards[0].length > 0 && cards[1].length > 0) {
    let c1 = cards[0].shift();
    let c2 = cards[1].shift();
    
    if (c1 > c2) {
      cards[0].push(c1);
      cards[0].push(c2);
    }
    else {
      cards[1].push(c2);
      cards[1].push(c1);
    }
  }
  
  console.log(cards);
  
  let score = cards[0].concat(cards[1]).reduce((s, c, i, a) => s + c * (a.length - i), 0);
  console.log(score);
  
  //Recursive version
  let playGame = (cards, g = 1) => {
    
    let gameStateSet = new Set();
    let round = 1;
    
    while (cards[0].length > 0 && cards[1].length > 0) {
      let gameFingerprint = cards[0].join(",")+":"+cards[1].join(",");
      if (gameStateSet.has(gameFingerprint)) {
        return true;
      }
      gameStateSet.add(gameFingerprint);
      
      let gameState = "-- Round "+round+" (Game "+g+") --\nPlayer 1's deck: "+cards[0].join(",")+"\nPlayer 2's deck: "+cards[1].join(",")+"\n";
      
      let c1 = cards[0].shift();
      let c2 = cards[1].shift();
      
      gameState+="Player 1 plays: "+c1+"\nPlayer 2 plays: "+c2+"\n";

      if (c1 <= cards[0].length && c2 <= cards[1].length) {
        gameState+="Playing a sub-game to determine the winner...\n";
        console.log(gameState);
        if (playGame([cards[0].slice(0, c1), cards[1].slice(0, c2)], g+1)) {
          cards[0].push(c1);
          cards[0].push(c2);
        }
        else {
          cards[1].push(c2);
          cards[1].push(c1);
        }
      } 
      else {
        if (c1 > c2) {
          cards[0].push(c1);
          cards[0].push(c2);
          gameState+="Player 1 wins round "+round+" of game "+g+"!\n";
        	//console.log(gameState);
        }
        else {
          cards[1].push(c2);
          cards[1].push(c1);
          gameState+="Player 2 wins round "+round+" of game "+g+"!\n";
        	//console.log(gameState);
        }
      }
      round++;
    }
    
    console.log("The winner of game "+g+" is player "+(cards[0].length > 0 ? 1 : 2)+"!");
    return cards[0].length > 0; 
  }
  
  cards = str.trim().split("\n\n").map(x => x.trim().split("\n").slice(1).map(z => parseInt(z)));
  playGame(cards);
  
  console.log(cards);
  
  score = cards[0].concat(cards[1]).reduce((s, c, i, a) => s + c * (a.length - i), 0);
  console.log(score);
 
  
})();