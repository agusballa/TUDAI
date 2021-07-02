"use strict";

let captcha = "";

function generateRandom(){
    let random = Math.floor(Math.random()*1000000);
    let displayCaptcha = document.querySelector("#display-captcha")
    displayCaptcha.innerHTML = random;
    captcha = random;
}

generateRandom();

let btnSend = document.querySelector("#btn-send")
btnSend.addEventListener("click", validation);

function validation(){
    let inputCaptcha = document.querySelector("#input-captcha");
    let result = document.querySelector("#result"); 
    if (inputCaptcha.value == captcha) {
        result.innerHTML = "Eres un Humano :)";
        document.querySelector("#form").reset();
        generateRandom();
    }else {
        result.innerHTML = "Eres un Robot :(";
        document.querySelector("#form").reset();
        generateRandom();
    }
}