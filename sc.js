let messages = document.querySelector('.messages');
let addButton = document.querySelector('button');
let resultInput = document.querySelector('input'); 
 

addButton.addEventListener('click', (e)=>resultMessage(e))

function resultMessage(event ){
    console.log('event', event)
    if (resultInput.value.length<5){
        alert("Повідомлення закоротке!");
    } else {
        let oldMessages = document.querySelectorAll('.message');
        console.log('oldMessages',oldMessages)
        const createdMessage = document.createElement("div");

        const createdText = document.createElement("h2");
        const editButton = document.createElement('button')
        const deleteButton = document.createElement('button')

        createdText.textContent = resultInput.value
       // createdMessage.textContent = resultInput.value
        editButton.textContent = 'Edit'
        deleteButton.textContent = 'Delete'

        deleteButton.id = oldMessages.length + 1
        editButton.id = oldMessages.length + 1 

        createdMessage.className = 'message' //додаємо клас 'massage' 
        createdMessage.id = `message-${oldMessages.length + 1}`   //додаємо клас 'id'

        createdText.className = 'messageText'
        createdText.id = `messageText-${oldMessages.length + 1}`


        createdMessage.appendChild(editButton)
        createdMessage.appendChild(deleteButton)

        createdMessage.appendChild(createdText)

        deleteButton.addEventListener('click',deleteRow )
        editButton.addEventListener('click',editRow )

        messages.appendChild(createdMessage)
    }
}


 
  
 

function deleteRow(e) {
    console.log('delete')
  //  (e)=>{  
      const messageToDelete = document.querySelector(`#message-${e.target.id}`)
      console.log('messageToDelete', messageToDelete)
      messages.removeChild(messageToDelete)
    
 // }
}

function editRow(e){
  const editMessage = prompt("Введіть зміни!")
  console.log(editMessage)
 const messageToEdit = document.querySelector(`#messageText-${e.target.id}`)
 
 messageToEdit.innerHTML = editMessage
 // createdMessage.textContent = editMessage
}




















// createdMessage.textContent = resultInput.value
// createdMessage.id = `message-${oldMessages.length}`
// createdMessage.className = 'message'
// editButton.textContent = 'Edit'
// deleteButton.textContent = 'Delete'
// deleteButton.id = oldMessages.length

// deleteButton.className = 'delete'
// createdMessage.appendChild(editButton)
// createdMessage.appendChild(deleteButton)

// // deleteButton.addEventListener('click', function(){
// //     console.log(resultInput.value)
// // })

// // createdDiv.innerHTML = `<div>
// //   ${resultInput.value}
// //   <button>Edit</button>
// //   <button onclick="deleteRow()">Delete</button>
// // </div>`


// messages.appendChild(createdMessage);
// deleteButton.addEventListener('click', (e)=>{
//     const messageToDeleteId = e.target.id;
//     const messageToDelete = document.querySelector(`#message-${messageToDeleteId}`)
//     console.log(messageToDelete.childNodes[0].textContent)
//     // messages.removeChild(messageToDelete)
//     // messageToDelete
//     // messageToDelete.remove()

//  })
