const recipeBtn = document.querySelector('.recipeBtn')
const recipeFeed = document.querySelector('.recipeFeed')
const listFragment = document.createDocumentFragment()
const URL = "https://www.themealdb.com/api/json/v1/1/random.php"


const formatIngredients = (ingredients) => {
    const ingredientsArr = 
    [ingredients.strIngredient1, ingredients.strIngredient2,
    ingredients.strIngredient3, ingredients.strIngredient4,
    ingredients.strIngredient5, ingredients.strIngredient6,
    ingredients.strIngredient7, ingredients.strIngredient8,
    ingredients.strIngredient9, ingredients.strIngredient10,
    ingredients.strIngredient11, ingredients.strIngredient12,
    ingredients.strIngredient13, ingredients.strIngredient14,
    ingredients.strIngredient15, ingredients.strIngredient16,
    ingredients.strIngredient17, ingredients.strIngredient18,
    ingredients.strIngredient19, ingredients.strIngredient20]

    return ingredientsArr
}

const showRecipe = (recipe) => {
    const div = document.createElement('div')
    const title = document.createElement('h2')
    const description = document.createElement('p')
    const ingredientsList = document.createElement('ul')
    const ingredientsArr = formatIngredients(recipe)

    ingredientsArr.forEach(element => {
        const ingredientSingle = document.createElement('li')

        ingredientSingle.textContent = element
        listFragment.appendChild(ingredientSingle)
    });

    ingredientsList.appendChild(listFragment)
    title.textContent = recipe.strMeal
    description.textContent = recipe.strInstructions
    div.appendChild(title)
    div.appendChild(description)
    div.appendChild(ingredientsList)
    div.classList.add('recipeElement')

    recipeFeed.append(div)
}



recipeBtn.addEventListener('click', async () => {
    let recipe = {};
    await fetch(URL)
    .then(response =>{ return response.json()})
    .then(response => {
        recipe = response.meals[0]
    })
    showRecipe(recipe)
    recipeFeed.removeChild(recipeFeed.childNodes[0])
    console.log(recipe)
})
