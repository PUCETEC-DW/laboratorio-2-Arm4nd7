const containerDataApi  = document.getElementById("container-data-api");
const testButton = document.querySelector(".test-button");


fetch('https://restcountries.com/v3.1/all').then((response) => {
    return response.json();
}).then((countrys) => {
    // for (let country = 0; country < countrys.length; country++) {
    //     const p = document.createElement("p");
    //     p.classList.add("data-api");
    //     p.innerHTML = `<strong>${countrys[country].name.common}</strong>`;
    //     containerDataApi.appendChild(p);
    // }

    countrys.forEach(country => {         
        const div = document.createElement('div')
        div.classList.add('card')
        div.innerHTML = `<strong>${country.name.common}</strong>`;
        containerDataApi.appendChild(div)
    });

});


testButton.addEventListener("click", () => {
    let p = document.querySelector(".element-title");
    p.textContent = "MIO";
});
