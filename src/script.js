const containerDataApi = document.getElementById("container-data-api");
const testButton = document.querySelector(".test-button");
let input = document.querySelector(".test-search");
let dataApiArray = [];
let dataInputArray = [];

testButton.addEventListener("click", () => {
    const valorInput = input.value.trim();
    if (valorInput !== "") {
        dataInputArray = [valorInput]; // solo guarda 1 valor
        filterSearch(valorInput);
        console.log(dataInputArray);
    }
});

fetch("https://restcountries.com/v3.1/all")
    .then((response) => {
        return response.json();
    }).then(countries => {
        dataApiArray = countries;
        mainShowData();
    })

function mainShowData() {
    dataApiArray.forEach((country) => {
        const div = document.createElement("div");
        const pNmae = document.createElement("p");
        const pRegion = document.createElement("p");
        let imgFlag = document.createElement("div");
        const pPopulation = document.createElement("p");
        const pContinents = document.createElement("p");
        div.classList.add("card");
        pNmae.innerHTML = `<strong>${country.name.official}</strong>`;
        pRegion.innerHTML = `<strong>${country.region}</strong>`;
        imgFlag.innerHTML = `<img src="${country.flags.png}" alt="Bandera de ${country.name.common}">`;
        pPopulation.innerHTML = `<strong>${country.population}</strong>`;
        pContinents.innerHTML = `<strong>${country.continents}</strong>`;

        div.appendChild(pNmae);
        div.appendChild(pRegion);
        div.appendChild(imgFlag);
        div.appendChild(pPopulation);
        div.appendChild(pContinents);

        containerDataApi.appendChild(div);
    })
}

function filterSearch(texto) {
    containerDataApi.innerHTML = "";
    const pais = dataApiArray.filter(country => 
        country.name.common.toLowerCase().includes(texto.toLowerCase())
    );
    for (let i = 0; i < pais.length; i++) {
        const storeWord = document.createElement("div");
        const pSotoreWord = document.createElement("p");
        // const flag = document.createElement("div");

        storeWord.classList.add("newCard");
        console.log(pais[i]);
        pSotoreWord.innerHTML = `<strong>${pais[i].capital}</strong>`;
        // flag.innerHTML = `<img src="${pais[i].flags.png}">`;
        storeWord.appendChild(pSotoreWord);
        // storeWord.appendChild(flag);
        containerDataApi.appendChild(storeWord);
    }
}


