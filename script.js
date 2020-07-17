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

  resultHeading.innerHTML = "";

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

//FETCH MEAL BY ID
function getMealById(mealID) {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
    .then((res) => res.json())
    .then((data) => {
      const meal = data.meals[0];

      addMealToDOM(meal);
    });
}

//ADD MEAL TO DOM
function addMealToDOM(meal) {
  const ingredients = [];

  for (let i = 1; i < 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push(
        `${meal[`strIngredient${i}`]} -${meal[`strMeasure${i}`]}`
      );
    } else {
      break;
    }
  }

  single_mealEl.innerHTML = `
  <div class="single-meal">
    <h1>${meal.strMeal}</h1>
    <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
    <div class="single-meal-info">
        ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ""}
        ${meal.strArea ? `<p>${meal.strArea}</p>` : ""}
    </div>
    <div class="main">
        <p>${meal.strInstructions}</p>
        <ul>
            ${ingredients
              .map((ingredient) => `<li>${ingredient}</li>`)
              .join("")}
        </ul>
    </div>
  </div>
  `;
}

//EVENT LISTENER
submit.addEventListener("submit", searchMeal);

mealsEl.addEventListener("click", (e) => {
  const mealInfo = e.path.find((item) => {
    if (item.classList) {
      return item.classList.contains("meal-info");
    } else {
      return false;
    }
  });

  if (mealInfo) {
    const mealID = mealInfo.getAttribute("data-mealid");
    getMealById(mealID);
  }
});
