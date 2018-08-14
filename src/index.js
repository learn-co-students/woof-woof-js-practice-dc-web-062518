document.addEventListener("DOMContentLoaded", () => {
  fetchAll()
  document.querySelector('#good-dog-filter').addEventListener('click', filterGoodBad)
})

function fetchAll() {
  fetch('http://localhost:3000/pups')
    .then(res => res.json())
    .then(json => {
      json.forEach(element => {renderSpan(element)})
    })
}

function renderSpan(element) {
  let span = document.createElement('span')
  document.querySelector('#dog-bar').appendChild(span)
  span.id = `dog-${element.id}`
  span.innerText = element.name
  span.addEventListener('click', getDog)
}

function getDog(e) {
  let id = e.currentTarget.id.split("-")[1]
  fetch(`http://localhost:3000/pups/${id}`)
    .then(res => res.json())
    .then(json => {
      showDogInfo(json)
    })
}

function showDogInfo(obj) {
  // image, name, isGoodDog button
  let div = document.querySelector('#dog-info')
  let h2 = document.createElement('h2')
  let img = document.createElement('img')
  let button = document.createElement('button')

  div.innerHTML = ""

  div.dataId = obj.id
  h2.innerText = obj.name
  img.src = obj.image
  obj.isGoodDog ? button.innerText = "Good Dog!" : button.innerText = "Bad Dog!"
  button.addEventListener('click', toggleGoodBad)

  div.appendChild(img)
  div.appendChild(h2)
  div.appendChild(button)
}

function toggleGoodBad(e) {
  let filterText = document.querySelector('#good-dog-filter').innerText
  let button = e.currentTarget
  let id = button.parentNode.dataId
  let goodToBad
  button.innerText == "Good Dog!" ? goodToBad = false : goodToBad = true
  fetch(`http://localhost:3000/pups/${id}`, {
    method: "PATCH",
    headers: {"Content-Type": "application/json", "Accept": "application/json"},
    body: JSON.stringify({isGoodDog: goodToBad})
  })
    .then(res => res.json())
    .then(json => {
      if (json.isGoodDog) {
        button.innerText = "Good Dog!"
        if (filterText == "Filter good dogs: ON") {
          renderSpan(json)
        }
      } else {
        button.innerText = "Bad Dog!"
        if (filterText == "Filter good dogs: ON") {
          document.querySelector(`#dog-${id}`).remove()
        }
      }
    })
}

function filterGoodBad(e) {
  let filterButton = e.currentTarget
  if (filterButton.innerText === "Filter good dogs: OFF") {
    fetch('http://localhost:3000/pups')
      .then(res => res.json())
      .then(json => {
        document.querySelector('#dog-bar').innerHTML = ""
        filterButton.innerText = "Filter good dogs: ON"
        json.forEach(element => {
          if (element.isGoodDog) {
            renderSpan(element)
          }
        })
      })
  } else {
    document.querySelector('#dog-bar').innerHTML = ""
    fetchAll()
    filterButton.innerText = "Filter good dogs: OFF"
  }
}
