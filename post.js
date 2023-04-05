let getPostButton = document.querySelector(".getbutton");
let getPostNextBotton = document.querySelector(".nextBotton");
let getpreviousNextBotton = document.querySelector(".previousBotton");
let posts = document.querySelector(".posts");
const url = "https://jsonplaceholder.typicode.com/posts/";

getPostNextBotton.addEventListener("click", (e) => resultPostNext(e));
getpreviousNextBotton.addEventListener("click", (e) => resultPostPrevious(e));

let num = 10;
function resultPostNext(event) {
  let urlNum = url + num;
  console.log(urlNum);

  fetch(urlNum)
    .then((response) => response.json())
    .then((json) => {
      const createdPost = document.createElement("div");
      const createdTitle = document.createElement("h1");
      const createdText = document.createElement("h2");

      createdPost.appendChild(createdTitle).textContent = json.title;
      createdPost.appendChild(createdText).textContent = json.body;

      posts.appendChild(createdPost);
    });
  num++;
}
resultPostNext();


function resultPostPrevious(event) {
  let urlNum = url + num;
  console.log(urlNum);

  fetch(urlNum)
    .then((response) => response.json())
    .then((json) => {
      const createdPost = document.createElement("div");
      const createdTitle = document.createElement("h1");
      const createdText = document.createElement("h2");

      createdPost.appendChild(createdTitle).textContent = json.title;
      createdPost.appendChild(createdText).textContent = json.body;

      posts.appendChild(createdPost);
    });
  num--;
}





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

function deleteRow(e) {
  console.log("delete");
  const postToDelete = document.querySelector(`#post-${e.target.id}`);
  //  const postToDelete = document.querySelector(`#post-${post.id}`);
  console.log("messageToDelete", postToDelete);
  posts.removeChild(postToDelete);
}

//.catch(error => console.log(error))

//   const getData = (url) =>
//   new Promise ((resolve, reject) =>
//     fetch(url)
//       .then(response => response.json())
//       .then(json => resolve(json))
//       .catch(error => reject(error))
//   )

// let getPostButton = document.querySelector("button");

// getPostButton.addEventListener("click", (e) => resultPosts(e));

// function resultPosts(event) {
//     console.log("event", event);

//     const createdPost = document.createElement("div");
//     const createdTitle = document.createElement("h1");
//     const createdText = document.createElement("h2");
// }

// const getData = async (url) => {
//     const res = await fetch(url)
//     const json = await res.json()
//     return json
// }
// try {
//   const date = await getData(url)
//   console.log(date)
// } catch (e) {
//   console.log(error.message)
// }
