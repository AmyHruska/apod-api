import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
// import Template from './js/template.js';

function getPicByDate(date) {
  let request = new XMLHttpRequest();
  const apodUrl = `https://api.nasa.gov/planetary/apod?date=${date}&api_key=${process.env.API_KEY}`;

  request.addEventListener("loadend", function () {
    const response = JSON.parse(this.responseText);
    statusHandler(this.status, response);
  });

  request.open("GET", apodUrl, true);
  request.send();
}


function statusHandler(status, apiResponse) {
 let responseHtml = document.querySelector('#showResponse');
  if (status === 200) {
    responseHtml.innerText = `Description: ${apiResponse.explanation}`;
    displayImage(apiResponse);
  } else if (status === 403) {
    responseHtml.innerText = `${apiResponse.error.code} ${apiResponse.error.message}`;
  } else {
    responseHtml.innerText = `Error code: ${apiResponse.code} ${apiResponse.msg}`;
  }
}

function displayImage(response) {
  const imgTag = `<img src="${response.url}"/>`
  document.getElementById('showResponse').insertAdjacentHTML('beforeend', imgTag);
}

function handleForm(e) {
  e.preventDefault();
  const date = document.getElementById("date").value;
  document.querySelector('#date').value = null;
  getPicByDate(date);
}

document.querySelector("#form").addEventListener("submit", handleForm);

/*
const renderCountry = (data, classname = '') => {
  const html = `
    < article class="country ${classname}" >
    <img class="country__img" src="${data.flags.png}" />
    <div class="country__data">
      <h3 class="country__name">${data.name.common}</h3>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row"><span>👫</span>${(
        +data.population / 1000000
      ).toFixed(1)}</p>
      <p class="country__row"><span>🗣️</span>${
        Object.values(data.languages)[0]
      }</p>
      <p class="country__row"><span>💰</span>${
        Object.values(data.currencies)[0].name
      }</p>
    </div>
  </article >
    `;
  countriesContainer.insertAdjacentHTML('beforeend', html);
}; 

${process.env.API_KEY}
*/