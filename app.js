const drinkContainer = document.querySelector(".drinks-container");
const randomDrinkBtn = document.querySelector(".random-button");
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
  getIngredientsList(drinks) {
    let arr = drinks.map(drink => {
      let ingredientsArr = [];
      for (let i = 1; i <= 15; i++) {
        let ingredientKey = `strIngredient${i}`;
        // check if ingredient exists
        if (drink[ingredientKey].length > 0) {
          ingredientsArr.push(drink[ingredientKey]);
        }
      }
      return ingredientsArr;
    });
    return arr;
  }

  displayDrinks(drinks) {
    let allFetchedDrinks = "";
    let allIngredientsLists = this.getIngredientsList(drinks);
    allIngredientsLists.forEach((arr, i) => {
      let singleIngredientsList = "";
      arr.forEach(ingredient => {
        singleIngredientsList += `<li class="single-ingredient">${ingredient}</li>`;
      });
      allFetchedDrinks += `
        <h3 class="drink-name">${drinks[i].strDrink}</h3>
        <div class="drink-container">
        <img alt="" src=${drinks[i].strDrinkThumb}></img>
        <ul class="ingredients-list">
        ${singleIngredientsList}
        </ul>
        </div>
        `;
      drinkContainer.innerHTML = allFetchedDrinks;
    });
  }
  //adding add event Listener on random button
  handleRandomDrink(drinks) {
    randomDrinkBtn.addEventListener("click", e => {
      e.preventDefault();
      let data = drinks
        .fetchDrinks()
        .then(drinks => this.displayDrinks(drinks));
    });
  }
}
document.addEventListener("DOMContentLoaded", () => {
  const drinks = new Drinks();
  const ui = new UI();
  ui.handleRandomDrink(drinks);
});
