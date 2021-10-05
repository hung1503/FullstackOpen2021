import React, {useState} from "react";
import CountryInfo from "./CountryInfo";

const ShowCountry = ({country, key}) => {
    const [show, setShow] = useState(false);
    const handleShow = () => {
        setShow(!show);
    }

    if(show) {
        return (
            <div>
                {country.name}{" "}
                <button onClick={handleShow}>{show ? "Hide" : "Show"}</button>
                <CountryInfo country={country} />
            </div>
        )
    }
    return (
        <div>
            {country.name}{" "}
            <button onClick={handleShow}>{show ? "Hide" : "Show"}</button>
        </div>
    )
};

export default ShowCountry;