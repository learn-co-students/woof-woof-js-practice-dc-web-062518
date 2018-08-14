let id = 0
document.addEventListener('DOMContentLoaded', ()=>{
  let filterBtn = document.querySelector('#good-dog-filter')
window.addEventListener('load', fetchDogs)
filterBtn.addEventListener('click', filter)
})

function fetchDogs(){
  fetch('http://localhost:3000/pups')
  .then(res => res.json())
  .then(json => {
    json.forEach((dog)=> renderDog(dog))
  })
}

function patchFetch(status){
  status==='Good Dog!' ? status = true : status = false
  fetch(`http://localhost:3000/pups/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Accepts: 'application/json'
    },
    body: JSON.stringify({
      isGoodDog: status
    })
  })
}

function fetchFilter() {
  fetch('http://localhost:3000/pups')
  .then(res => res.json())
  .then(json => {
    json.forEach((dog)=>{
      if (dog.isGoodDog){
        renderDog(dog)
      }
    })
  })
}

function renderDog(dog){
  let barDiv = document.querySelector('#dog-bar')
  let span = document.createElement('span')
  span.addEventListener('click', getDog)
  span.id = `dog-${dog.id}`
  span.image = dog.image
  span.status = dog.isGoodDog
  span.innerText = dog.name
  barDiv.appendChild(span)
}

function getDog(e){
  id = e.currentTarget.id.split('-')[1]
  fetch(`http://localhost:3000/pups/${id}`)
  .then(res => res.json())
  .then(json => {showDog(json)})
}

function showDog(dog){
  let dogDiv = document.querySelector('#dog-info')
  dogDiv.innerHTML = ""
  let img = document.createElement('img')
  let h2 = document.createElement('h2')
  let btn = document.createElement('button')
  btn.addEventListener('click', toggleDog)
  img.src = dog.image
  h2.innerText = dog.name
  dog.isGoodDog===true ? btn.innerText = 'Good Dog!' : btn.innerText = 'Bad Dog!'
  dogDiv.appendChild(img)
  dogDiv.appendChild(h2)
  dogDiv.appendChild(btn)
}

function toggleDog(e){
  let status = e.currentTarget.parentNode.querySelector('button')
  status.innerText==="Good Dog!" ? status.innerText="Bad Dog!" : status.innerText="Good Dog!"
  patchFetch(status.innerText)
}

function filter(){
  let filterBtn = document.querySelector('#good-dog-filter')
  let div = document.querySelector('#dog-bar')
  div.innerHTML = ""
  if(filterBtn.innerText === 'Filter good dogs: OFF'){
    filterBtn.innerText = 'Filter good dogs: ON'
    fetchFilter()
  }
  else{
    filterBtn.innerText = 'Filter good dogs: OFF'
    fetchDogs()
  }

}
