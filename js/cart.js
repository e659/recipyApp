let cart;
const cartLength = document.querySelector(".cartLength");
const clearAllCarBtn = document.querySelector(".clearAllCarBtn");
const searchBtn = document.getElementById("search-text");

// update Cart After Refresh
if (localStorage.getItem("cartItems") == null) {
  cart = [];
} else {
  cart = JSON.parse(localStorage.getItem("cartItems"));
  displayCartProduct();
  cartLength.innerHTML = cart.reduce((a, b) => a + b.quantity, 0);
}

// addToCart
function addToCart(recipe_id) {
  let selectedItem = recipe_id;
  console.log(selectedItem);
  let choosenItem = recipes.recipes.find((item) => item.recipe_id == recipe_id);
  let itemIndex = cart.find((item) => item.id === selectedItem);
  console.log(itemIndex);
  if (itemIndex === undefined) {
    cart.push({
      id: selectedItem,
      choosenItem: choosenItem,
      quantity: 1,
    });
  } else {
    itemIndex.quantity += 1;
  }
  console.log("cart", cart);
  localStorage.setItem("cartItems", JSON.stringify(cart));
  displayCartProduct();
  cartLength.innerHTML = cart.reduce((a, b) => a + b.quantity, 0);
}
// displayProductInCart
function displayCartProduct() {
  let cartona = "";
  for (let i = 0; i < cart.length; i++) {
    cartona += `
    <div class="col-md-3 py-3" id=product-id-${cart[i].choosenItem.recipe_id}>
    <div>
    <img
    src="${cart[i].choosenItem.image_url}"
    class="w-75 rounded cartImg "
    alt=""
   
  />
    </div>
                      
                      </div>
                      <div class="col-md-9">
                      <div class="row">
                      <div class="col-md-4">
                      <div class="d-flex"> <p class="cartTitle mt-4 fs-5">"${cart[i].choosenItem.title}"</p>
                      <span class="qty mt-4  ms-4 fs-5">(x${cart[i].quantity})</span>
                      </div>
                     
                      </div>

                      <div class="col-4 d-flex align-items-center justify-content-end ">
      <div class="d-flex align-items-center ">
     
      <i onClick="increase(${cart[i].choosenItem.recipe_id})" class="fas fa-plus-circle increase mb-3"></i>
      <span class="qty mx-2 mb-3">${cart[i].quantity}</span>
      <i onClick="decrease(${cart[i].choosenItem.recipe_id})" class="fas fa-minus-circle decrease mb-3"></i>
      
      </div>
      
      </div>
      <div class="col-4 d-flex align-items-center justify-content-around">
      <i onClick="deleteItem(${i})"  class="fas fa-minus-circle text-danger deleteCartRowBtn mb-3"></i>
      </div>
                      </div>
                      </div>
                      </div>
                      </div>
        `;
  }
  document.getElementById("cartModelBody").innerHTML = cartona;
}
// deleteItemFrom Cart
function deleteItem(index) {
  cart.splice(index, 1);
  displayCartProduct();
  localStorage.setItem("cartItems", JSON.stringify(cart));
  cartLength.innerHTML = cart.reduce((a, b) => a + b.quantity, 0);
}
// clearAll CArt
clearAllCarBtn.addEventListener("click", function () {
  cart.length = 0;
  displayCartProduct();
  localStorage.setItem("cartItems", JSON.stringify(cart));
  cartLength.innerHTML = cart.reduce((a, b) => a + b.quantity, 0);
});
// search in cart
searchBtn.onkeyup = function () {
  let text = searchBtn.value;
  let cartona = "";
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].choosenItem.title.toLowerCase().includes(text.toLowerCase())) {
      cartona += `
      <div class="col-md-3 py-3" id=product-id-${cart[i].choosenItem.recipe_id}>
      <img
        src="${cart[i].choosenItem.image_url}"
        class="w-75 rounded"
        alt=""
       
      />
    </div>
    <div class="col-md-9">
    <div class="row">
    <div class="col-md-4">
    <div class="d-flex"> <p class="mt-5 fs-5">"${cart[i].choosenItem.title}"</p>
    <span class="qty mt-4  ms-3 fs-5">(x${cart[i].quantity})</span>
    </div>
   
    </div>
    <div class="col-4 d-flex align-items-center justify-content-end ">
    <div class="d-flex align-items-center ">
   
    <i onClick="increase(${cart[i].choosenItem.recipe_id})" class="fas fa-plus-circle increase mb-3"></i>
    <span class="qty mx-2 mb-3">${cart[i].quantity}</span>
    <i onClick="decrease(${cart[i].choosenItem.recipe_id})" class="fas fa-minus-circle decrease mb-3"></i>
    
    </div>
    
    </div>
    <div class="col-md-4 d-flex align-items-center justify-content-around">
    <i onClick="deleteItem(${i})"  class="fas fa-minus-circle text-danger deleteCartRowBtn"></i>
    </div>
    </div>
    </div>
`;
    }

    document.getElementById("cartModelBody").innerHTML = cartona;
  }
};
// increase
function increase(recipe_id) {
  let selectedItem = recipe_id;
  console.log(selectedItem);
  let itemIndex = cart.find((item) => item.id === selectedItem);

  itemIndex.quantity += 1;
  displayCartProduct();
  localStorage.setItem("cartItems", JSON.stringify(cart));
  cartLength.innerHTML = cart.reduce((a, b) => a + b.quantity, 0);
}
//decrease
function decrease(recipe_id) {
  let selectedItem = recipe_id;
  // console.log(selectedItem);
  let itemIndex = cart.find((item) => item.id === selectedItem);
  let itemIndexx = cart.findIndex((item) => item.id === selectedItem);
  console.log(itemIndexx);
  if (itemIndex.quantity < 1) {
    deleteItem(itemIndexx);
  } else {
    itemIndex.quantity -= 1;
  }

  displayCartProduct();
  localStorage.setItem("cartItems", JSON.stringify(cart));
  cartLength.innerHTML = cart.reduce((a, b) => a + b.quantity, 0);
}
