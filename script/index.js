const loadingCards = () => {
  fetch("https://openapi.programming-hero.com/api/plants")
    .then((res) => res.json())
    .then((res) => displayCards(res.plants));
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

const displayCards = (plants) => {
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = "";
  plants.forEach((plant) => {
    const cardDiv = document.createElement("div");
    cardDiv.innerHTML = `
        <div class="card bg-base-100 w-72 shadow-sm">
            <figure class="px-7 pt-7">
              <img
                src="${plant.image}"
                alt= "${plant.name}"
                class="rounded-xl"
              />
            </figure>
            <div class="card-body">
              <h2 onclick="loadPlantDetail(${plant.id})" class="card-title font-bold text-sm">${plant.name}</h2>
              <p class="text-sm">${plant.description}
              </p>
              <div class="flex justify-between space-x-23">
                <button class="btn btn-active rounded-full text-green-600 bg-green-100">${plant.category}</button>
                <p class="font-bold text-xl">${plant.price}</p>
              </div>
              <div class="card-actions">
                <button class="btn btn-block bg-[#15803D] text-white rounded-3xl">ADD TO CART</button>
              </div>
            </div>
          </div>
        `;
    cardContainer.append(cardDiv);
  });
};
loadingCards();
