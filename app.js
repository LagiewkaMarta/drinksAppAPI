const drinkContainer = document.querySelector(".drink-container");
const searchButton = document.querySelector(".random-button");
// console.log(searchButton)
class Drinks {
  async fetchDrinks() {
    try {
      let drinks = await fetch("./drinks.json");
      drinks = await drinks.json();
      return drinks.drinks;
    } catch (error) {
      console.error(error);
    }
  }
}
class UI {
  loopDrinks(drinks) {
    let arr = drinks.map(d => {
      let values = [];
      for (let i = 1; i < 15; i++) {
        values.push(`strIngredient${i}`);
      }
    //   console.log(values);
    //   console.log(d[values[0]]);
      return values.map(el => {
        // console.log(d[el]);
        return d[el];
      });
    });
    return arr;
  }
  displayDrinks(drinks) {
    let res = "";
    let answer = [...this.loopDrinks(drinks)];
    console.log(answer);
    let killme = "";
    let liItems = answer[0].forEach((li, i) => {
        if (li.length > 0){
        killme+= `<li>${li}</li>`

        console.log(killme)
        }
    });

    drinks.forEach(drink => {
      res += `
            <div>${drink.strDrink}</div>
            <div>
            <img src=${drink.strDrinkThumb}></img>
            <ul>
            ${killme}
            </ul>
            </div>
            `;
    });
    drinkContainer.innerHTML = res;
  }
  getRandomBtn(drinks) {
    document.addEventListener("click", e => {
      e.preventDefault();
      let data = drinks.fetchDrinks();
      // console.log(data)
      data.then(dr => this.displayDrinks(dr));
    });
  }
}
document.addEventListener("DOMContentLoaded", () => {
  const drinks = new Drinks();
  const ui = new UI();
  let data = ui.getRandomBtn(drinks);
  // let data = drinks.fetchDrinks();
  // dataa.then(dr => ui.displayDrinks(dr))
});
