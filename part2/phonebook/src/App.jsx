import { useState, useEffect } from 'react'
import personService from './services/persons'

const Filter = ({ filterString, filterNames }) => {
  return (
    <div>
      filter shown with <input value={filterString} onChange={filterNames}/>
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

const Person = ({ person, deleteFunc }) => {
  return (
    <div>
      <p>
        {person.name} {person.number}
        <button onClick={deleteFunc}>delete</button>
      </p>
    </div>
  )
}

const Persons = ({ persons, filterString, deleteFunc }) => {
  return (
    <div>
      {persons
        .filter(person => person.name.includes(filterString))
        .map(person => {
          return <Person key={person.name} person={person}
            deleteFunc={() => deleteFunc(person)} 
          />
        })
      }
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterString, setFilterString] = useState('')

  useEffect(() => {
    personService.getAll().then(response => setPersons(response))
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

    personService.create(nameObj).then(returnedPerson => {
      setPersons(persons.concat(returnedPerson))
      setNewName('')
    })
  }

  const filterNames = (event) => {
    setFilterString(event.target.value)
  }

  const deletePerson = (person) => {
    if (confirm(`Delete ${person.name}?`)) {
      personService.deletePerson(person)
      personService.getAll().then(response => setPersons(response))
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterString={filterString} filterNames={filterNames} />
      <h2>add a new</h2>
      <PersonForm newName={newName} handleNewName={handleNewName}
        newNumber={newNumber} handleNewNumber={handleNewNumber}
        handleFormSubmit={handleFormSubmit} />
      <h2>Numbers</h2>
      <Persons persons={persons} filterString={filterString}
        deleteFunc={deletePerson} />
    </div>
  )
}

export default App
