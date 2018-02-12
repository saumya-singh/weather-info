function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getWeatherInfo);
    } else {
        return "Geolocation is not supported by this browser.";
    }
}

function getWeatherInfo(position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    json_data = {"latitude" : latitude, "longitude" : longitude}
    var XHR = new XMLHttpRequest();
    XHR.open("POST", "/api/weatherinfo/");
    XHR.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    XHR.send(JSON.stringify(json_data));
    XHR.onload = function() {
        var res = XHR.responseText;
        data = JSON.parse(res)
        document.getElementById("demo").innerHTML = weatherInfoMarkup(data)
    }
}

function weatherInfoMarkup(weatherInfo) {
    var weatherInfoMarkup = `<p><b>Name of the place: </b>${weatherInfo["name"]}</p>
		<p><b>Temperature: </b>${weatherInfo["main"]["temp"]}</p>
		<p><b>Minimum Temperature: </b>${weatherInfo["main"]["temp_min"]}</p>
		<p><b>Maximum Temperature: </b>${weatherInfo["main"]["temp_max"]}</p>
    <p><b>Pressure: </b>${weatherInfo["main"]["pressure"]}</p>
    <p><b>Humidity: </b>${weatherInfo["main"]["humidity"]}</p>`
    return weatherInfoMarkup
}
