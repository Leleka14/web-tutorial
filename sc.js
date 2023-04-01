let resultTitle = document.querySelector('h2');
let addButton = document.querySelector('button');
let resultInput = document.querySelector('input');


addButton.addEventListener('click', resultMessage)

function resultMessage(){
    if (resultInput.value.length<5){
        alert("Повідомлення закоротке!");
    } else {

        const createdDiv = document.createElement("div");
        createdDiv.textContent = resultInput.value;
        resultTitle.appendChild(createdDiv);

 
    }
}