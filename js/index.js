let mainDIV = document.getElementById("monster-container")
let backButton = document.getElementById("back")
let forwardButton = document.getElementById("forward")
let page = 1
let createDiv = document.getElementById("create-monster")


pageLoad()


function pageLoad(){
    
  createDiv.innerHTML = `
  <form id="monster-form">
  <input id="name" placeholder="name...">
  <input id="age" placeholder="age...">
  <input id="description" placeholder="description...">
  <button>Create</button></form>`

    let form = document.getElementById("monster-form")
    form.addEventListener("submit", function (e){
        e.preventDefault()
        addMonster(e)
        form.reset() 
})

    fetch("http://localhost:3000/monsters?_limit=50&_page=1")
    .then(res => res.json())
    .then(objArr => objArr.forEach(objToHtml))
    console.log(page)
}

function objToHtml(obj){


let div = document.createElement("div")
div.innerHTML = `
<h2>${obj.name}</h2>
<h4>Age:  ${obj.age}</h4>
<p>Bio: ${obj.description} </p>

`
mainDIV.append(div)
}

forwardButton.addEventListener("click", function(e){
   page += 1
    mainDIV.innerHTML = ""
    
    console.log(page) 
    fetch(`http://localhost:3000/monsters?_limit=50&_page=${page}`)
    .then(res => res.json())
    .then(objArr => objArr.forEach(objToHtml))

   
})


backButton.addEventListener("click", function(e){
    
    if(page<=1 ){alert("aint no monsters here"); 
    
}
        else{
   
    mainDIV.innerHTML = ""
    page -= 1 
    console.log(page) 
    fetch(`http://localhost:3000/monsters?_limit=50&_page=${page}`)
    .then(res => res.json())
    .then(objArr => objArr.forEach(objToHtml))}
    
})

function addMonster(e){
    let name = e.target.name.value
    let age = parseInt(e.target.age.value)
    let description = e.target.description.value
    fetch("http://localhost:3000/monsters", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Acceot': 'application/json'
        },
        body: JSON.stringify(

            {name,
                age,
                description

            }
        )


    //end of fetch
    })

    
}