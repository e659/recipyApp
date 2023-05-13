let favs;
const favLength = document.querySelector(".favLength");
const favComment = document.querySelector(".favAlert");
const favsearch = document.querySelector(".favsearch");
const clearAllfavBtn = document.querySelector(".clearAllfavBtn");

// saveDataInLocal
if (localStorage.getItem("favItems") == null) {
  favs = [];
} else {
  favs = JSON.parse(localStorage.getItem("favItems"));
  display();
  favLength.innerHTML = favs.length;
}
// addToFav
function addToFav(recipe_id) {
  let selectedItem = recipe_id;
  console.log(selectedItem);
  let choosenItem = recipes.recipes.find((item) => item.recipe_id == recipe_id);

  let itemIndex = favs.find((item) => item.id === selectedItem);
  //   console.log(itemIndex);
  if (itemIndex === undefined) {
    favs.push({
      id: selectedItem,
      choosenItem: choosenItem,
      quantity: 1,
    });
    document.querySelector(".favAlert").classList.add("d-none");
  } else {
    document.querySelector(".favAlert").classList.remove("d-none");
  }
  console.log("favs", favs);
  localStorage.setItem("favItems", JSON.stringify(favs));
  display();
  favLength.innerHTML = favs.length;
}
// displayFav
function display() {
  let recipe = "";
  for (let i = 0; i < favs.length; i++) {
    recipe += `
    
    <div id=product-id-${favs[i].choosenItem.recipe_id} class="col-md-3">
    <div class="card position-relative favCard">
    <div class="d-flex justify-content-center">
    <i onClick="deleteFavItem(${i})"
    class="fa fa-duotone fa-circle-xmark" style="--fa-primary-color: #ffffff; --fa-secondary-color: #33b572;"></i>
    <i id="addTocartBtn" onclick="addToCart(${favs[i].choosenItem.recipe_id})"
     class="fa fa-light fa-cart-shopping shoppingCart position-absolute"></i>
  
    <img src="
      ${favs[i].choosenItem.image_url}"
     class="card-img-top  rounded rounded-5" alt="dish">
    </div>
    <div class="card-body pt-4">
    <div class="d-flex justify-content-between">
    <h5 class="card-title ">${favs[i].choosenItem.title}</h5>
    <div class="d-flex">
    <ul class="fa-ul">
    <li class="cartPrice">
    ${favs[i].choosenItem.social_rank.toFixed(1)}$
   </li>
  </ul>

    </div>
    </div>  
      <div class="d-flex justify-content-between btnsDiv favbtnDiv">
      <a href="${favs[i].choosenItem.source_url}" 
      target="_blank"
       class="btn sourceBtn px-3 me-5">Source</a>
      <a
       onclick="openDetailsModel(${favs[i].choosenItem.recipe_id})"  
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
  document.getElementById("favModelBody").innerHTML = recipe;
}
// search
favsearch.onkeyup = function () {
  let text = favsearch.value;
  let recipe = "";
  for (let i = 0; i < favs.length; i++) {
    if (favs[i].choosenItem.title.toLowerCase().includes(text.toLowerCase())) {
      recipe += `
      <div id=product-id-${favs[i].choosenItem.recipe_id} class="col-md-3">
      <div class="card position-relative">
      <div class="d-flex justify-content-center">
      <i onClick="deleteFavItem(${i})"
    class="fa fa-duotone fa-circle-xmark" style="--fa-primary-color: #ffffff; --fa-secondary-color: #33b572;"></i>
      <i id="addTocartBtn" onclick="addToCart(${favs[i].choosenItem.recipe_id})"
       class="fa fa-light fa-cart-shopping shoppingCart position-absolute"></i>
    
      <img src="
        ${favs[i].choosenItem.image_url}"
       class="card-img-top  rounded rounded-5" alt="dish">
      </div>
      <div class="card-body pt-4">
      <div class="d-flex justify-content-between">
      <h5 class="card-title ">${favs[i].choosenItem.title}</h5>
      <div class="d-flex">
      <ul class="fa-ul">
      <li class="cartPrice">
      ${favs[i].choosenItem.social_rank.toFixed(1)}$
     </li>
    </ul>
  
      </div>
      </div>  
        <div class="d-flex justify-content-between btnsDiv">
        <a href="${favs[i].choosenItem.source_url}" 
        target="_blank"
         class="btn sourceBtn px-3 me-5">Source</a>
        <a
         onclick="openDetailsModel(${favs[i].choosenItem.recipe_id})"  
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
    document.getElementById("favModelBody").innerHTML = recipe;
  }
};
// deleteItem
const deleteFavItem = (itemId) => {
  favs.splice(itemId, 1);
  display();
  localStorage.setItem("favItems", JSON.stringify(favs));
  favLength.innerHTML = favs.length;
};
// clearAll CArt
clearAllfavBtn.addEventListener("click", function () {
  favs.length = 0;
  display();
  localStorage.setItem("favItems", JSON.stringify(favs));
  favLength.innerHTML = favs.length;
});
