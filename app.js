const drinkContainer = document.querySelector(".drink-container");
const searchButton = document.querySelector(".random-button");
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
    let arr = drinks.map(drink => {
      let values = [];
      for (let i = 1; i <= 15; i++) {
        values.push(`strIngredient${i}`);
      }
      let kissmyass = [];
      for (let key of values) {
        if (drink[key].length > 0) {
          kissmyass.push(drink[key]);
          console.log(kissmyass);
        }
      }
      let returned = values.map(el => {
        return drink[el];
      });
      return kissmyass;
    });
    return arr;
  }
  displayDrinks(drinks) {
    let res = "";
    let answer = this.loopDrinks(drinks);


    answer.forEach((arr, i) => {
      let killme = "";
      arr.forEach(ing => {killme += `<li>${ing}</li>`;
      });
      console.log(drinks);
      res += `
        <div>${drinks[i].strDrink}</div>
        <div>
        <img src=${drinks[i].strDrinkThumb}></img>
        <ul>
        ${killme}
        </ul>
        </div>
        `;
      drinkContainer.innerHTML = res;
    });
  }
  //adding add event Listener on random button
  getRandomBtn(drinks) {
    searchButton.addEventListener("click", e => {
      e.preventDefault();
      let data = drinks.fetchDrinks();
      data.then(drinks => this.displayDrinks(drinks));
    });
  }
}
document.addEventListener("DOMContentLoaded", () => {
  const drinks = new Drinks();
  const ui = new UI();
  ui.getRandomBtn(drinks);
});
