const containerDataApi = document.getElementById("container-data-api");
const testButton = document.querySelector(".test-button");
const testInput = document.querySelector("input");


let dataApiArray = []

testButton.addEventListener("click", () => {

    let input = document.querySelector(".test-search");
    let p = document.querySelector(".test-element");
    p.textContent = input.value;
});

fetch("https://restcountries.com/v3.1/all")
    .then((response) => {
        return response.json();
    }).then(data => {
        showData(data);
    })


    
function showData(countries) {
    for (let country = 0; country < countries.length; country++) {
        const div = document.createElement("div");
        div.classList.add("card");
        div.innerHTML = `<strong>${countries[country].continents}</strong>`;
        containerDataApi.appendChild(div);
    }
}



