import { useState } from 'react'
import axios from 'axios'

const Search = () => {
  return (
    <p>
      find countries <input />
    </p>
  )
}

const searchCountries = (searchTerm) => {
  const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api/name"
  axios
    .get(`${baseUrl}/${searchTerm}`)
    .then(results => results.data)
}

const Results = () => {
  let searchResults
  searchCountries("finland").then(results => {
    searchResults = results
    console.log(searchResults)
  })
}

const App = () => {
  return (
    <div>
      <Search />
      <Results />
    </div>
  )
}

export default App

