const search = document.getElementById("search"),
  submit = document.getElementById("submit"),
  random = document.getElementById("random"),
  mealsEl = document.getElementById("meals"),
  resultHeading = document.getElementById("result-heading"),
  single_mealEl = document.getElementById("single-meal");

//SEARCH MEAL API REQUEST
function searchMeal(e) {
  e.preventDefault();

  //CLEAR SINGLE MEAL
  single_mealEl.innerHTML = "";

  //GET SEARCH TEARM
  const term = search.value;

  //CHECK FOR EMPTY
  if (term.trim()) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.meals === null) {
          resultHeading.innerHTML = `<h2>No Results For '${term}'</h2>`;
        } else {
          resultHeading.innerHTML = `<h2>Search Results for '${term}':</h2>`;
          mealsEl.innerHTML = data.meals
            .map(
              (meal) => `
          <div class="meal">
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
            <div class="meal-info" data-mealID="${meal.idMeal}">
                <h3>${meal.strMeal}</h3>
            </div>
          </div>
          `
            )
            .join("");
        }
      });
    //CLEAR SEARCH TEXT
    search.value = "";
  } else {
    alert("Please enter a search term");
  }
}

//EVENT LISTENER
submit.addEventListener("submit", searchMeal);
