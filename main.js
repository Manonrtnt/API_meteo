const submit = document.querySelector("#submit");
const display = document.querySelector("#display");

async function requestApi(url, fn){
    let response = await fetch(url);
    let data = await response.json();

    fn(data);
    console.log(data);
}

function buildUrl(str){
    const url = "https://www.prevision-meteo.ch/services/json/";
    return `${url}${str}`;
}

function hourByHour(element){
    let dayHour = element.hourly_data
    let list = document.createElement("div");
    //style
    list.style.border = "black solid 2px";
    list.style.borderRadius = "10px";
    list.style.padding = "15px";
    //
    let hourHour = document.createElement("h3");
    hourHour.textContent = `Evolution de la journée heure par heure`;
    display.appendChild(list);
    list.appendChild(hourHour);

    for (let hour of Object.keys(dayHour)) {
        let iconHour = document.createElement("img");
        let conditionHour = element.hourly_data[hour].CONDITION
        let newOl = document.createElement("p");

        newOl.textContent = `${hour} : ${conditionHour}`;
        iconHour.setAttribute("src", element.hourly_data[hour].ICON);

        list.appendChild(newOl);
        list.appendChild(iconHour);
    };
};

function displayData(data) {
    const tab = [];
    
    //METEO JOUR-J
    let {
        date,
        hour,
        tmp,
        condition,
        icon_big
    } = data.current_condition;

    let { day_long } = data['fcst_day_0'];

    let {
        name,
        country
    } = data.city_info;

    let cityName = document.createElement("h2")
    let jourJ = document.createElement("h3");
    let dateJ = document.createElement("p");
    let heureJ = document.createElement("p");
    let conditionJ = document.createElement("p");
    let tempJ = document.createElement("p");
    let iconJ = document.createElement("img");

    cityName.textContent = `Météo pour ${name}, ${country}`;
    jourJ.textContent = `${day_long}`;
    dateJ.textContent = `${date} à ${hour}`;
    conditionJ.textContent = `${condition}`;
    tempJ.textContent = `Température : ${tmp}°C`;
    iconJ.setAttribute("src", icon_big);

    display.appendChild(cityName);
    display.appendChild(jourJ);
    display.appendChild(dateJ);
    display.appendChild(heureJ);
    display.appendChild(iconJ);
    display.appendChild(conditionJ);
    display.appendChild(tempJ);

    // HEURE / HEURE
    hourByHour(data.fcst_day_0);

    // PREVISIONS
    for (let str of Object.keys(data)) {
        if (str.includes("fcst_day")) {
            tab.push(data[str]);
        }
    }
    tab.shift();

    for (let element of tab) {
        let i = 1;
        let {
            day_long,
            date,
            tmax,
            tmin,
            condition,
            icon_big
        } = element;

        let jourP = document.createElement("h3");
        let iconP = document.createElement("img");
        let conditionP = document.createElement("p");
        let tminP = document.createElement("p");
        let tmaxP = document.createElement("p");

        jourP.textContent = `${day_long} ${date}`;
        conditionP.textContent = `${condition}`;
        tminP.textContent = `Température minimale : ${tmin}°C`;
        tmaxP.textContent = `Température maximale : ${tmax}°C`;
        iconP.setAttribute("src", icon_big);

        display.appendChild(jourP);
        display.appendChild(iconP);
        display.appendChild(conditionP);
        display.appendChild(tminP);
        display.appendChild(tmaxP);

        // Heure / heure / par Prévision 
        hourByHour(element);
        i++;
    }
};

submit.addEventListener("click", (e) => {
    e.preventDefault();
    const field = document.querySelector("#cityField");
    const url = buildUrl(field.value);

    display.innerHTML = "";
    requestApi(url, displayData);
});


// Fonction Christophe
// function displayData(data) {
//     const tab = [];
//     let i = 0;
//     for (let str of Object.keys(data)) {
//         if (str.includes("fcst_day")) {
//             tab.push(data[str]);
//         }
//     }

//     for (let element of tab) {
//         if (i == 0) {
//             var {
//                 tmp,
//                 condition,
//                 icon_big
//             } = data.current_condition;
//         }
//         else {
//             var {
//                 day_long,
//                 tmin,
//                 tmax,
//                 condition,
//                 icon_big
//             } = element;
//         }

//         let jourP = document.createElement("p");
//         let iconP = document.createElement("img");
//         let conditionP = document.createElement("p");
//         let tempP = document.createElement("p");
//         let tminP = document.createElement("p");
//         let tmaxP = document.createElement("p");


//         conditionP.textContent = `${condition}`;
//         iconP.setAttribute("src", icon_big);

//         if (i === 0) {
//             tempP.textContent = `Température actuelle : ${tmp}°C`;
//             displayDiv.appendChild(tempP);
//         } else {
//             jourP.textContent = `${day_long}`;
//             tminP.textContent = `Température minimale : ${tmin}°C`;
//             tmaxP.textContent = `Température maximale : ${tmax}°C`;
//             displayDiv.appendChild(jourP);
//             displayDiv.appendChild(tminP);
//             displayDiv.appendChild(tmaxP);
//         }
//         displayDiv.appendChild(iconP);
//         displayDiv.appendChild(conditionP);

//         i++;
//     }
//     return data;
// }

