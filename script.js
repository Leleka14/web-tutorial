 
const myDefaultId = document.getElementById('defaultId')
console.log(myDefaultId)
// myDefaultId.innerHTML = 'Hello Javascript!'


const myFunction = ()=>{
    const message = prompt('Hello World!')

    const createdDiv = document.createElement('div')
    createdDiv.textContent = message
    myDefaultId.appendChild(createdDiv)
    
    // if(myDefaultId.textContent === 'Hello World!' )
        // myDefaultId.textContent = message
    // else myDefaultId.textContent = message

}

