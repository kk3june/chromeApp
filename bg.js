const body = document.querySelector("body");

const IMG_NUMBER = 5;

function paintImg(imgNumber) {
  const image = new Image(); // image 상수에 img 태그를 할당

  image.src = `images/${imgNumber + 1}.jpg`;
  image.classList.add("bgImage");
  body.appendChild(image);
}

function genRandom() {
  const number = Math.floor(Math.random() * IMG_NUMBER);
  return number;
}
// JavaScript를 이용하여 랜덤한 숫자를 추출하기 위한 함수
// Math.floor은 버림, Math.ceil은 올림

function init() {
  const randomNumber = genRandom();
  paintImg(randomNumber);
}

init();
