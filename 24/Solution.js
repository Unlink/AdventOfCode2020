(async () => {
  let response = await fetch("https://adventofcode.com/2020/day/24/input");
  let str = await response.text();
  /*str = `sesenwnenenewseeswwswswwnenewsewsw
neeenesenwnwwswnenewnwwsewnenwseswesw
seswneswswsenwwnwse
nwnwneseeswswnenewneswwnewseswneseene
swweswneswnenwsewnwneneseenw
eesenwseswswnenwswnwnwsewwnwsene
sewnenenenesenwsewnenwwwse
wenwwweseeeweswwwnwwe
wsweesenenewnwwnwsenewsenwwsesesenwne
neeswseenwwswnwswswnw
nenwswwsewswnenenewsenwsenwnesesenew
enewnwewneswsewnwswenweswnenwsenwsw
sweneswneswneneenwnewenewwneswswnese
swwesenesewenwneswnwwneseswwne
enesenwswwswneneswsenwnewswseenwsese
wnwnesenesenenwwnenwsewesewsesesew
nenewswnwewswnenesenwnesewesw
eneswnwswnwsenenwnwnwwseeswneewsenese
neswnwewnwnwseenwseesewsenwsweewe
wseweeenwnesenwwwswnew`;*/
 
  let directions = {
    e: [1, -1, 0],
    se: [0, -1, 1], 
    sw: [-1, 0, 1], 
    w: [-1, 1, 0],
    nw: [0, 1, -1],
    ne: [1, 0, -1]
  };
  let regex = /(se)|(sw)|(nw)|(ne)|(e)|(w)/gm;
  let instructions = str.trim().split("\n").map(r => [...r.matchAll(regex)].map(z => directions[z[0]]));
  
  let blackNeighbords = (c, flipped) => {
    return Object.values(directions).filter(d => flipped.has(d.map((val, i) => val + c[i]).join(","))).length;
  }
  
  let flipped = new Set();
  for (let instruction of instructions) {
    let tile = [0, 0, 0];
    for (let m of instruction) {
      tile = tile.map((val, i) => val + m[i]);
    }
    
    let tileStr = tile.join(",");
    if (flipped.has(tileStr)) {
      flipped.delete(tileStr);
    }
    else {
      flipped.add(tileStr);
    }
  }
  
  console.log(flipped.size);
  
  for (let day = 0; day < 100; day++) {
    let newFlipped = new Set();
    for (let tile of flipped) {
      let tileCoords = tile.split(",").map(x => parseInt(x));
      if (blackNeighbords(tileCoords, flipped) == 1 || blackNeighbords(tileCoords, flipped) == 2) {
        newFlipped.add(tile);
      }
      for (let d of Object.values(directions)) {
        let n = tileCoords.map((val, i) => val + d[i]);
        if (!flipped.has(n.join(",")) && blackNeighbords(n, flipped) == 2) {
          newFlipped.add(n.join(","));
        }
      }
    }
    flipped = newFlipped;
    console.log("Day "+day+" black "+newFlipped.size);
  }
  
})();