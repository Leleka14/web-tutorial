let messages = document.querySelector(".messages");
let addButton = document.querySelector("button");
let msg = document.querySelector("input");

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
      label: "",
    };

    msgList.push(msgObj);
    console.log("msgList", msgList);
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

  addLabel.textContent = obj.label;

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
  createdMessage.append(createdTextDiv, divButtons);

  deleteButton.addEventListener("click", deleteRow);
  editButton.addEventListener("click", editRow);
  threeDotsDiv.addEventListener("click", elementRow);

  // //Додайте обробник події до елементу <label>
  // addLabel.addEventListener("click", function() {
  //   addLabelFunc(addLabel.textContent);
  // });

  inputCheckbox.addEventListener("click", selectedRow);

  messages.appendChild(createdMessage);
}

let chosenElementId;

function elementRow(e) {
  const parenNode = e.target.closest(".message");
  console.log(parenNode);

  chosenElementId = parenNode.id;

  console.log("chosenElementId", chosenElementId);

  let attachButtonDiv = parenNode.querySelector("#openDialog");
  console.log(attachButtonDiv);

  attachButtonDiv.addEventListener("click", () => {
    openLabelModal();
  });
}

// const labelButtons = document.querySelectorAll(".buttonLabel");

// console.log("labelButtons", labelButtons)
// labelButtons.forEach((button) => {
//   button.addEventListener("click", addLabelToMessage);
// });

// function addLabelToMessage(event) {
//   const selectedMessage = document.getElementById(chosenElementId);
//   if (selectedMessage) {
//     const addLabel = selectedMessage.querySelector(".addLabel");
//     const labelText = event.target.textContent;

//     console.log("labelText", labelText)
//     addLabel.textContent += `${labelText}`;

//     const id = Number(selectedMessage.id);
//       const res = msgList.find((msg) => msg.id === id);
//       res.label = labelText;

//     saveToLocalStorage(); // Збереження змін у localStorage
//     closeLabelModal();
//   }
// }

function addLabelFunc(label) {
  const selectedMessage = document.getElementById(chosenElementId);

  console.log("selectedMessage", selectedMessage);

  const addLabel = selectedMessage.querySelector(".addLabel");

  addLabel.textContent = label;

  const id = Number(selectedMessage.id);
  const res = msgList.find((msg) => msg.id === id);
  res.label = label;

  saveToLocalStorage();
  closeLabelModal();
}

const buttonChores = document.querySelector("#choresButton");
const buttonShopping = document.querySelector("#shoppingButton");
const buttonWork = document.querySelector("#workButton");

buttonChores.addEventListener("click", (e) => {
  addLabelFunc("Chores");
});

buttonShopping.addEventListener("click", (e) => {
  addLabelFunc("Shopping");
});

buttonWork.addEventListener("click", (e) => {
  addLabelFunc("Work");
});

function openLabelModal() {
  const dialog = document.querySelector("dialog");
  dialog.showModal();
}

const closeButton = document.querySelector("#closeDialog");
closeButton.addEventListener("click", closeLabelModal);

function closeLabelModal() {
  const dialog = document.querySelector("dialog");
  dialog.close();
}

// function dialogCreateModal() {
//   const dialog = document.querySelector("dialog");
//   console.log("sdfsdfsdf");

//   const closeButton = document.querySelector("#closeDialog");

//   dialog.showModal();

//   closeButton.addEventListener("click", () => dialog.close());
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
