document.addEventListener('DOMContentLoaded', function() {
  let filterButton = document.getElementById('good-dog-filter')
  filterButton.addEventListener('click', filterClickHandler)
  getFetch()
})

function renderDogBar(pup) {
  let dogBar = document.querySelector('#dog-bar')
  let span = document.createElement('span')
  span.id = `span-id-${pup.id}`

  let nameSpan = dogBar.appendChild(span)

  nameSpan.innerText = pup.name

  span.addEventListener('click', getDogInfo)
}

function getFetch(){
  fetch('http://localhost:3000/pups')
  .then(response => response.json())
  .then( json => {
    json.forEach( pup => {
      renderDogBar(pup)
    })
  })
}

function renderDogInfo(json){
  let dogInfo = document.querySelector('#dog-info')
  dogInfo.innerHTML = ""
  let image = document.createElement('img')
  let name = document.createElement('h2')
  let button = document.createElement('button')
  button.id = `button-${json.id}`

  let img = dogInfo.appendChild(image)
  let h2 = dogInfo.appendChild(name)
  let dogButton = dogInfo.appendChild(button)

  img.src = json.image
  h2.innerText = json.name

  if(json.isGoodDog === true) {
    button.innerText = 'Good Dog'
  } else {
    button.innerText = 'Bad Dog'
  }

  button.addEventListener('click', clickHandler)
}

function getDogInfo(event){
  let id = event.target.id.split("-")[2]
  // debugger
  fetch(`http://localhost:3000/pups/${id}`)
  .then(response => response.json())
  .then(json => {
      renderDogInfo(json)
    })
}

function clickHandler(event) {
  let id = event.target.id.split('-')[1]

  if (event.target.innerText === "Good Dog"){
    event.target.innerText = "Bad Dog"
  } else if (event.target.innerText === "Bad Dog")
    event.target.innerText = "Good Dog"

  // let status = event.target.innerText
  let status
  if (event.target.innerText === "Good Dog"){
    status = true
  } else if (event.target.innerText === "Bad Dog") {
    status = false
  }

// debugger
  patchFetch(id, status)
  }

function patchFetch(id, status){
  fetch(`http://localhost:3000/pups/${id}`, {
    method: "PATCH",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      isGoodDog: status
    })
  })
  .then(response => response.json())
  .then(json => {
    console.log(json)
  })
}

function renderFilterDogInfo(json){
  let dogInfo = document.querySelector('#dog-info')
  let image = document.createElement('img')
  let name = document.createElement('h2')
  let button = document.createElement('button')
  button.id = `button-${json.id}`

  let img = dogInfo.appendChild(image)
  let h2 = dogInfo.appendChild(name)
  let dogButton = dogInfo.appendChild(button)

  img.src = json.image
  h2.innerText = json.name

  if(json.isGoodDog === true) {
    button.innerText = 'Good Dog'
  } else {
    button.innerText = 'Bad Dog'
  }

  button.addEventListener('click', clickHandler)
}

function filterClickHandler(event){
  // console.log(event.target)
  if (event.target.innerText === "Filter good dogs: OFF"){
    event.target.innerText = "Filter good dogs: ON"
  } else if (event.target.innerText === "Filter good dogs: ON"){
    event.target.innerText = "Filter good dogs: OFF"
  }
  // debugger
  fetch('http://localhost:3000/pups')
  .then(response => response.json())
  .then(json => {
      if (event.target.innerText === "Filter good dogs: ON"){
        // console.log(json)
        json.forEach ( pup => {
          // console.log(pup.isGoodDog)
          if (pup.isGoodDog === true) {
            renderFilterDogInfo(pup)
          }
        })
      }
    })
}
