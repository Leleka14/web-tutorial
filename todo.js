const addItemsForm = document.querySelector('.add-items-form')
const itemsList = document.querySelector('.items-list')
// let resultInput = document.querySelector("input");
// let addButton = document.querySelector("button");
const items=[]


function addItem(e) {
    e.preventDefault()
   const text = e.target.item.value;
    console.log(text)
    const item = {
        text: text,
    }
items.push(item)
displayItems(items, itemsList)

this.reset()
//console.log(items)
}

function displayItems (words, wordList) {
console.log(words, wordList)

 wordList.innerHTML = words.map((word, index) => {
    return `<li><button id=item${index} data-index='${index}' class = 'buttonDel'> Del</button>
    <button id=item${index} data-index='${index}' class = 'buttonEdit'> Edit</button>
    <label for='item${index}'>${word.text}</label>
    </li>`
}).join('');
}

function deleteRow(e) {
    //console.log("delete");
    const element = e.target.dataset.index;
    console.log(element);
    let removed = items.filter(function(f) { return f !== element });

    console.log(removed);
    
  }

  itemsList.addEventListener('click', deleteRow)

addItemsForm.addEventListener('submit', addItem)