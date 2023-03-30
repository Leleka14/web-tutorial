const myDefaultId = document.getElementById("defaultId");
//console.log(myDefaultId)
//myDefaultId.innerHTML = 'Hello Javascript!'

const myFunction = () => {
  const message = prompt("Введіть повідомлення!");
  console.log(message);
  if (message.length < 5) {
    alert("Повідомлення закоротке!");
  }
  if (message.length >= 5 && message.length <= 20) {
    const createdDiv = document.createElement("div");
    createdDiv.className = "color_red";
    createdDiv.textContent = message;
    myDefaultId.appendChild(createdDiv);
  }
  if (message.length > 20) {
    const createdDiv = document.createElement("div");
    createdDiv.className = "color_blue ";
    createdDiv.textContent = message;
    myDefaultId.appendChild(createdDiv);
  }

  // if(myDefaultId.textContent === 'Hello World!' )
  // myDefaultId.textContent = message
  // else myDefaultId.textContent = message
};
