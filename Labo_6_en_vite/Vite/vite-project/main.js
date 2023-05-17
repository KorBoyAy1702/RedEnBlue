"use strict";

const red = document.querySelector('#redButton');
const blue = document.querySelector('#blueButton');

red.addEventListener('click', function(){
  fetch('http://localhost:3000/red', { method: 'PUT' });
  getRequest();

});
blue.addEventListener('click', function(){
  fetch('http://localhost:3000/blue', { method: 'PUT' });
  getRequest();
});

async function getRequest() {

  try {
    const response = await fetch('http://localhost:3000/status');

    if (response.ok) {
      console.log("ok");
    } else {
      throw new Error("error");
    }

    const data = await response.json();
    console.log(data);
    red.innerText = data.red;
    red.style.flexGrow = data.red;
    blue.innerText = data.blue;
    blue.style.flexGrow = data.blue;
  } catch (error) {
    console.log(error);
  }

};
