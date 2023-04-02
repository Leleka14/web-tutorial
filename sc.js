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
        const editButton = document.createElement('button')
        const deleteButton = document.createElement('button')
        createdMessage.textContent = resultInput.value
        editButton.textContent = 'Edit'
        deleteButton.textContent = 'Delete'
        deleteButton.id = oldMessages.length + 1
        editButton.id = oldMessages.length + 1 
        createdMessage.className = 'message'
        createdMessage.id = `message-${oldMessages.length + 1}`
        createdMessage.appendChild(editButton)
        createdMessage.appendChild(deleteButton)
        deleteButton.addEventListener('click', (e)=>{  
            const messageToDelete = document.querySelector(`#message-${e.target.id}`)
            console.log('messageToDelete', messageToDelete)
            messages.removeChild(messageToDelete)
        })
        messages.appendChild(createdMessage)
    }
}


 
  
 

function deleteRow() {
    console.log('delete')
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
