const loadingCards = () => {
  fetch("https://openapi.programming-hero.com/api/plants")
    .then((res) => res.json())
    .then((res) => displayCards(res.plants));
};
const loadingCategories = () => {
  fetch("https://openapi.programming-hero.com/api/categories")
    .then((res) => res.json())
    .then((categories) => displayCategories(categories.categories));
};
const manageSpinner = (status)=>{
  if(status==true){
    document.getElementById("spinner").classList.remove("hidden")
    document.getElementById("card-container").classList.add("hidden")
  }else{
    document.getElementById("spinner").classList.add("hidden")
    document.getElementById("card-container").classList.remove("hidden")
  }
}
const displayCategories = (categories) => {
  const categoryContainer = document.getElementById("catagory-list");
  categoryContainer.innerHTML = "";
  categories.forEach((category) => {
    const categoryButton = document.createElement("div");
    categoryButton.innerHTML = `
          <button id="category-btn-${category.id}" onclick="loadPlants(${category.id})" class="btn btn-block rounded-xl category-btn">${category.category_name}</button>
      `;
    categoryContainer.append(categoryButton);
  });
};
const loadPlants = (id) => {
  manageSpinner(true);
  const url = `https://openapi.programming-hero.com/api/category/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((res) => {
      removeActive();
      const clickBtn = document.getElementById(`category-btn-${id}`);
      clickBtn.classList.add("active");
      displayCategoryPlant(res.plants);
    });
};
const removeActive = () => {
  const categoryButton = document.querySelectorAll(".category-btn");
  categoryButton.forEach(btn=> btn.classList.remove("active"));
};
const displayCategoryPlant = (plants) => {
  const newCardShow = document.getElementById("card-container");
  newCardShow.innerHTML = "";
  plants.forEach((plant) => {
    const categoryCard = document.createElement("div");
    categoryCard.innerHTML = `
      <div class="card bg-base-100 w-64 h-full shadow-sm">
            <figure class="px-5 py-5">
              <img
                src="${plant.image}"
                alt= "${plant.name}"
                class="rounded-lg h-40 w-full"
              />
            </figure>
            <div class="card-body flex flex-col">
              <h2 onclick="loadPlantDetail(${plant.id})" class="card-title font-bold text-sm">${plant.name}</h2>
              <p class="text-sm">${plant.description}
              </p>
              <div class="flex justify-between space-x-14">
                <button class="btn btn-active rounded-full text-green-600 bg-green-100">${plant.category}</button>
                <p class="font-bold text-xl">${plant.price}</p>
              </div>
              <div class="card-actions">
                <button onclick="addToCart('${plant.name}','${plant.price}')" class="btn btn-block bg-[#15803D] text-white rounded-3xl cart-btns">ADD TO CART</button>
              </div>
            </div>
          </div>
      `;
    newCardShow.append(categoryCard);
  });
  manageSpinner(false);
};

const loadPlantDetail = async (id) => {
  const url = `https://openapi.programming-hero.com/api/plant/${id}`;

  const res = await fetch(url);
  const details = await res.json();
  displayPlantDetails(details.plants);
};
const displayPlantDetails = (plant) => {
  console.log(plant);
  const detailBox = document.getElementById("details-container");
  detailBox.innerHTML = `
    <div>
                <div>
                <img class="w-[250px] h-[200px] rounded-2xl" src="${plant.image}" alt="${plant.name}">
                <h2 class="font-bold text-sm">${plant.name}</h2>
                <p class="text-sm">${plant.description}</p>
              </div>
              <div class="flex justify-between">
                <button class="btn btn-active rounded-full text-green-600 bg-green-100">${plant.category}</button>
                <p class="font-bold text-xl">${plant.price}</p>
              </div>
              </div>
    `;
  document.getElementById("plant_modal").showModal();
};
let cart = [];
let total = 0;
function addToCart(name, price) {
  price = Number(price);
  alert(`${name} is added to cart`);
  cart.push({ name, price });
  total += price;
  displayCart();
}
function displayCart() {
  const cartItems = document.getElementById("cart-item");
  const cartTotal = document.getElementById("cart-total");
  cartItems.innerHTML = "";
  cart.forEach((plant, index) => {
    const newCart = document.createElement("div");
    newCart.innerHTML = `
    <div class="flex justify-between">
            <div class="">
              <h1 class="font-bold text-sm">${plant.name}</h1>
              <p>৳<span>${plant.price}</span></p>
            </div>
            <button onclick ="removeCart(${index})" class="px-2 font-bold">❌</button>
          </div>
    `;

    cartItems.append(newCart);
  });
  cartTotal.textContent = `৳${total}`;
}
function removeCart(index) {
  total -= cart[index].price;
  cart.splice(index, 1);
  displayCart();
}
const displayCards = (plants) => {
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = "";
  plants.forEach((plant) => {
    const cardDiv = document.createElement("div");
    cardDiv.innerHTML = `
        <div class="card bg-base-100 w-64 h-full shadow-sm">
            <figure class="px-5 py-5">
              <img
                src="${plant.image}"
                alt= "${plant.name}"
                class="rounded-lg h-40 w-full"
              />
            </figure>
            <div class="card-body flex flex-col">
              <h2 onclick="loadPlantDetail(${plant.id})" class="card-title font-bold text-sm">${plant.name}</h2>
              <p class="text-sm">${plant.description}
              </p>
              <div class="flex justify-between space-x-14">
                <button class="btn btn-active rounded-full text-green-600 bg-green-100">${plant.category}</button>
                <p class="font-bold text-xl">${plant.price}</p>
              </div>
              <div class="card-actions">
                <button onclick="addToCart('${plant.name}','${plant.price}')" class="btn btn-block bg-[#15803D] text-white rounded-3xl cart-btns">ADD TO CART</button>
              </div>
            </div>
          </div>
        `;
    cardContainer.append(cardDiv);
  });
};
loadingCards();
loadingCategories();
