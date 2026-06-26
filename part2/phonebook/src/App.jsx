import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState(
    [
      { name: 'Arto Hellas', id: 1 }
    ]
  )
  const [newName, setNewName] = useState('')

  const handleInput = (event) => {
    setNewName(event.target.value)
  }

  const handleFormSubmit = (event) => {
    event.preventDefault()
    const nameObj = {
      name: newName,
      id: persons.length + 1
    }
    setPersons(persons.concat(nameObj))
    setNewName('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleFormSubmit}>
        <div>
          name: <input value={newName} onChange={handleInput}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => <p key={person.id} >{person.name}</p>)}
    </div>
  )
}

export default App
