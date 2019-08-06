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
    let arr = drinks.map(drink => {
        // console.log(drink)
      let values = [];
      for (let i = 1; i <= 15; i++) {
        values.push(`strIngredient${i}`);
      }
    //   console.log(values)
      let returned = values.map(el => {
        return drink[el];
      });
      return returned;
    });
    return arr;
  }
  displayDrinks(drinks) {
    let res = "";
    let answer = this.loopDrinks(drinks);
    // console.log(drinks,answer);

    let a = answer.forEach((arr,i) => {
        let killme = "";
        arr.forEach(ing => {
            if (ing.length > 0) {
            killme += `<li>${ing}</li>`
            }
            
        })
        console.log(drinks)
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



    })
    // let liItems = answer.forEach(li => {
    //   if (li.length > 0) {
    //     killme += `<li>${li}</li>`;

    //     // console.log(killme);
    //   }
    // });

    // drinks.forEach(drink => {
    //   res += `
    //         <div>${drink.strDrink}</div>
    //         <div>
    //         <img src=${drink.strDrinkThumb}></img>
    //         <ul>
    //         ${killme}
    //         </ul>
    //         </div>
    //         `;
    // });

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
