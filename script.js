const myDefaultId = document.getElementById("defaultId");
//console.log(myDefaultId)
//myDefaultId.innerHTML = 'Hello Javascript!'

const myFunction = () => {
  const message = prompt("Введіть повідомлення!");
  console.log(message);
  if (message.length < 5) {
    prompt("Повідомлення закоротке!");
  }
  if (message.length >= 5 && message.length <= 20) {
    const createdDiv = document.createElement("div");
    createdDiv.textContent = message;
    myDefaultId.appendChild(createdDiv);
    
  }
  if (message.length > 20) {
    const createdDiv = document.createElement("div");
    createdDiv.textContent = message;
    myDefaultId.appendChild(createdDiv);
  }

  // if(myDefaultId.textContent === 'Hello World!' )
  // myDefaultId.textContent = message
  // else myDefaultId.textContent = message
};
