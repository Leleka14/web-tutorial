let getPostButton = document.querySelector("button");
let posts = document.querySelector(".posts");
const url = "https://jsonplaceholder.typicode.com/posts";

getPostButton.addEventListener("click", (e) => resultPosts(e));

function resultPosts(event) {
  fetch(url)
    .then((response) => response.json())
    // .then((json) => {
    // //   response = json;
    // //   console.log(response);
    //   console.log(json);
    //   //console.log(json[2])
    // });


    .then((json) => {
      for (const post of json) {
       // const listItem = document.createElement("li");

   const createdPost = document.createElement("div");
     const createdTitle = document.createElement("h1");
     const createdText = document.createElement("h2");


     createdPost.appendChild(createdTitle).textContent = post.title;
        createdPost.appendChild(createdText).textContent = post.body
        posts.appendChild(createdPost);
      }
    })

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
