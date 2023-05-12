let messages = document.querySelector(".messages");
let addButton = document.querySelector("button");

addButton.addEventListener("click", (e) => resultMessages(e));

let data = localStorage.getItem("msgList");

let msgList = [];

if (data !== "" && data !== null) {
  msgList = JSON.parse(data);
}

function resultMessages(event) {
  let msg = document.querySelector("input").value;
  console.log("event", event);
  if (msg.length < 5) {
    alert("Повідомлення закоротке!");
  } else {
    const msgObj = {
      id: Date.now(),
      text: msg,
      selected: false,
    };
    msgList.push(msgObj);
    console.log(msgList);
    saveToLocalStorage();
    createNewMsg(msgObj);
  }
}

function createNewMsg(obj) {
  const cssClass = obj.selected
    ? "messageText message-text--selected"
    : "messageText";

  let oldMessages = document.querySelectorAll(".message");
  console.log("oldMessages", oldMessages);
  const createdMessage = document.createElement("div");

  const createdText = document.createElement("h2");
  const editButton = document.createElement("button");
  const deleteButton = document.createElement("button");
  const inputCheckbox = document.createElement("input");
  const lengthOldMessages = oldMessages.length + 1;

  const divButtons = document.createElement("div");
  divButtons.className = "buttonsEditDelete";

  editButton.className = "button";
  deleteButton.className = "button buttonDel";
  inputCheckbox.classList.add("inputCheckbox");

  inputCheckbox.type = "checkbox";
  inputCheckbox.checked = obj.selected;

  createdText.textContent = obj.text; // = resultInput.value
  editButton.textContent = "Edit";
  deleteButton.textContent = "Delete";

  deleteButton.id = lengthOldMessages;
  editButton.id = lengthOldMessages;

  createdMessage.className = "message"; //додаємо клас 'massage'
  // createdMessage.id = `message-${lengthOldMessages}`; //додаємо 'id'
  // Або через функцію дата
  createdMessage.id = obj.id;

  //createdText.className = "messageText";

  createdText.className = `${cssClass}`;
  createdText.id = `messageText-${lengthOldMessages}`;

  createdMessage.appendChild(createdText);
  divButtons.append(editButton, deleteButton, inputCheckbox);
  createdMessage.append(divButtons);

  // createdMessage.appendChild();
  // createdMessage.appendChild();

  deleteButton.addEventListener("click", deleteRow);
  editButton.addEventListener("click", editRow);
  inputCheckbox.addEventListener("click", selectedRow);

  messages.appendChild(createdMessage);
}

for (const text of msgList) {
  createNewMsg(text);
}

function deleteRow(e) {
  const parenNode = e.target.closest(".message");
  console.log(parenNode);

  const id = Number(parenNode.id);
  console.log(id);
  msgList = msgList.filter((msg) => msg.id !== id);
  console.log(msgList);

  saveToLocalStorage();

  parenNode.remove();
}

function editRow(e) {
  const editMessage = prompt("Введіть зміни!");

  if (editMessage) {
    console.log(editMessage);
    const parenNode = e.target.closest(".message");

    const msgTitle = parenNode.querySelector(".messageText");
    console.log(parenNode);
    console.log(msgTitle);

    const id = Number(parenNode.id);
    console.log(id);

    const res = msgList.find(function (msg) {
      if (msg.id === id) {
        return (msg.text = editMessage);
      }
    });
    console.log(msgList);

    msgTitle.innerHTML = editMessage;
    saveToLocalStorage();
  }
}

function selectedRow(e) {
  const parenNode = e.target.closest(".message");
  console.log(parenNode)

  const id = Number(parenNode.id);

  // let res = msgList.forEach((msg) => {
  //   if (msg.id === id){
  //     if(msg.selected===false){
  //       msg.selected=true
  //     }
  //     else if(msg.selected===true){
  //       msg.selected=false
  //   }
  // }
  // })





  // const res = msgList.find(function (msg) {
  //   if (msg.id === id) {
  //    // return true;
  //    msg.selected = !m.selected;
  //   }
  // });

  const res = msgList.find(function (msg) {
    if (msg.id === id) {
     return true;
    }
  });

  res.selected = !res.selected;

  msgList = msgList.sort((a,b) => b.selected-a.selected)


  console.log("msgList",msgList);


  const msgCheckbox = parenNode.querySelector(".messageText");

  console.log(msgCheckbox);
  msgCheckbox.classList.toggle("message-text--selected");

  saveToLocalStorage();
}

function saveToLocalStorage() {
  localStorage.setItem("msgList", JSON.stringify(msgList));
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
