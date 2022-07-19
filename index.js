let mySaves = []

const jokeBtn = document.getElementById('jokeBtn')
const saveBtn = document.getElementById('saveBtn')
const delBtn = document.getElementById('delBtn')
const jokeText = document.querySelector('.container .joke')
const ulEl = document.getElementById("ul-el")

document.addEventListener('DOMContentLoaded', getJoke())

// Fetching API __________________ method 1 -- with >> async & await :: longhand

// async function getJoke() {
//     const jokeData = await fetch('https://icanhazdadjoke.com/', {
//         headers: {
//             'Accept': 'application/json'
//         }
//     });
//     const jokeObj = await jokeData.json();
//     console.log(jokeObj.joke)
//     jokeText.innerHTML = jokeObj.joke
// }

// Fetching API __________________ method 2 -- without >> async & await :: shorthand

function getJoke() {
    fetch('https://icanhazdadjoke.com/', {
        headers: {
            'Accept': 'application/json'
        }
    })
        .then(data => data.json())
        .then(obj => jokeText.innerHTML = obj.joke)
}

// Local Storage _______________________

let savesFromLocalStorage = JSON.parse( localStorage.getItem("mySaves") )

if (savesFromLocalStorage) {
    mySaves = savesFromLocalStorage
    render(mySaves)
}

// Rendering Function ___________________

function render(saves) {
    let listItems = ""

    for (let i = 0; i < saves.length; i++) {

        listItems += `
        <li>
            ${saves[i]}
        </li>
        `

        // listItems = document.createElement("li")
        // listItems.textContent = mySaves[i]
        // ulEl.append(listItems)
    }

    ulEl.innerHTML = listItems
}

// Button Events ________________________

jokeBtn.addEventListener("click", getJoke)

saveBtn.addEventListener("click", function () {
    mySaves.push(jokeText.innerHTML)
    localStorage.setItem("mySaves", JSON.stringify(mySaves))
    render(mySaves)
})

delBtn.addEventListener("click", function() {
    localStorage.clear()
    mySaves = []
    render(mySaves)
})

