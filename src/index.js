let dogDisplay = document.getElementById("dog-info")

document.addEventListener('DOMContentLoaded', function(e){
  let filterButton = document.getElementById("good-dog-filter")
  filterButton.addEventListener('click', filterDogs)

  allDogs();
});

function filterDogs(e){
  e.preventDefault();
  let dogBar = document.getElementById("dog-bar")
  dogBar.innerHTML = ""
  let filterButton = document.getElementById("good-dog-filter")
  if (filterButton.innerText === "Filter good dogs: ON"){
    filterButton.innerText = "Filter good dogs: OFF"
    allDogs();
    return
  } else {filterButton.innerText = "Filter good dogs: ON"}

  fetch(`http://localhost:3000/pups`)
  .then(r => r.json())
    .then(json=> {
      json.forEach( dog => {
        if(dog.isGoodDog){
          render(dog)
        }
      })
    })


}






function render(dog){
  let dogBar = document.getElementById("dog-bar")
  let dogBox = document.createElement('span')
  dogBox.innerText = dog.name
  dogBox.id = `dog-${dog.id}`
  dogBar.appendChild(dogBox)
  dogBox.addEventListener('click', function displayDog(){

        let dogDisplay = document.getElementById("dog-info")
        let goodDog = document.createElement('button')
        goodDog.id = "dogSwitch"
        if (dog.isGoodDog){ goodDog.innerText = "Good Dog!"} else {goodDog.innerText = "Bad Dog!"}
        dogDisplay.innerHTML = `<img src= ${dog.image} > <h2 id= ${dog.id}>${dog.name}</h2>`
        dogDisplay.appendChild(goodDog)
        let goodBad = document.getElementById("dogSwitch")
        goodBad.addEventListener('click', switchStatus)
      });
};


// function someDogs(){
//   fetch(`http://localhost:3000/pups`)
//   .then(r => r.json())
//     .then(json=> {
//       json.forEach(dog => {
//         if (dog.isGoodDog === true){
//         render(dog)}
//         else {
//           render(dog)
//         };
//       })
//     })
// });



function switchStatus(e){
    e.preventDefault();
    let status = (document.getElementById("dogSwitch").innerText === "Good Dog!");
    status = !status;
    let id = e.currentTarget.parentNode.querySelector('h2').id
    fetch(`http://localhost:3000/pups/${id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        "accept": "application/json"
      },
      body: JSON.stringify({
        isGoodDog: status
      })
    }).then(r => r.json())
      .then(json=> {
        let buttonUpdated = document.getElementById("dogSwitch")
        if (json.isGoodDog){ buttonUpdated.innerText = "Good Dog!"} else {buttonUpdated.innerText = "Bad Dog!"}
      })
  };



function allDogs(){
  fetch(`http://localhost:3000/pups`)
  .then(r => r.json())
    .then(json=> {
      json.forEach(dog => {
        render(dog);
      })
    })
};
