let getPostButton = document.querySelector(".getbutton");
let getTitlePost = document.querySelector(".titlePost");
let getTextPost = document.querySelector(".textPost");
let getIdPost = document.querySelector(".idPost");

let resultInput = document.querySelector("input");
const url = "https://jsonplaceholder.typicode.com/posts/";

getPostButton.addEventListener("click", (e) => resultPost(e));

function resultPost() {
  if (!/^[0-9]+$/.test(resultInput.value) || resultInput.value > 100) {
    alert(" Please enter a valid number! Number must be up to 100");
  }

  let urlNum = url + resultInput.value;

  fetch(urlNum)
    .then((response) => response.json())
    .then((json) => {
      getTitlePost.textContent = json.title;
      getTextPost.textContent = json.body;
      getIdPost.textContent = json.id;
    });
}
