const favItems = document.querySelector(".fav-items");
if (localStorage.getItem("meals") === null) {
  favItems.innerHTML = `<p style="font-size:1.5rem;text-align:center;;margin-top:10%;">No Favourites Selected</p>`;
} else {
  var array = localStorage.getItem("meals");
  // Parse it to something usable in js
  array = JSON.parse(array);
  if (array.length > 0) {
    array.map((item) => {
      favItems.innerHTML += `
  <li>
    <p>${item.favMealID}</p>
    <p>${item.favMealName}</p>
    <img src="${item.favMealImage}"/>
    <button value="${item.favMealID}">Delete Me</button>
    <button><a href="https://www.themealdb.com/meal.php?c=${item.favMealID}">Know More</a>
    </li>
    `;
    });
  }
}

favItems.addEventListener("click", (event) => {
  if (event.target.nodeName == "BUTTON") {
    let key;
    if (array.length > 0) {
      for (let item in array) {
        if (array[item].favMealID === event.target.value) {
          key = item;
        }
      }
    }
    array.splice(key, 1);

    console.log(array.length);
    if (array.length > 0) {
      localStorage.setItem("meals", JSON.stringify(array));
    } else {
      localStorage.clear();
    }
    event.target.parentElement.remove();
    location.reload();
  }
});
