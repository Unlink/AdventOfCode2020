(async () => {
  const regex = /(\d+)-(\d+) (.+): (.*)$/gm;
  let response = await fetch("https://adventofcode.com/2020/day/2/input");
  let str = await response.text();

  let okPasswords = 0;
  let okPasswords2 = 0;
  let matches = str.matchAll(regex);
  
  for (const match of matches) {
    let char = match[3];
    let min = parseInt(match[1]);
    let max = parseInt(match[2]);
    let password = match[4];
    
    let occurrences = password.split(char).length - 1;
    console.log([char, min, max, occurrences, password]);
    if (occurrences >= min && occurrences <= max) okPasswords++;
    if (password[min-1] == char ^ password[max-1] == char)  okPasswords2++;
  }
  
  console.log([okPasswords, okPasswords2]);
})();