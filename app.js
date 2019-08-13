const drinkContainer = document.querySelector(".drinks-container");
const randomDrinkBtn = document.querySelector(".random-button");
const searchDrinkBtn = document.querySelector(".search-for-drink");
const input = document.querySelector("input");
const form = document.querySelector("form");
// console.log(inputSearch)
class Drinks {
  async fetchDrinks(random, query = false) {
    if (!random) {
      try {
        let drinks = await fetch(
          `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${query}`
        );
        drinks = await drinks.json();
        console.log(drinks);
        if(drinks.drinks == null){
          return null
        } else{
        return drinks.drinks;
        }
      } catch (error) {
        throw new Error("error");
      }
    } else {
      try {
        let drinks = await fetch(
          "https://www.thecocktaildb.com/api/json/v1/1/random.php"
        );
        drinks = await drinks.json();
        return drinks.drinks;
      } catch (error) {
        return null;
      }
    }
  }
}

class NewQuery {
  constructor(value) {
    this.value = value;
  }
}
class UI {
  getIngredientsList(drinks) {
    if (!drinks) return null;
    let arr = drinks.map(drink => {
      let ingredientsArr = [];
      for (let i = 1; i <= 15; i++) {
        let ingredientKey = `strIngredient${i}`;
        // check if ingredient exists
        if (drink[ingredientKey] && drink[ingredientKey].length > 0) {
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
    if (allIngredientsLists === null) {
      allFetchedDrinks += `
        <div class="drink-container">
        <h3 class="drink-error">sorry no drinks found</h3>
        </div>
        `;
      drinkContainer.innerHTML = allFetchedDrinks;
    } else {
      allIngredientsLists.forEach((arr, i) => {
        let singleIngredientsList = "";
        arr.forEach(ingredient => {
          singleIngredientsList += `<li class="drink-ingredient">${ingredient}</li>`;
        });
        allFetchedDrinks += `
        <div class="drink-container">
        <div class="drink-container-header">
            <h3 class="drink-name">${drinks[i].strDrink}</h3>
            <div class="drink-img-container">
                <img class="drink-img" src="${drinks[i].strDrinkThumb}" alt="">
            </div>
        </div>
        <div class="drink-container-body">
            <h5 class="ingredients">INGREDIENTS:</h5>
            <ul class="drink-ingredients-list">
            ${singleIngredientsList}
            </ul>
        </div>
    </div>
        `;
        drinkContainer.innerHTML = allFetchedDrinks;
      });
    }
  }
  //adding add event Listener on random button
  handleRandomDrink(drinks) {
    randomDrinkBtn.addEventListener("click", e => {
      e.preventDefault();
      let data = drinks
        .fetchDrinks(true)
        .then(drinks => this.displayDrinks(drinks));
    });
  }
  listenForEvent(drinks) {
    let inputValue;
    input.addEventListener("change", e => {
      e.preventDefault();
      inputValue = e.target.value;
    });

    form.addEventListener("submit", e => {
      e.preventDefault();
      drinks
        .fetchDrinks(false, inputValue)
        .then(drinks => this.displayDrinks(drinks))
        .catch(error => {
          () => this.displayDrinks(null)
        });
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const drinks = new Drinks();
  const ui = new UI();
  ui.handleRandomDrink(drinks);
  ui.listenForEvent(drinks);
});
