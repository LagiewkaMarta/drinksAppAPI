class Drinks{
    async fetchDrinks() {
        try {
            // let drinks = await fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php");
            drinks = await drinks.json()
            console.log(drinks)
        } catch (error) {
            console.error(error)
        }
    }
}

document.addEventListener("DOMContentLoaded", () => {
const drinks = new Drinks();
drinks.fetchDrinks()
})