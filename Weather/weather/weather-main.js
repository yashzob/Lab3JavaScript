const API_URl = "https://api.openweathermap.org/data/2.5/weather";
const APIKEY = "957f01baeda7eaa20a5604d06adcb885";

class WeatherApi {
  constructor(cityName) {
    this.cityName = cityName;
    this.apiUrl = new URL(API_URl);
  }
  urlBuild() {
    this.apiUrl.searchParams.append("q", this.cityName);
    this.apiUrl.searchParams.append("appid", APIKEY);
    this.apiUrl.searchParams.append("units", "metric");
  }
  invoke() {
    this.urlBuild();
    return (
      fetch(this.apiUrl.toString())
        .then((response) => {
          return response.json();
        })
        //// how json object get updated
        .then((responseAsJSON) => {
          //     console.log("in then", responseAsJSON);
          return responseAsJSON;
        })

        .catch((error) => {
          console.log("error invking the api");
          return;
        })
    );
  }
}

async function testInvoke() {
  const weatherApi = new WeatherApi("Allahabad");
  const response = await weatherApi.invoke();
  // console.log({ response: response.main });
  console.log(response);
  return response;
}
testInvoke();
//ghghjgyjtytyt
//

class WeatherApp {
  init() {
    this.addEventHandlers();
  }

  addEventHandlers() {
    const searchBoxElement = document.querySelector(".search-box");
    searchBoxElement.param1 = this;
    searchBoxElement.addEventListener("keypress", this.handleEvent);
  }

  handleEvent(event) {
    // Only when enter key is pressed

    if (event.key == "Enter" || event.keyCode == 13) {
      const eventTarget = event.target;
      const cityName = eventTarget.value;

      const theWeatherAppObj = eventTarget.param1;

      const weatherAPI = new WeatherApi(cityName);

      weatherAPI.invoke().then((response) => {
        theWeatherAppObj.updateElement(response);
      });
    }
  }

  updateElement(report) {
    const weatherElement = document.querySelector(".current .weather");
    weatherElement.innerHTML = report.weather[0].main;

    //const tempElementt=document.querySelector("")
    const temp = Math.round(report.main.temp);

    const tempElement = document.querySelector(".current .temp");
    tempElement.innerHTML = `${temp} °c`;
    console.log("temperature", temp);

    const weather = report.main.description;
    console.log(weather);

    //hi temp
    const hiTemp = Math.round(report.main.temp_max);
    const hilotempElement = document.querySelector(".current .hi-low");
    console.log(hiTemp);
    const loTemp = Math.round(report.main.temp_min);
    console.log(loTemp);
    const hilo = `${hiTemp} °c / ${loTemp} °c`;
    hilotempElement.innerHTML = hilo;
    // city country element
    const citycountry = `${report.name} , ${report.sys.country}`;
    const cityCountryEle = document.querySelector(".location .city");
    cityCountryEle.innerHTML = citycountry;

    // date time element using sunrise time
    let sec = report.sys.sunrise * 1000;
    console.log(sec);

    let normalDate = new Date(sec).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    console.log("current date", normalDate);
    const dateElement = document.querySelector(".location .date");
    dateElement.innerHTML = normalDate;
  }
}
const weatherApp = new WeatherApp();

weatherApp.init();
export { WeatherApp };
export { WeatherApi };
