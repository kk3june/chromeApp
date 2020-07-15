const form = document.querySelector(".js-form"),
  input = form.querySelector("input"),
  greeting = document.querySelector(".js-greetings");

const USER_LS = "currentUser",
  SHOWING_CN = "showing";

function saveName(text) {
  localStorage.setItem(USER_LS, text);
}

function handleEvent() {
  event.preventDefault(); // 기존의 submit 이벤트를 막기 위한 코드

  const currentValue = input.value; // 입력된 data를 사용하기 위해 상수 선언

  paintGreeting(currentValue); // 입력된 data를 paintGreeting 함수의 argument로 사용하여 텍스트로 화면에 표시하기 위한 코드
  saveName(currentValue); // 화면을 다시 로딩해도 데이터를 보관하기 위해 로컬 스토리지에 해당 값을 저장하기 위한 saveName 함수
}

function askForName() {
  form.classList.add(SHOWING_CN);
  form.addEventListener("submit", handleEvent);
  // form 태그에 data를 입력하고 엔터를 누르면 submit 이벤트가 실행되는데, 이때 입력된 data는 증발된다. 따라서 submit 이벤트가 실행되면 해당 이벤트의 작동을 막고 handleEvent를 통해 data를 조작해주어야 한다.
}

function paintGreeting(text) {
  form.classList.remove(SHOWING_CN);
  greeting.classList.add(SHOWING_CN);
  greeting.innerText = `Hello ${text}`;
}

function loadName() {
  const currentUser = localStorage.getItem(USER_LS);
  // 처음 화면을 로딩하면 아래 조건문에서 currentUser === null 이다. 전역상수로 USER_LS를 선언하였지만, 아직 로컬스토리지에는 저장하지 않았기 때문에 loadName 함수는 로컬스토리지의 USER_LS 을 할당할 수 없다.

  if (currentUser === null) {
    askForName();
  } else {
    paintGreeting(currentUser);
  }
}

function init() {
  loadName();
}

init();
