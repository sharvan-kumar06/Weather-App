const apiKey = "a1476bba2db44e6e8ce153240250311"; 

document.getElementById("searchBtn").addEventListener("click", () => {
  const city = document.getElementById("cityInput").value.trim();
  if (city) getWeather(city);
});

async function getWeather(city) {
  const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    const info = document.getElementById("weatherInfo");

    if (data.error) {
      info.innerHTML = `<p>❌ ${data.error.message}</p>`;
    } else {
      info.innerHTML = `
        <h2>${data.location.name}, ${data.location.country}</h2>
        <p>🌡 Temperature: ${data.current.temp_c} °C</p>
        <p>💧 Humidity: ${data.current.humidity}%</p>
        <p>🌥 Condition: ${data.current.condition.text}</p>
        <img src="https:${data.current.condition.icon}" alt="Weather icon">
      `;
    }
  } catch (error) {
    console.error(error);
    document.getElementById("weatherInfo").innerHTML = `<p>⚠️ Error fetching data</p>`;
  }
}
