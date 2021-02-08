// search function
const clickSearch = () => {
    const input = document.getElementById('input').value;
    document.getElementById('input').value = "";
    if (input == "") {
        alert('you should input text')
    } else {
        inputFoods(input);
    }
    // for clear
    document.getElementById('foods').innerHTML = "";
    document.getElementById('food-description').innerHTML = "";
    document.getElementById('message').style.display = 'none';
}
//  sync food data
const inputFoods = (input) => {
    // fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${input}`)
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${input}`)
    // fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${input}`)
        .then(res => res.json())
        .then(data => findFoods(data.meals))
        // for unexpected value
        .catch(error => foodError('this data is sever out'));
}
//  see search result
const findFoods = foodsName => {
    const foodsArea = document.getElementById('foods');
    foodsName.forEach(foodName => {
        const foodArea = document.createElement('div');
        foodArea.className = 'food';
        const foodDes = `
            <div onclick="foodDescription('${foodName.strMeal}')">
                <img src="${foodName.strMealThumb}">
                <h3>${foodName.strMeal}</h3>
            </div>
        `;
        foodArea.innerHTML = foodDes;
        foodsArea.appendChild(foodArea);
    });
}
//  details part
const foodDescription = foodName => {
    // const url = 
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${foodName}`)
        .then(res => res.json())
        .then(data => foodIngredients(data.meals[0]))
}

const foodIngredients = foodName => {
    const foodArea = document.getElementById('food-description');
    foodArea.innerHTML = `
        <img src="${foodName.strMealThumb}">
        <h2>${foodName.strMeal}</h2>
        <h4>Ingredients:</h4>
        <ul>
        <li>${foodName.strIngredient1}</li>
        <li>${foodName.strIngredient2}</li>
        <li>${foodName.strIngredient3}</li>
        <li>${foodName.strIngredient4}</li>
        <li>${foodName.strIngredient5}</li>
        <li>${foodName.strIngredient6}</li>
        <li>${foodName.strIngredient7}</li>
        <li>${foodName.strIngredient8}</li>
        <li>${foodName.strIngredient9}</li>
        <li>${foodName.strIngredient10}</li>
        </ul>
    `;
}
// error message show
const foodError = error => {
    const errorMessage = document.getElementById('message-text');
    document.getElementById('message').style.display = 'block';
    errorMessage.innerText = error;
}
// error message hide
const messageClose = () => {
    document.getElementById('message').style.display = 'none';
}