const weather = document.querySelector(".js-weather");

const API_KEY = "ad669eb7f1b2daff7457b324a5264958";
const COORDS = "coords";

function getWeather(lat, lon) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  )
    .then(function (response) {
      // console.log(response.json());
      // 여기서 우리는 response.json data를 필요로 하다. response에는 network data만 존재하기 때문이다. response API 에서 json method data를 가져오는 것은 비동기 처리 이다. 따라서
      return response.json();
    })
    .then(function (json) {
      // console.log(json);
      // then method를 사용하여 response.json을 통해 data를 모두 가져온 후에 json data를 출력해보면 정상 출력됨을 확인할 수 있다.
      const temperature = json.main.temp;
      const place = json.name;

      weather.innerText = `${temperature} @ ${place}`;
    });
  // fetch 는 data를 가져올수 있는 API이다. weather API에 있는 API call 주소에 data를 입력해준다.
  // then method를 사용하여 fetch 가 작업을 완료한 후에 새로운 함수 작업을 실행한다.
}

function saveCoords(coordsObj) {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}
// 로컬스토리지에 좌표를 저장하기 위한 함수, 좌표는 String으로 저장해야하기 때문에 stringify Method를 사용했다.

function handleGeoSuccess(position) {
  // console.log(position);
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;

  const coordsObj = {
    latitude,
    longitude,
  };
  // key와 value값이 같을때는 위와 같이 한번만 써줘도 된다.
  saveCoords(coordsObj);
  getWeather(latitude, longitude);
}
// 좌표를 가져오는데 성공했을 때 실행할 함수이므로 positon argument가 존재하고 이를 console에 출력하여 확인한다. console창을 확인해보면 position 객체는 latitude와 longitude key에 각각의 value를 가지고 있는 것을 확인할 수 있는데 이게 위도와 경도이다.

function handleGeoError() {
  console.log("Can't access geo location");
}

function askForCoords() {
  navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
  // geolocation은 Object, getCurrentPosition은 Method로 2가지 requirement를 가지고 있다. 하나는 좌표를 가져오는데 성공했을 때 실행할 함수, 다른 하나는 좌표를 가져오는데 실패했을 때의 함수
}

function loadCoords() {
  const loadedCoords = localStorage.getItem(COORDS);

  if (loadedCoords === null) {
    askForCoords();
    // geolocation 정보가 담긴 loadedCoords가 null이면 해당 데이터를 얻기 위한 askForCoords 함수를 실행한다.
    // handleGeoSuccess 는 localStorage 에 좌표값이 없을 때만 실행된다.
  } else {
    const parseCoords = JSON.parse(loadedCoords);
    getWeather(parseCoords.latitude, parseCoords.longitude);
  }
}

function init() {
  loadCoords();
}

init();
