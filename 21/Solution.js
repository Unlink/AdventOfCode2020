(async () => {
  let response = await fetch("https://adventofcode.com/2020/day/21/input");
  let str = await response.text();
/*  str = `mxmxvkd kfcds sqjhc nhms (contains dairy, fish)
trh fvjkl sbzzf mxmxvkd (contains dairy)
sqjhc fvjkl (contains soy)
sqjhc mxmxvkd sbzzf (contains fish)
`;*/
  
  let data = str.replace(/\(|\)|,/g, "").trim().split("\n").map(r => ({
    food: new Set(r.split("contains")[0].trim().split(" ")),
    alergens: new Set(r.split("contains")[1].trim().split(" ")) 
  }));
  
  console.log(data);
  
  let allAlergens = new Set(data.flatMap(e => [...e.alergens]));
  console.log(allAlergens);
  
  let alergicFoods = {};
  for (let a of allAlergens) {
    let candidates = null;
    for (let f of data) {
      if (f.alergens.has(a)) {
        if (candidates == null) {
          candidates = [...f.food];
        }
        else {
          candidates = candidates.filter(x => f.food.has(x));
        }
      }
    }
    alergicFoods[a] = candidates;
  }
  
  let allergicFoodsSummary = new Set(Object.values(alergicFoods).flatMap(a => [...a]));
  
  console.log(alergicFoods);
  console.log(allergicFoodsSummary);
  
  console.log(data.flatMap(e => [...e.food]).filter(x => !allergicFoodsSummary.has(x)).length);
  
  let changed;
  do {
    changed = false;
    for (let alergen in alergicFoods) {
      if (alergicFoods[alergen].length == 1) {
        let food = alergicFoods[alergen][0];
        Object.entries(alergicFoods).forEach(([k, v]) => {
          if (k != alergen && v.includes(food)) {
            alergicFoods[k] = v.filter(x => x != food);
            changed = true;
          }
        });
      }
    }
  } while (changed);
  console.log(alergicFoods);
  
  let sortedAllergens = Object.keys(alergicFoods);
  sortedAllergens.sort();
  console.log(sortedAllergens);
  console.log(sortedAllergens.map(a => alergicFoods[a]).join(","));
  
})();