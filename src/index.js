document.addEventListener("DOMContentLoaded", init)


function init() {
getFetch()
let dogFilter = document.getElementById('good-dog-filter')
dogFilter.addEventListener('click', toggle)

}

function getFetch(){
  fetch(`http://localhost:3000/pups`)
  .then(response => response.json())
  .then(json => {
    for(const dog of json) {
      render(dog)
    }
  })
}

function render(dog) {
  let dogBar = document.getElementById('dog-bar')
  let dogSpan = document.createElement('span')

  dogBar.appendChild(dogSpan)

  dogSpan.id = dog.id
  dogSpan.innerText = dog.name
  dogSpan.addEventListener('click', moreInfo)
}

function moreInfo(event) {
  event.preventDefault()
  let dogProfile = document.getElementById('dog-info')
  dogProfile.innerText = ""
  let img = document.createElement('img')
  let h2 = document.createElement('h2')
  let goodDog = document.createElement('button')
  let id = event.target.id

  dogProfile.appendChild(img)
  dogProfile.appendChild(h2)
  dogProfile.appendChild(goodDog)
  goodDog.id = `button-${id}`
  goodDog.addEventListener('click', changeStatus)

  fetch(`http://localhost:3000/pups/${id}`)
  .then(response => response.json())
  .then(json => {
    img.src = json.image
    h2.innerText = json.name
    goodDog.innerText = "Good Dog!"
  })
}

function changeStatus(event) {
  let status = event.currentTarget.innerText
  if(status === "Good Dog!") {
    event.currentTarget.innerText = "Bad Dog!"
  } else {
    event.currentTarget.innerText = "Good Dog!"
  }
  patchFetch(event)
}

function patchFetch(event) {
   let id = event.currentTarget.id.split("-")[1]
   let status = event.currentTarget.parentNode.querySelector('button').innerText
   let boolean
   if( status === "Bad Dog!"){
     boolean = false
   } else {
     boolean = true
   }
   fetch(`http://localhost:3000/pups/${id}`, {
     method: "PATCH",
     headers: {"Content-Type": "application/json"},
     body: JSON.stringify ({
     isGoodDog: boolean
    })
  }).then(response => response.json())
  .then(json => console.log(json))
}

function filterDog(event) {
  let buttonText = document.getElementById('good-dog-filter').innerText
  if(buttonText === "Filter good dogs: ON") {
    fetch(`http://localhost:3000/pups`)
    .then(response => response.json())
    .then(json => {
      document.getElementById('dog-bar').innerText = ""
      json.forEach(dog => {if(dog.isGoodDog) {
        render(dog)}
      })
    })
  } else {
    document.getElementById('dog-bar').innerText = ""
    getFetch()}
}

function toggle(event) {
  let buttonText = document.getElementById('good-dog-filter').innerText
  if(buttonText === "Filter good dogs: OFF") {
      document.getElementById('good-dog-filter').innerText = "Filter good dogs: ON"
  } else {
    document.getElementById('good-dog-filter').innerText = "Filter good dogs: OFF"
  }
  filterDog(event)
}

function checkStatus() {

}
