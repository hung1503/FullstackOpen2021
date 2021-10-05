
import React, { useState, useEffect } from 'react'
import Persons from "./component/Persons"
import PersonForm from './component/PersonForm';
import Filter from "./component/Filter"
import Notification from './component/Notification'
import phoneService from './services/phonebook'

const App = () => {

  const [ persons, setPersons ] = useState([]);
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber] = useState('');
  const [ searchQuery, setSearchQuery] = useState('');
  const [ foundPer, setFoundPer] = useState([]);
  const [ noti, setNoti] = useState(null);

  // Fetch data
  useEffect(() => {
    phoneService
      .getAll()
      .then(response => {
        setPersons(response)
      })
  }, [])

  // Add name and update number
  const submitName = (event) => { 
    event.preventDefault();
    const listObj = {
      name: newName,
      number: newNumber
    }
    const foundId = persons.find(per => per.name === listObj.name)
    if(foundId) {
      const newNum = {...foundId, number: listObj.number} ;
      const msg = listObj.name + ' is already added to phonebook, replace the old number with a new one?';
      if(window.confirm(msg) === true) {
        phoneService
          .update(foundId.id, newNum)
            .then(res => {
              setPersons(persons.map(per => per.id !== foundId.id ? per : res));
              setNewName('');
              setNewNumber(''); 
              setNoti({
                text: `Edited ${listObj.name}`,
                type: "noti"
              })
              setTimeout(() => {
                setNoti(null)
              }, 5000)
            })
          .catch(error => {
            setNoti({
              text:`'${listObj.name}' was already deleted from server!`,
              type: "error"
            })
            setPersons(persons.filter(p => p.id !== foundId.id))
            setTimeout(() => {
              setNoti(null)
            }, 5000)
          })
      }
    } else {
    phoneService
      .create(listObj)
        .then(response => {
          setNoti({
            text: `'${listObj.name}' was successfully added to the phonebook!`,
            type: "noti"
          })
          setTimeout(() => {
            setNoti(null)
          }, 5000)
          setPersons(persons.concat(response));
          setNewName('');
          setNewNumber('');
        })
        .catch(error => {
          setNoti(error.response.data);
          setTimeout(() => {
            setNoti(null);
          }, 5000)   
        })
      }
  } 
  
  // Delete a number
  const removeInfo = (per) => {
    const perName = per.name
    const perId = per.id
    const message = 'Delete ' + perName + ' ?';
    if(window.confirm(message) === true) {
      phoneService
        .remove(perId)
          .then(a => {
            setPersons(persons.filter(person => person.id !== perId))
          })
    }
}

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  }

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    const found = persons.filter(el => el.name.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1);
    setFoundPer(found);
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={noti} />
      <Filter
        searchQuery={searchQuery}
        handleSearchChange={handleSearchChange}
        foundPer={foundPer}
       />
      <h2> Add a new contact</h2>
      <PersonForm 
        submitName={submitName}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
        />
      <h2>Numbers</h2>
        <Persons data={persons} removeInfo={removeInfo} />
    </div>
  )
}

export default App