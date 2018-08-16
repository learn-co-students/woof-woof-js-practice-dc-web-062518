document.addEventListener("DOMContentLoaded", init);

function init() {
  allPups();
  let filterButton = document.getElementById("good-dog-filter");
  filterButton.addEventListener("click", filter);
}

function allPups() {
  fetch("http://localhost:3000/pups")
    .then(response => response.json())
    .then(json => {
      let allPups = json;
      for (dog of allPups) {
        showNames(dog);
      }
    });
}

function showNames(dog) {
  let dogSpan = document.createElement("span");
  dogSpan.addEventListener("click", showPup);
  let pupsBar = document.getElementById("dog-bar");
  pupsBar.appendChild(dogSpan);
  dogSpan.innerText = dog.name;
  dogSpan.id = `span-${dog.id}`;
}

function showPup(event) {
  event.preventDefault();
  let dogInfoDiv = document.getElementById("dog-info");
  dogInfoDiv.innerHTML = "";
  let id = event.target.id.split("-")[1];
  // debugger;

  fetch(`http://localhost:3000/pups/${id}`)
    .then(response => response.json())
    .then(json => {
      let dog = json;
      let name = dog.name;
      let isGoodDog = dog.isGoodDog;
      let image = dog.image;

      let imageElement = document.createElement("img");
      let h2Element = document.createElement("h2");
      let buttonElement = document.createElement("button");
      buttonElement.id = `button-${id}`;
      buttonElement.addEventListener("click", editDog);
      imageElement.src = image;
      h2Element.innerText = name;
      // debugger;
      if (isGoodDog === true) {
        buttonElement.innerText = "Good Dog!";
      } else {
        buttonElement.innerText = "Bad Dog!";
      }
      dogInfoDiv.appendChild(imageElement);
      dogInfoDiv.appendChild(h2Element);
      dogInfoDiv.appendChild(buttonElement);
      // editDog(id, buttonElement, isGoodDog);
    });
}

function editDog(event, dog) {
  let id = event.target.id.split("-")[1];
  let buttonInnerText = event.target.parentElement.querySelector("button")
    .innerText;

  let isGoodDog;
  if (buttonInnerText === "Good Dog!") {
    isGoodDog = false;
  } else {
    buttonInnerText === "Bad Dog!";
    isGoodDog = true;
  }

  fetch(`http://localhost:3000/pups/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      isGoodDog: isGoodDog
    })
  })
    .then(response => response.json())
    .then(json => {
      if (isGoodDog === true) {
        event.target.parentElement.querySelector("button").innerText =
          "Good Dog!";
      } else {
        isGoodDog === false;
        event.target.parentElement.querySelector("button").innerText =
          "Bad Dog!";
      }
    });
}

function filter(event) {
  event.preventDefault();
  let dogBar = document.getElementById("dog-bar");
  let dogSpan = document.createElement("span");
  let pupsBar = document.getElementById("dog-bar");
  dogBar.innerHTML = "";
  // debugger;
  if (event.target.innerText === "Filter good dogs: OFF") {
    event.target.innerText = "Filter good dogs: ON";
  } else {
    event.target.innerText === "Filter good dogs: ON";
    event.target.innerText = "Filter good dogs: OFF";
    allPups();
    return;
  }

  fetch("http://localhost:3000/pups")
    .then(response => response.json())
    .then(json => {
      let arr = [];
      let allPups = json;
      for (pup of allPups) {
        if (pup.isGoodDog === true) {
          showNames(pup);
        }
      }
    });
}
