const containerDataApi = document.getElementById("container-data-api");
const searchButton = document.querySelector(".test-button");
let searchInput = document.querySelector(".test-search");
let dataApiArray = [];
let dataInputArray = [];

function createCountryCard(country) {
    const div = document.createElement("div");
    div.classList.add("card");
    const pName = document.createElement("p");
    const pRegion = document.createElement("p");
    let imgFlag = document.createElement("div");
    const pPopulation = document.createElement("p");
    const pContinents = document.createElement("p");
    pName.innerHTML = `<strong>${country.name.official}</strong>`;
    pRegion.innerHTML = `<strong>${country.region}</strong>`;
    imgFlag.innerHTML = `<img src="${country.flags.png}" alt="Bandera de ${country.name.common}">`;
    pPopulation.innerHTML = `<strong>${country.population}</strong>`;
    pContinents.innerHTML = `<strong>${country.continents}</strong>`;
    div.appendChild(pName);
    div.appendChild(pRegion);
    div.appendChild(pPopulation);
    div.appendChild(pContinents);
    div.appendChild(imgFlag);
    return div;
}

function showCardCountry(countries) {
    containerDataApi.innerHTML = "";
    if (countries.length === 0) {
        containerDataApi.innerHTML = `<p>NO RESULTS, TRY AGAIN</p>`;
        return;
    }
    countries.forEach((country) => {
        containerDataApi.appendChild(createCountryCard(country));
    });
}

function searchAndFilter(textInput) {
    const name = dataApiArray.filter(country =>
        country.name.common.toLowerCase().includes(textInput.toLowerCase()) || 
        country.continents[0].toLowerCase().includes(textInput.toLowerCase())
    );
    return name;
}

fetch("https://restcountries.com/v3.1/all")
    .then((response) => {
        return response.json();
    }).then(countries => {
        dataApiArray = countries;
        showCardCountry(dataApiArray);
    })

searchButton.addEventListener("click", () => {
    const valueInputName = searchInput.value.trim();

    if (valueInputName === "" ) {
        window.alert("Empty values to search");
        showCardCountry(dataApiArray)
    } else {
        showCardCountry(searchAndFilter(valueInputName))

    }
});

searchInput.addEventListener("input", () => {
    const valueInputName = searchInput.value.trim();
    
    if (valueInputName === "") {
        showCardCountry(dataApiArray)
    } else {
        showCardCountry(searchAndFilter(valueInputName))
    }
});
