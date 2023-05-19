let messages = document.querySelector(".messages");
let addButton = document.querySelector("button");
let msg = document.querySelector("input");
const dialog = document.querySelector("dialog");
//const closeButton = document.querySelector("#closeDialog");

// const addLabel = document.querySelector(".addLabel");
// console.log('addLabel', addLabel)

addButton.addEventListener("click", (e) => resultMessages(e));
//closeButton.addEventListener("click", dialogCloseModal);

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
 // const dialog = document.querySelector("dialog");
  const createdMessage = document.createElement("div");
  const createdTextDiv = document.createElement("div");
  const createdText = document.createElement("h2");
  const dropdownDivConteiner = document.createElement("div");
  const threeDotsDiv = document.createElement("div");
  const dropdownDiv = document.createElement("div");

  const addLabelDiv = document.createElement("div");
  const addLabel = document.createElement("h4");

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

  attachButton.id = "openDialog";
  const inputCheckbox = document.createElement("input");
  const lengthOldMessages = oldMessages.length + 1;

  const divButtons = document.createElement("div");
  divButtons.className = "buttonsEditDelete";

  editButton.className = "buttonDropdown";
  deleteButton.className = "buttonDropdown";
  attachButton.className = "buttonDropdown";
  addLabelDiv.className = "addLabel";

  inputCheckbox.classList.add("inputCheckbox");

  inputCheckbox.type = "checkbox";
  inputCheckbox.checked = obj.selected;

  createdText.textContent = obj.text; // = resultInput.value
  editButton.textContent = "Edit";
  deleteButton.textContent = "Delete";
  attachButton.textContent = "Attach Label";

  deleteButtonDiv.id = lengthOldMessages;
  editButtonDiv.id = lengthOldMessages;

  createdMessage.className = "message"; //додаємо клас 'massage'
  createdMessage.id = obj.id;

  createdText.className = `${cssClass}`;
  createdText.id = `messageText-${lengthOldMessages}`;

  addLabelDiv.append(addLabel);
  editButtonDiv.append(editButton);
  deleteButtonDiv.append(deleteButton);
  attachButtonDiv.append(attachButton);

  dropdownDiv.append(editButtonDiv, deleteButtonDiv, attachButtonDiv);
  dropdownDivConteiner.append(threeDotsDiv, dropdownDiv);
  createdTextDiv.append(createdText, addLabelDiv, dropdownDivConteiner);

  divButtons.append(inputCheckbox);
  createdMessage.append(createdTextDiv, divButtons, dialog);

  deleteButton.addEventListener("click", deleteRow);
  editButton.addEventListener("click", editRow);
 // attachButton.addEventListener("click", dialogCreateModal);
 attachButtonDiv.addEventListener("click", (e) => {
    dialogCreateModal()
 });

  inputCheckbox.addEventListener("click", selectedRow);

  messages.appendChild(createdMessage);
}

function dialogCreateModal(e) {
    console.log('sdfsdfsdf')

    const buttonChores = document.querySelector("#choresButton")
    const buttonShopping = document.querySelector("#shoppingButton")
    const buttonWork = document.querySelector("#workButton")
    const closeButton = document.querySelector("#closeDialog");

   dialog.showModal();


   buttonChores.addEventListener("click", addChores);


   closeButton.addEventListener("click", () => dialog.close());

}

// const buttonChores = document.querySelector(".buttonChores");
// buttonChores.addEventListener("click", addTask);

function addChores(e) {
    let addLabelChores = document.querySelector(".addLabel")
    let labelChoresId = document.querySelector("#choresButton")
    addLabelChores.textContent = labelChoresId.textContent


  console.log(addLabelChores);
}



// function dialogCloseModal(e) {
//   dialog.close();
// }

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

function saveToLocalStorage() {
  localStorage.setItem("msgList", JSON.stringify(msgList));
}
