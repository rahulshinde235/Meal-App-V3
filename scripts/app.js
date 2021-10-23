const form = document.querySelector("form");
const details = document.querySelector(".details");
const favButton = document.querySelector(".fav-button");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const inputMeal = form.meal.value.trim();
  form.reset();
  setMeal(inputMeal)
    .then((data) => updateUI(data))
    .catch((err) => alert("Please enter another dish"));
});

const setMeal = async (inputMeal) => {
  const mealDetails = await getMeal(inputMeal);
  return mealDetails;
};
let favMealID;
let favMealName;
let favMealImage;
let meal = {};
const updateUI = (data) => {
  favMealID = data.meals[0].idMeal;
  favMealName = data.meals[0].strMeal;
  favMealImage = data.meals[0].strMealThumb;
  meal = { favMealID, favMealName, favMealImage };

  details.innerHTML = `
    <div class="info">
      <p><span class="i">Meal ID:</span>${data.meals[0].idMeal}</p>
      <p><span class="i">Meal Name:</span>${data.meals[0].strMeal}</p>
      <p><span class="i">Category:</span>${data.meals[0].strCategory}</p>
      <p><span class="i">Meal Type:</span>${data.meals[0].strArea}</p>
    </div>
    <div class="recipe">    
      <img src="${data.meals[0].strMealThumb}" class="meal-img"/>
      <div class="indgredients">
        <p>${data.meals[0].strInstructions}</p>
        <ol>
          <li>${data.meals[0].strIngredient1}</li>
          <li>${data.meals[0].strIngredient2}</li>
          <li>${data.meals[0].strIngredient3}</li>
          <li>${data.meals[0].strIngredient4}</li>
          <li>${data.meals[0].strIngredient5}</li>
        <ol>
      <div >
    </div>
    `;
};
let favMealArray = [];

favButton.addEventListener("click", (event) => {
  if (meal.favMealID) {
    if (favMealArray.length === 0 && localStorage.getItem("meals") === null) {
      favMealArray.push(meal);
      confetti.start();
      window.localStorage.setItem("meals", JSON.stringify(favMealArray));
    } else {
      console.log("I am getting here");
      var array = localStorage.getItem("meals");
      // Parse it to something usable in js
      array = JSON.parse(array);
      let add = true;
      for (let item in array) {
        if (array[item].favMealID === meal.favMealID) {
          add = false;
        }
      }
      if (add) {
        array.push(meal);
        confetti.start();
        window.localStorage.setItem("meals", JSON.stringify(array));
      }
    }
  }
});
setInterval(() => {
  confetti.stop();
}, 3000);
