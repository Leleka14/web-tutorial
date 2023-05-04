let messages = document.querySelector(".messages");
let addButton = document.querySelector("button");

addButton.addEventListener("click", (e) => resultMessages(e));

let data = localStorage.getItem("msgList");
let dataDel = localStorage.getItem("msgDeleteList");
let msgList = [];
let msgDeleteList = [];

if (data !== "" && data !== null) {
  msgList = JSON.parse(data);
}

if (dataDel !== "" && dataDel !== null) {
  msgDeleteList = JSON.parse(dataDel);
  console.log(msgDeleteList);
  for (const n of msgDeleteList) {
    deleteRow(n);
    
  }

}

function resultMessages(event) {
  let msg = document.querySelector("input").value;
  console.log("event", event);
  if (msg.length < 5) {
    alert("Повідомлення закоротке!");
  } else {
    const msgObj = {
      msg: msg,
    };
    msgList.push(msgObj);
    console.log(msgList);
    createNewMsg(msgObj);
    localStorage.setItem("msgList", JSON.stringify(msgList));

  }
}

function createNewMsg(obj) {
  let oldMessages = document.querySelectorAll(".message");
  console.log("oldMessages", oldMessages);
  const createdMessage = document.createElement("div");

  const createdText = document.createElement("h2");
  const editButton = document.createElement("button");
  const deleteButton = document.createElement("button");
  const lengthOldMessages = oldMessages.length + 1;

  editButton.className = "button";
  deleteButton.className = "button buttonDel";

  createdText.textContent = obj.msg; // = resultInput.value
  editButton.textContent = "Edit";
  deleteButton.textContent = "Delete";

  deleteButton.id = lengthOldMessages;
  editButton.id = lengthOldMessages;

  createdMessage.className = "message"; //додаємо клас 'massage'
  createdMessage.id = `message-${lengthOldMessages}`; //додаємо 'id'

  createdText.className = "messageText";
  createdText.id = `messageText-${lengthOldMessages}`;

  createdMessage.appendChild(editButton);
  createdMessage.appendChild(deleteButton);
  createdMessage.appendChild(createdText);

  deleteButton.addEventListener("click", deleteRow);
  editButton.addEventListener("click", editRow);

  messages.appendChild(createdMessage);
}



for (const msg of msgList) {
  createNewMsg(msg);
  
}

function deleteRow(e) {
  //  (e)=>{
  let nomerEl = e.target.id;
  const messageToDelete = document.querySelector(`#message-${nomerEl}`);
  // console.log("messageToDelete", messageToDelete);
  console.log(nomerEl);

  let msgDel = {
    nomerEl: nomerEl,
  };
  msgDeleteList.push(msgDel);
  console.log(msgDeleteList);

  localStorage.setItem("msgDeleteList", JSON.stringify(msgDeleteList));

  // }
  messages.removeChild(messageToDelete);
}

function editRow(e) {
  const editMessage = prompt("Введіть зміни!");

  if (editMessage) {
    console.log(editMessage);
    const messageToEdit = document.querySelector(`#messageText-${e.target.id}`);
    messageToEdit.innerHTML = editMessage;
  }
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
