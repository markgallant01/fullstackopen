import { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({ filter, filterNames }) => {
  return (
    <div>
      filter shown with <input value={filter} onChange={filterNames}/>
    </div>
  )
}

const PersonForm = (props) => {
  return (
    <form onSubmit={props.handleFormSubmit}>
      <div>
        name: <input value={props.newName} onChange={props.handleNewName}/>
      </div>
      <div>
        number:
        <input value={props.newNumber} onChange={props.handleNewNumber}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Persons = ({ persons, filter }) => {
  return (
    <div>
      {persons.filter(person => person.name.includes(filter))
      .map(person => <p key={person.name}>{person.name} {person.number}</p>)}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const handleNewName = (event) => {
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFormSubmit = (event) => {
    event.preventDefault()
    // check for duplicate name
    const currentNames = persons.map(person => person.name)
    if (currentNames.includes(newName)) {
      alert(`${newName} is already added to phonebook`)
      return
    }

    const nameObj = { name: newName, number: newNumber }
    setPersons(persons.concat(nameObj))
    setNewName('')
  }

  const filterNames = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} filterNames={filterNames} />
      <h2>add a new</h2>
      <PersonForm newName={newName} handleNewName={handleNewName}
        newNumber={newNumber} handleNewNumber={handleNewNumber}
        handleFormSubmit={handleFormSubmit} />
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} />
    </div>
  )
}

export default App
