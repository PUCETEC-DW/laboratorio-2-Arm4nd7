const containerDataApi = document.getElementById("container-data-api");
const searchButtonAll = document.querySelector(".test-button-1");
const searchButtonContinent = document.querySelector(".test-button-2");
const optionsDisable = document.querySelector("fieldset");
let searchInput = document.querySelector(".test-search");
let selectInput = document.getElementById("continent-filter-select");
let optionInput1 = document.getElementById("checkboxCapital");
let optionInput2 = document.getElementById("checkboxLangauge");
let optionInput3 = document.getElementById("checkboxCoatArms");



let dataApiArray = [];

function createCountryCard(country) {
    const valueInput = searchInput.value.trim();
    const div = document.createElement("div");
    div.classList.add("card");
    const pName = document.createElement("p");
    const pRegion = document.createElement("p");
    const imgFlag = document.createElement("div");
    const pPopulation = document.createElement("p");
    pName.innerHTML = `Name: <strong>${country.name.official}</strong>`;
    pRegion.innerHTML = `Region: <strong>${country.region}</strong>`;
    imgFlag.innerHTML = `<img src="${country.flags.png}" alt="Bandera de ${country.name.common}">`;
    pPopulation.innerHTML = `Population: <strong>${country.population}</strong>`;
    div.appendChild(pName);
    div.appendChild(pRegion);
    div.appendChild(pPopulation);
    div.appendChild(imgFlag);


    if (valueInput === "") {
        optionsDisable.disabled = true;
    } else {
        optionsDisable.disabled = false;
        optionsEvents(div)
    }

    return div;
}

function optionsEvents(div) {
    optionInput1.addEventListener("change", () => {
        const valueInput = searchInput.value.trim();
        if (optionInput1.checked && valueInput !== "") {
            showCity(div, searchAndFilter(valueInput))
        } else {
            const borrar = document.querySelector(".new-city")
            borrar?.remove();
        }
    })

    optionInput2.addEventListener("change", () => {
        const valueInput = searchInput.value.trim();
        if (optionInput2.checked && valueInput !== "") {
            showLangauge(div, searchAndFilter(valueInput))
        } else {
            const borrar = document.querySelector(".new-languages")
            borrar?.remove();
        }
    })

    optionInput3.addEventListener("change", () => {
        const valueInput = searchInput.value.trim();
        if (optionInput3.checked && valueInput !== "") {
            showCoatArms(div, searchAndFilter(valueInput))
        } else {
            const borrar = document.querySelector(".new-coat-arms")
            borrar?.remove();
        }
    })
}

function createCity(div, country) {
    const city = document.createElement("p");
    city.classList.add("new-city");
    city.innerHTML = `Capital: <strong>${country.capital?.[0]}</strong>`;
    div.appendChild(city);
    return div;
}

function showCity(div, countries) {
    containerDataApi.innerHTML = "";
    if (countries.length === 0) {
        containerDataApi.innerHTML = `<p>NO RESULTS, TRY AGAIN</p>`;
        return;
    }
    countries.forEach((country) => {
        containerDataApi.appendChild(createCity(div, country));
    });
}

function createLanguage(div, country) {
    let textLanguage = ""
    let i = 0;
    const language = document.createElement("p");
    language.classList.add("new-languages");

    const countryLanguage = Object.values(country.languages);
    countryLanguage.forEach((lan) => {
        textLanguage += lan;
        if (i < countryLanguage.length - 1) {
            textLanguage += ", ";
        }
        i++;
    });
    language.innerHTML = `Language: <strong>${textLanguage}</strong>`;
    div.appendChild(language);
    return div;
}

function showLangauge(div, countries) {
    containerDataApi.innerHTML = "";
    if (countries.length === 0) {
        containerDataApi.innerHTML = `<p>NO RESULTS, TRY AGAIN</p>`;
        return;
    }
    countries.forEach((country) => {
        containerDataApi.appendChild(createLanguage(div, country));
    });
}

function createCoatArms(div, country) {
    const coatOfArms = document.createElement("div");
    coatOfArms.classList.add("new-coat-arms");
    if (country.coatOfArms && country.coatOfArms.png) {
        coatOfArms.innerHTML = `<img src="${country.coatOfArms.png}">`;
        div.appendChild(coatOfArms);
    }
    return div;
}

function showCoatArms(div, countries) {
    containerDataApi.innerHTML = "";
    if (countries.length === 0) {
        containerDataApi.innerHTML = `<p>NO RESULTS, TRY AGAIN</p>`;
        return;
    }
    countries.forEach((country) => {
        containerDataApi.appendChild(createCoatArms(div, country));
    });
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
    const parameterInput = dataApiArray.filter(country => 
        country.name.common.toLowerCase() === textInput.toLowerCase() ||
        country.name.official.toLowerCase() === textInput.toLowerCase() ||
        country.continents[0].toLowerCase() === textInput.toLowerCase() ||
        country.region[0].toLowerCase().includes(textInput.toLowerCase()) ||
        country.languages && Object.values(country.languages).some(language =>
            language.toLowerCase().includes(textInput.toLowerCase())) ||
        country.currencies && Object.values(country.currencies).some(mony =>
            mony.name.toLowerCase().includes(textInput.toLowerCase())) ||
        country.capital?.[0]?.toLowerCase() === textInput.toLowerCase()
    );
    return parameterInput;
}

function filterParameterContinent(selectOption) {
    const parameterOption = dataApiArray.filter(country =>
        country.continents[0].toLowerCase().includes(selectOption.toLowerCase())
    )
    return parameterOption
}

searchButtonAll.addEventListener("click", () => {
    const valueInput = searchInput.value.trim();
    if (valueInput === "") {
        window.alert("Empty values to search");
    } else {
        console.log(searchAndFilter(valueInput))
    }
});

searchButtonContinent.addEventListener("click", () => {
    const valueSelect = selectInput.value.trim();
    if (valueSelect === "") {
        containerDataApi.innerHTML = "";
        containerDataApi.innerHTML = `<p>No option to show</p>`;
    } else if (valueSelect === "All Continents") {
        showCardCountry(dataApiArray)
    } else {
        showCardCountry(filterParameterContinent(valueSelect))
    }
});

searchInput.addEventListener("input", () => {
    const valueInput = searchInput.value.trim();
    if (valueInput === "") {
        showCardCountry(dataApiArray)
    } else {
        showCardCountry(searchAndFilter(valueInput))
    }
});

fetch("https://restcountries.com/v3.1/all?fields=name,capital,flags,coatOfArms,languages,subregion,region,currencies,continents")
    .then((response) => {
        return response.json();
    }).then(countries => {
        dataApiArray = countries;
        showCardCountry(dataApiArray.sort((a, b) => a.name.official.localeCompare(b.name.official)));
    })


