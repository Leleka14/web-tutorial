let messages = document.querySelector(".messages");
let addButton = document.querySelector("button");
let msg = document.querySelector("input");
const dialog = document.querySelector("dialog");
const closeButton = document.querySelector("#closeDialog");

addButton.addEventListener("click", (e) => resultMessages(e));
closeButton.addEventListener("click", dialogCloseModal);

let data = localStorage.getItem("msgList");

let msgList = [];

if (data !== "" && data !== null) {
  msgList = JSON.parse(data);
}

function resultMessages(event) {
  console.log("event", event);
  if (msg.value.length < 5) {
    alert("Повідомлення закоротке!");
  } else {
    const msgObj = {
      id: Date.now(),
      text: msg.value,
      selected: false,
    };
    msgList.push(msgObj);
    console.log(msgList);
    createNewMsg(msgObj);
    saveToLocalStorage();
  }

  msg.value = "";
  msg.focus();
}

function createNewMsg(obj) {
  const cssClass = obj.selected
    ? "messageText message-text--selected"
    : "messageText";

  let oldMessages = document.querySelectorAll(".message");
  console.log("oldMessages", oldMessages);

  const createdMessage = document.createElement("div");
  const createdTextDiv = document.createElement("div");
  const createdText = document.createElement("h2");
  const dropdownDivConteiner = document.createElement("div");
  const threeDotsDiv = document.createElement("div");
  const dropdownDiv = document.createElement("div");

  dropdownDivConteiner.className = "dropdown-container";
  threeDotsDiv.className = "three-dots";
  dropdownDiv.className = "dropdown";
  createdTextDiv.className = "text-dots-div";
  dropdownDivConteiner.tabIndex = "-1";

  const editButton = document.createElement("button");
  const deleteButton = document.createElement("button");
  const attachButton = document.createElement("button");
  const editButtonDiv = document.createElement("div");
  const deleteButtonDiv = document.createElement("div");
  const attachButtonDiv = document.createElement("div");
  //const dialog = document.createElement("dialog");
  // const dialog = document.querySelector("dialog");

  attachButton.id = "openDialog";
  const inputCheckbox = document.createElement("input");
  const lengthOldMessages = oldMessages.length + 1;

  const divButtons = document.createElement("div");
  divButtons.className = "buttonsEditDelete";

  editButton.className = "buttonDropdown";
  deleteButton.className = "buttonDropdown";
  attachButton.className = "buttonDropdown";
  // dialog.className = "dialog"
  // dialog.id = "myDialog"
  inputCheckbox.classList.add("inputCheckbox");

  inputCheckbox.type = "checkbox";
  inputCheckbox.checked = obj.selected;

  createdText.textContent = obj.text; // = resultInput.value
  editButton.textContent = "Edit";
  deleteButton.textContent = "Delete";
  attachButton.textContent = "Attach Label";
  //dialog.textContent = obj.text;

  deleteButtonDiv.id = lengthOldMessages;
  editButtonDiv.id = lengthOldMessages;

  createdMessage.className = "message"; //додаємо клас 'massage'
  createdMessage.id = obj.id;

  createdText.className = `${cssClass}`;
  createdText.id = `messageText-${lengthOldMessages}`;

  //attachButtonDiv.append(dialog)
  editButtonDiv.append(editButton);
  deleteButtonDiv.append(deleteButton);
  attachButtonDiv.append(attachButton, dialog);
  //attachButtonDiv.append(attachButton)
  dropdownDiv.append(editButtonDiv, deleteButtonDiv, attachButtonDiv);
  dropdownDivConteiner.append(threeDotsDiv, dropdownDiv);
  createdTextDiv.append(createdText, dropdownDivConteiner);

  divButtons.append(inputCheckbox);
  createdMessage.append(createdTextDiv, divButtons);

  deleteButton.addEventListener("click", deleteRow);
  editButton.addEventListener("click", editRow);
  attachButton.addEventListener("click", dialogShowModal);

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
  console.log("parenNode", parenNode);

  const id = Number(parenNode.id);

  const res = msgList.find(function (msg) {
    if (msg.id === id) {
      return true;
    }
  });

  res.selected = !res.selected;
  console.log("res", res);

  console.log("msgList", msgList);

  msgList = msgList.sort((a, b) => b.selected - a.selected);

  console.log("msgList1", msgList);

  messages.replaceChildren();

  for (const text of msgList) {
    createNewMsg(text);
  }

  const msgCheckbox = parenNode.querySelector(".messageText");

  console.log("msgCheckbox", msgCheckbox);
  msgCheckbox.classList.toggle("message-text--selected");

  saveToLocalStorage();
}

function dialogShowModal(e) {
  dialog.showModal();
}

function dialogCloseModal(e) {
  dialog.close();
}

// function dialogShowModal(e) {
//   const parenNode = e.target.closest(".message");
//   console.log(parenNode);
//   const openDialog = parenNode.querySelector("dialog");
//   //let dialog = document.querySelector('dialog');

//   console.log(openDialog);
//   openDialog.showModal();
// }

function saveToLocalStorage() {
  localStorage.setItem("msgList", JSON.stringify(msgList));
}
