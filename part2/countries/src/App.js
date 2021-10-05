import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Countries from './components/Countries';
import Input from './components/Input';


function App() {
  const [country, setCountry] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    axios
      .get('https://restcountries.com/v2/all')
      .then(response => {
        setCountry(response.data)
      })
      .catch(error => {
        console.log(error)
      })
  }, [])

  const handleChange = (event) =>{
    setSearchQuery(event.target.value);
  }

  return (
    <div className="App">
      <Input 
        onChange={handleChange} 
        value={searchQuery}
        />
      <div>
        <Countries 
          country = {country} 
          searchQuery={searchQuery} 
          />
      </div>
    </div>
  );
}

export default App;
