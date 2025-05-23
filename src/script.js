const containerDataApi = document.getElementById("container-data-api");
const testButton = document.querySelector(".test-button");
let input = document.querySelector(".test-search");
let dataApiArray = [];
let dataInputArray = [];


testButton.addEventListener("click", () => {
    // dataInputArray.push(input.value);
    // console.log(dataInputArray);
    if(dataApiArray.length < 2){
        filterSearch();
    }else if (dataApiArray.length > 1) {
        let dataRemove = dataApiArray.pop();
        
    }
});


fetch("https://restcountries.com/v3.1/all")
    .then((response) => {
        return response.json();
    }).then(countries => {
        dataApiArray = countries;
        showData(dataApiArray)
    })

function showData(countries) {
    countries.forEach((country) => {
        const div = document.createElement("div");
        const p = document.createElement("p");
        const pContinent = document.createElement("p");
        div.classList.add("card");
        pContinent.innerHTML = `<strong>${country.continents}</strong>`;
        p.innerHTML =`<strong>${country.name.common}</strong>`;
        div.appendChild(pContinent);
        div.appendChild(p);
        containerDataApi.appendChild(div);
    })
}

function filterSearch() {
    containerDataApi.innerHTML = "";
    let pais = dataApiArray.filter(country => country.name.common.includes(input.value));
    const storeWord = document.createElement("div");
    const pSotoreWord = document.createElement("p");
    storeWord.classList.add("newCard");
    pSotoreWord.innerHTML = `<strong>${pais[0].name.common}</strong>`;
    storeWord.appendChild(pSotoreWord);
    containerDataApi.appendChild(storeWord);
    console.log(pais);
}


