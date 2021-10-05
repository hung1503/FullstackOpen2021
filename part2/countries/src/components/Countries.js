import React from "react";
import CountryInfo from "./CountryInfo"
import ShowCountry from "./ShowCountry";

const Countries = ({country, searchQuery}) => {

    const foundCountry =
        searchQuery === ""
        ? []
        : country.filter(country => (country.name).toLowerCase().includes(searchQuery.toLowerCase()));

   if (foundCountry.length === 1) {
       return (
        <div>
            <CountryInfo country = {foundCountry[0]} />
        </div>
    )
} 
    return (
        <div>
            {foundCountry.length > 10 
            ? <p>Too many matches, specify another filter</p>
            : foundCountry.map((country,i) => (
               <ShowCountry country={country} /> 
                ))  
            }
        </div>)
}



export default Countries;

