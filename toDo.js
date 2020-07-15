const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";
let toDos = []; // toDoList에 해야할 일이 생겼을 때 이 data를 담기 위한 array를 생성한다.

function saveToDos() {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}
// localStorage 에 TODOS_LS에 toDos를 저장하도록 설정
// 그러나 로컬스토리지에서 자바스크립트 데이터를 저장할 수 없다.
// 자바스크립트는 로컬스토리지의 모든 data를 String으로 저장한다. -> JSON.Stringify 함수를 사용하여 String으로 변환해주어야 한다.

function deleteToDo(event) {
  // console.dir(event.target);
  // event.target 함수로는 버튼이 클릭된 것을 확인할 수 있지만, 어떤 li태그의 버튼인지 확인할 수 없다. 따라서 console.dir 함수를 사용하여 클릭된 버튼의 부모태그를 찾아야 li태그 전체를 삭제할 수 있다. 위 콘솔을 찍어보면 parantNode 속성으로 부모태그를 확인할 수 있음을 알 수 있다.
  // console.dir(event.target.parentNode); //를 콘솔창에 출력해봄으로써 더블체크

  const btn = event.target;
  const li = btn.parentNode;
  toDoList.removeChild(li);

  const cleanToDos = toDos.filter(function (toDo) {
    return toDo.id !== parseInt(li.id);
  });
  // toDos는 array이고, 이 array는 Object들로 이루어져 있다. .filter 함수를 사용하면 toDos라는 array의 요소들을 forEach와 마찬가지로 모든 아이템을 argument로 입력된 함수를 실행하고 true 인 값만 가지고 새로운 array를 만든다.
  toDos = cleanToDos;
  saveToDos();
}

function paintToDo(text) {
  const li = document.createElement("li"),
    delBtn = document.createElement("button"),
    span = document.createElement("span"),
    newId = toDos.length + 1;
  // 먼저 toDoList로 추가될 행을 만들기 위한 요소들을 선언한다.

  delBtn.innerText = "✖️";
  delBtn.addEventListener("click", deleteToDo);
  span.innerText = text;
  // toDoList 의 행을 구성한다.

  li.appendChild(delBtn);
  li.appendChild(span);
  li.id = newId;
  toDoList.appendChild(li);
  // toDoList의 구성된 행에 맞춰 화면에 표시한다.

  const toDoObj = {
    text: text,
    id: newId,
  };
  toDos.push(toDoObj);
  // toDos array에 다양한 data를 입력하기 위해 Object 형식으로 data를 작성하여 전달한다.
  saveToDos();
}

function handleSubmit() {
  event.preventDefault();

  const currentValue = toDoInput.value;
  paintToDo(currentValue);
  toDoInput.value = ""; // data를 toDoList로 보내고 나서 input을 초기화한다.
}

function loadedToDos() {
  const loadedToDos = localStorage.getItem(TODOS_LS);

  if (loadedToDos !== null) {
    // console.log(loadedToDos);
    const parsedToDos = JSON.parse(loadedToDos); // String으로 저장된 data를 활용하기 위해 parse 함수를 통해 다시 object로 변환
    parsedToDos.forEach(function (toDo) {
      paintToDo(toDo.text);
    });
  }
}

function init() {
  loadedToDos();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();
