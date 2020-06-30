const recipeBtn = document.querySelector('.recipeBtn')
const recipeFeed = document.querySelector('.recipeFeed')
const recipeTip = document.querySelector('.recipeTip')
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

const formatMeasures = (measure) => {
    const measuresArr = 
    [measure.strMeasure1, measure.strMeasure2,
    measure.strMeasure3, measure.strMeasure4,
    measure.strMeasure5, measure.strMeasure6,
    measure.strMeasure7, measure.strMeasure8,
    measure.strMeasure9, measure.strMeasure10,
    measure.strMeasure11, measure.strMeasure12,
    measure.strMeasure13, measure.strMeasure14,
    measure.strMeasure15, measure.strMeasure16,
    measure.strMeasure17, measure.strMeasure18,
    measure.strMeasure19, measure.strMeasure20]

    return measuresArr
}

const formattedList = (items) => {
    const listFragment = document.createDocumentFragment()
    items.forEach(element => {
        const singleElement = document.createElement('li')
        
        singleElement.textContent = element
        listFragment.appendChild(singleElement)

        if(singleElement.textContent === '' || singleElement.textContent === " "){
            listFragment.removeChild(singleElement)
        }
    });
    return listFragment
}

const showRecipe = (recipe) => {
    const div = document.createElement('div')
    const itemList = document.createElement('div')
    const links = document.createElement('div')

    const title = document.createElement('h2')
    const thumbnail = document.createElement('img')
    const category = document.createElement('p')
    const description = document.createElement('p')
    const ingredientsList = document.createElement('ul')
    const measureList = document.createElement('ul')
    const youtube = document.createElement('a')
    const source = document.createElement('a')
    const youtubeIcon = document.createElement('img')
    const sourceIcon = document.createElement('img')

    //Getting a document fragment of li elements to show it on the UI

    const ingredientsArr = formattedList(formatIngredients(recipe))
    const measureArr = formattedList(formatMeasures(recipe)) 

    //Populate the content of the recipe in the UI

    title.textContent = recipe.strMeal
    thumbnail.src = recipe.strMealThumb
    category.textContent = `Category: ${recipe.strCategory}`
    description.textContent = recipe.strInstructions

    ingredientsList.appendChild(ingredientsArr)
    measureList.appendChild(measureArr)
    
    itemList.appendChild(ingredientsList)
    itemList.appendChild(measureList)

    youtube.href = recipe.strYoutube
    source.href = recipe.strSource
    youtube.textContent = "Watch how to do it!"
    source.textContent = "Go to the original recipe."

    youtubeIcon.src = "./icons/youtube.svg"
    youtube.appendChild(youtubeIcon)
    links.appendChild(youtube)

    sourceIcon.src = "./icons/horneando.svg"
    source.appendChild(sourceIcon)
    links.appendChild(source)

    //Classes
    div.classList.add('recipeFeed__recipe')
    title.classList.add('recipeFeed__title')
    thumbnail.classList.add('recipeFeed__thumbnail')
    category.classList.add('recipeFeed__category')
    description.classList.add('recipeFeed__description')
    itemList.classList.add('recipeFeed__items')
    links.classList.add('recipeFeed__links')
    youtube.classList.add('recipeFeed__link-youtube')
    source.classList.add('recipeFeed__links-source')

    //Append to the main div
    div.appendChild(title)
    div.appendChild(thumbnail)
    div.appendChild(category)
    div.appendChild(description)
    div.appendChild(itemList)
    div.appendChild(links)

    recipeFeed.append(div)
}

const init = async () => {
    let recipe = {};
    recipeTip.style.display = "none"
    await fetch(URL)
    .then(response =>{ return response.json()})
    .then(response => {
        recipe = response.meals[0]
    })
    recipeFeed.removeChild(recipeFeed.children[0])
    showRecipe(recipe)
}


recipeBtn.addEventListener('click', init)
