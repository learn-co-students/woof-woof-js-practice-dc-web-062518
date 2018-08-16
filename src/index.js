function createDogBar() {
  return document.querySelector('#dog-bar')
}
function createDogInfoDiv() {
  return document.querySelector('#dog-info')
}
let obj ={}
let filterStatus = false;

document.addEventListener('DOMContentLoaded',()=>{
  createDogs();

  filterButton = filterButtonCreater()

})

function filterButtonCreater() {
  let button = document.querySelector('#good-dog-filter')

  button.addEventListener('click', ()=>{
    filterStatus = !filterStatus

    filterGoodDogs(filterStatus)
    if(filterStatus){
      button.innerHTML = "Filter good dogs: ON"
    }else{
      button.innerHTML = 'Filter good dogs: OFF '
    }
  })
  return button;
}

function filterGoodDogs(status) {
  dogBar = createDogBar();
  dogBar.innerHTML = ""
  fetch(`http://localhost:3000/pups`)
  .then(res => res.json())
  .then(json=> {
    json.forEach(dog=>{
      if(filterStatus){

        if(dog.isGoodDog){
        renderDogSpan(dog)
        }
      }else{
        renderDogSpan(dog)
      }
    })
  })
}

function createDogObject(obj) {
  fetch(`http://localhost:3000/pups`)
  .then(res=>res.json())
  .then(json=>{
    json.forEach(dog=>{

      obj[dog.id] = dog.isGoodDog
    })
  })
}
createDogObject(obj);
function createDogs() {
  fetch(`http://localhost:3000/pups`)
  .then(res=>res.json())
  .then(json=> createDogElements(json))
}

function createDogElements(json) {
  json.forEach(dog=>{renderDogSpan(dog)
  })
}

function renderDogSpan(dog){
  let dogBar = createDogBar()
  let span = document.createElement('span')

  span.innerHTML = dog.name
  span.id = `dog-${dog.id}`
  span.addEventListener('click', ()=>{
    let div = createDogInfoDiv();
    renderDogPage(dog,div)
  })

  dogBar.append(span)
}

function renderDogPage(dog, div) {
  div.innerHTML=""
  let img = document.createElement('img')
  let h2 = document.createElement('h2')
  let button = createGoodBoyButton(dog)
  let dogBool = dog.isGoodDog
   dogBool ? button.innerHTML = 'Good Dog' : button.innerHTML = 'Bad Dog'
  img.src = dog.image
  h2.innerHTML = dog.name


  div.appendChild(img)
  div.appendChild(h2)
  div.appendChild(button)
}

function createGoodBoyButton(dog) {
  button = document.createElement('button')
  button.addEventListener('click',()=>{
    changeBehaviorStatus(dog.id, button)
  })
  return button;
}

function changeBehaviorStatus(id,button) {
    obj[id] = !obj[id]


  fetch(`http://localhost:3000/pups/${id}`,{
    method: 'PATCH',
    headers:{
      "Content-Type": "application/json"
    },
    "body":JSON.stringify({
      isGoodDog: obj[id]
    })
  })
  .then(res=> res.json())
  .then(json=>{
    json.isGoodDog ? button.innerHTML = 'Good Dog' : button.innerHTML = 'Bad Dog'
  })

}
