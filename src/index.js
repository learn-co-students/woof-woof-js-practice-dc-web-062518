

document.addEventListener('DOMContentLoaded', () => {
  window.addEventListener('load', fetchDogs);
  let filterButton = document.querySelector("#good-dog-filter");
  filterButton.addEventListener('click', filterDogs);

})

function fetchDogs() {
 fetch('http://localhost:3000/pups')
  .then(response => response.json())
  .then(json => json.forEach(dog => {
    renderDog(dog)
  }))
}

function renderDog(dog) {
  let div = document.querySelector('#dog-bar');
  let span = document.createElement('span');
  span.innerText = dog.name;
  span.dataset.id = dog.id
  div.appendChild(span);

  span.addEventListener('click', renderDogInfo)
}

function renderDogInfo(event){
  let dogId = event.target.dataset.id;
  fetchDog(dogId);
}

function fetchDog(id){
  fetch (`http://localhost:3000/pups/${id}`)
    .then(response => response.json())
    .then(json => displayDogInfo(json))
}

function displayDogInfo(dog){
  let div = document.querySelector("#dog-info");
  let image = document.createElement('img');
  image.setAttribute("src", dog.image);
  let name = document.createElement('h2');
  name = dog.name
  let isGoodDog = dog.isGoodDog;
  let button = document.createElement('button');
  if (isGoodDog === true){
    button.innerText = "Good Dog!";
  } else if (isGoodDog === false) {
    button.innerText = "Bad Dog!";
  }
  button.setAttribute("data-id", dog.id);
  button.addEventListener('click', toggleButton);

  div.append(image);
  div.append(name);
  div.append(button);
}

function toggleButton(event) {
  event.preventDefault();
  let status;
  if (event.target.innerText === "Good Dog!") {
    event.target.innerText = "Bad Dog!";
    status = false;
  } else {
    event.target.innerText = "Good Dog!";
    status = true;
  }
  let id = event.target.getAttribute("data-id")
  patchDog(status, id);
}

function patchDog(status, id) {
  fetch (`http://localhost:3000/pups/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accepts": "application/json"
    },
    body: JSON.stringify({
      isGoodDog: status
    })
  })
}

function filterDogs(event){
  event.preventDefault();
  let dogBar = document.querySelector("#dog-info")
  dogBar.innerHTML = ""
  if (event.target.innerText === "Filter good dogs: ON") {
    event.target.innerText = "Filter good dogs: OFF"
    fetchDogs();
  } else {
    event.target.innerText = "Filter good dogs: ON"
    fetchGoodDogs();
  }
}

function fetchGoodDogs() {
  fetch('http://localhost:3000/pups')
   .then(response => response.json())
   .then(json => json.forEach(dog => {
     if (dog.isGoodDog === true) {
       renderDog(dog)
  
       displayDogInfo(dog);
     }
   }))
}
