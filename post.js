let getPostButton = document.querySelector(".getbutton");
let getPostNextBotton = document.querySelector(".nextBotton");
let getpreviousNextBotton = document.querySelector(".previousBotton");
let getTitlePost = document.querySelector(".titlePost");
let getTextPost = document.querySelector(".textPost");
let getIdPost = document.querySelector(".idPost");
let posts = document.querySelector(".posts");
const url = "https://jsonplaceholder.typicode.com/posts/";
const spinner = document.querySelector("#spinner");

getPostNextBotton.addEventListener("click", (type) => resultPost("next"));
getpreviousNextBotton.addEventListener("click", (type) =>
  resultPost("previous")
);

let num = 10;
function resultPost(type) {
  if (type === "next") {
    num++;
  }
  if (type === "previous") {
    num--;
  }

  spinner.removeAttribute("hidden");
  let urlNum = url + num;
  console.log(urlNum);

  fetch(urlNum)
    .then((response) => response.json())
    .then((json) => {
      spinner.setAttribute("hidden", "");
      getTitlePost.textContent = json.title;
      getTextPost.textContent = json.body;
      getIdPost.textContent = json.id;
    });
}
resultPost();

// getPostButton.addEventListener("click", (e) => resultPosts(e));

// function resultPosts(event) {
//   fetch(url)
//     .then((response) => response.json())
//     // .then((json) => {
//     // //   response = json;
//     // //   console.log(response);
//     //   console.log(json);
//     //   //console.log(json[2])
//     // });

//     .then((json) => {
//       for (const post of json) {
//         // const listItem = document.createElement("li");

//         const createdPost = document.createElement("div");
//         const createdTitle = document.createElement("h1");
//         const createdText = document.createElement("h2");
//         const deleteButtonPost = document.createElement("button");

//         deleteButtonPost.className = "button buttonDel";
//         deleteButtonPost.textContent = "Delete";

//         deleteButtonPost.id = post.id;
//         createdPost.id = `post-${post.id}`;
//         createdPost.appendChild(createdTitle).textContent = post.title;
//         createdPost.appendChild(createdText).textContent = post.body;
//         createdPost.appendChild(deleteButtonPost);

//         deleteButtonPost.addEventListener("click", deleteRow);

//         posts.appendChild(createdPost);
//       }
//     });
// }

// function deleteRow(e) {
//   console.log("delete");
//   const postToDelete = document.querySelector(`#post-${e.target.id}`);
//   //  const postToDelete = document.querySelector(`#post-${post.id}`);
//   console.log("messageToDelete", postToDelete);
//   posts.removeChild(postToDelete);
// }

// let getPostButton = document.querySelector("button");

// getPostButton.addEventListener("click", (e) => resultPosts(e));

// function resultPosts(event) {
//     console.log("event", event);

//     const createdPost = document.createElement("div");
//     const createdTitle = document.createElement("h1");
//     const createdText = document.createElement("h2");
// }
