let addToy = false;

document.addEventListener("DOMContentLoaded", () => {

  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

fetch("http://localhost:3000/toys")
.then(r => r.json())
.then(data => {

// create a new toy card function
  function newToyCard(name, image) {
    const newToyDiv = document.createElement("div")
    document.querySelector("#toy-collection").append(newToyDiv)
    newToyDiv.className = "card"

    const toyName = document.createElement("h2")
    const toyImage = document.createElement("img")
    const toyLikes = document.createElement("p")

    toyName.textContent = name
    toyImage.src = image
    toyLikes.textContent = newToy.likes + " likes"

    newToyDiv.append(toyName)
    newToyDiv.append(toyImage)
    newToyDiv.append(toyLikes)

    toyImage.className = "toy-avatar"

    const toyButton = document.createElement("button")
    newToyDiv.append(toyButton)
    toyButton.className = "like-btn"
    toyButton.id = `${newToy.id}`
    toyButton.textContent = "Like"
  
  }

  // for each existing element, create a toy card 
  data.forEach((toy) => {
    newToy = toy
    newToyName = newToy.name
    newToyImage = newToy.image

    newToyCard(newToyName, newToyImage)

}) 

//event listener for clicking "create new toy - frontend and backend"
const form = document.querySelector(".add-toy-form")

form.addEventListener("submit", (e) => {
  e.preventDefault()

  const toyName = e.target.name.value
  const toyImage = e.target.image.value

  newToyCard(toyName, toyImage)


  fetch('http://localhost:3000/toys', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      "name": `${toyName}`,
      "image": `${toyImage}`,
      "likes": 0
       })

      })


})

//event listener for clicking like button - front end and back end. Lots of extra work to get "likes" on frontend
const buttons = document.querySelectorAll(".like-btn")

buttons.forEach((button) => {

  button.addEventListener("click", (e) => {
    e.preventDefault()

    const mainDiv = button.parentElement
    const currentLikes = mainDiv.querySelector("p").textContent

    const newLikes = parseInt(currentLikes.slice(0,1)) + 1
    
    mainDiv.querySelector("p").textContent = newLikes + " likes"

  
    const buttonId = e.target.id 

    fetch(`http://localhost:3000/toys/${buttonId}`, {
    method: "PATCH", 
    headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify ({
    "likes": newLikes

  })
})

        })

})


})})
