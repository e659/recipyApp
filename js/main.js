const tabRow = document.querySelector(".tabRow");
const tabs = document.querySelectorAll(".tab");
const recipeData = document.getElementById("recipeData");
const navLinks = document.querySelectorAll(".nav-link");
const favAlertIcon = document.querySelector(".favAlertIcon");
let recipes = [];
let oneRecipe = [];
getRecipes("steak");
// getDataByAJAX
async function getRecipes(meal) {
  let response = await fetch(
    `https://forkify-api.herokuapp.com/api/search?q=${meal}`
  );

  recipes = await response.json();
  console.log(recipes.recipes);
  displayRecipes();
}

// displayRecipe
function displayRecipes() {
  let recipe = "";
  for (let i = 0; i < recipes.recipes.length; i++) {
    recipe += `
    <div id=product-id-${recipes.recipes[i].recipe_id} class="col-md-3">
    <div class="card position-relative">
    <div class="d-flex justify-content-center">
    <i id="addTocartBtn" onclick="addToCart(${recipes.recipes[i].recipe_id})"
     class="fa fa-light fa-cart-shopping shoppingCart position-absolute"></i>  
     <i id="addToFav"
     onclick="addToFav(${
       recipes.recipes[i].recipe_id
     })" class="fa fa-regular fa-heart "></i>
     <div class="layout card-img-top  rounded rounded-5"></div>
    <img src="
      ${recipes.recipes[i].image_url}"
     class=" card-img-top  rounded rounded-5" alt="dish">
    </div>
    <div class="card-body pt-4">
    <div class="d-flex justify-content-between">
    <h5 class="card-title ">${recipes.recipes[i].title}</h5>
    <div class="d-flex">
    <ul class="fa-ul">
    <li class="cartPrice">
    ${recipes.recipes[i].social_rank.toFixed(1)}$
   </li>
  </ul>

    </div>
    </div>  
      <div class="d-flex justify-content-between btnsDiv">
      <a href="${recipes.recipes[i].source_url}" 
      target="_blank"
       class="btn sourceBtn px-3 me-5">Source</a>
      <a
       onclick="openDetailsModel(${recipes.recipes[i].recipe_id})"  
       class="btn detailsBtn px-3"
       data-bs-toggle="modal"
       data-bs-target="#exampleModal1"
       >Details</a>
      </div>
    
    </div>
  </div>
          </div> 
    `;
  }
  document.querySelector(".recipeRow").innerHTML = recipe;
}
// navLinks
// navigateTabs
for (let i = 0; i < navLinks.length; i++) {
  navLinks[i].addEventListener("click", function (e) {
    //  console.log( e.target.innerHTML);
    navLinks.forEach((f) => f.classList.remove("active"));
    e.target.classList.toggle("active");
  });
}

// navigateTabs
for (let i = 0; i < tabs.length; i++) {
  tabs[i].addEventListener("click", function (e) {
    let currentMeal = e.target.innerHTML;
    getRecipes(currentMeal);
    tabs.forEach((f) => f.classList.remove("activeLink"));
    e.target.classList.toggle("activeLink");
  });
}

// openDetailsModel
async function openDetailsModel(recipeId) {
  let response = await fetch(
    `https://forkify-api.herokuapp.com/api/get?rId=${recipeId}`
  );
  oneRecipe = await response.json();
  // console.log(oneRecipe.recipe);
  displayRecipeModel();
}
// displayRecipeModel
function displayRecipeModel() {
  // console.log(oneRecipe.recipe);
  let recipe = "";
  recipe = `
  <div class="d-flex justify-content-center">
  <img src="
  ${oneRecipe.recipe.image_url}"
    class="img-fluid detailsImg"
     alt="dish">
  </div>
         <div class="text-center pt-3">
         <p class="fs-2 detailTittle">"${oneRecipe.recipe.title}"</p> 
         </div>
         <div class="">
         <h4 class="ingredients">ingredients:
         </h4>
        <p class="px-4">"${oneRecipe.recipe.ingredients}"</p>
         </div>
`;

  recipeData.innerHTML = recipe;
}

// deletealert
favAlertIcon.addEventListener("click", function () {
  document.querySelector(".favAlert").classList.add("d-none");
});
