
import { useState } from 'react'

function App() {
  const [city, setCity] = useState("")

  const [weatherForecast, setWeatherForecast] = useState(null)

  const searchForecastweather = () => {
    //console.log('clicou', city)
    fetch(`
    http://api.weatherapi.com/v1/current.json?key=e751ea9cf5bc4fcbbb3225428211810&q=${city}&lang=pt
    `).then((response) =>{
       //console.log('response ===>', response)
       if(response.status == 200){
         return response.json()
       }
    }).then((data) => {
      console.log('data ====>', data)
      setCity('')
      setWeatherForecast(data)
    })
  };

  const handleCityChange = (event) => {
    setCity(event.target.value)
  };

  return (
    <div>
      <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
        <a className="navbar-brand" href="#search">
          EBAC Weather
        </a>
      </nav>

      <main className="container" id="search">
        <div className="jumbotron">
          <h1>Verifique agora a previsaõ do tempo na sua cidade</h1>
          <p className="lead">
            Digite a sua cidade no campo abaixo e em seguida clique em procurar
          </p>

          <div className="mb-4">
            <div>
              <input 
                type="text" 
                className="form-control" 
                value={city} 
                onChange={handleCityChange} 
              />
            </div>
          </div>

          <button
            className="btn btn-lg btn-primary"
            onClick={searchForecastweather}
          >
            Pesquisar
          </button>

          {
            weatherForecast ? (
              <div className="mt-4 d-flex align-itens-center">
                <div className="col-sm-1">
                  <img src={weatherForecast.current.condition.icon} alt="Weather Icon"/>
                </div>
                <div className="col-sm-12 ml-4 mt-2">
                  <h3>Hoje o dia está: {weatherForecast.current.condition.text}</h3>

                  <p className="mt-4">
                    Cidade: {weatherForecast.location.name}
                  </p>
                  
                  <p>
                    Estado: {weatherForecast.location.region}
                  </p>

                  <p>
                    País: {weatherForecast.location.country}
                  </p>
                  
                  <p>
                    Temp: {weatherForecast.current.temp_c}°
                  </p>

                  <p>
                    Humidade: {weatherForecast.current.humidity}%
                  </p>
                  <p>
                    Velocidade do vento: {weatherForecast.current.gust_kph}km/h
                  </p>
                  <p>
                    Ultima atualização: {weatherForecast.current.last_updated}
                  </p>
                </div>
              </div>
            ) : null
          }

        </div>
      </main>
    </div>
  )
  /*const Title = "Bem Vindo a São Paulo"
  const [inputValue, setInputValue] = useState("")

  const handleInputChange = (element) => {
    // console.log('a função foi chamada', element.target.value)
    // setInputValue("Valor do input")
    setInputValue(element.target.value)
  }

  return (
    <div>  
      <h1>WorkShop EBAC - {inputValue}</h1>
      <input type="text" value={inputValue} onChange={handleInputChange}/>
    </div>
  );*/
}

export default App;
