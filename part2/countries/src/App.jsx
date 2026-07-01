import { useState, useEffect } from 'react'
import axios from 'axios'

const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api/all"

const Search = ({ handleSearch }) => {
  return (
    <p>
      find countries <input onChange={handleSearch} />
    </p>
  )
}

const CountryDisplay = ({ startVisible, country }) => {
  const [visible, setVisible] = useState(startVisible)
  const [weatherData, setWeatherData] = useState([])

  useEffect(() => {
    const [lat, long] = country.latlng
    const baseUrl = "https://api.open-meteo.com/v1/forecast"//&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m
    axios.get(`${baseUrl}?latitude=${lat}&longitude=${long}`)
      .then(response => {
        setWeatherData(response.data)
        console.log(response.data)
      })
  }, [])

  if (!visible) {
    return (
      <p>{country.name.common} <button onClick={() => setVisible(true)}>
        show
      </button></p>
    )
  }

  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>Capital {country.capital[0]}</p>
      <p>Area {country.area}</p>
      <h2>Languages</h2>
      <ul>
      {Object.keys(country.languages).map(key => {
        return <li key={key}>{country.languages[key]}</li> 
      })}
      </ul>
      <img src={country.flags["png"]} />
      <h2>Weather in {country.capital[0]}</h2>
    </div>
  )
}

const Results = ({ searchResults }) => {
  if (searchResults.length === 0) {
    return null
  }

  if (searchResults.length > 10) {
    return (
      <p>Too many matches, specify another filter</p>
    )
  }

  if (searchResults.length === 1) {
    return <CountryDisplay startVisible={true} country={searchResults[0]} />
  }

  return (
    <div>
      {searchResults.map(country => {
        return (<CountryDisplay key={country.name.common}
          startVisible={false} country={country} />
        )
      })}
    </div>
  )
}

const App = () => {
  const [countryData, setCountryData] = useState([])
  const [searchResults, setSearchResults] = useState([])

  useEffect(() => {
    axios.get(baseUrl).then(response => {
      setCountryData(response.data)
    })
  }, [])

  const handleSearch = (event) => {
    // search country list for search term
    setSearchResults(countryData.filter(country => {
      return country.name.common.toLowerCase().includes(event.target.value)
    }))
  }

  return (
    <div>
      <Search handleSearch={handleSearch} />
      <Results searchResults={searchResults} />
    </div>
  )
}

export default App

