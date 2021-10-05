import React from "react";

const Input = ({onChange, value}) => {
    return (
        <div>
            <label>Find Countries </label>
            <input type="text" onChange={onChange} value={value} />
        </div>
    );
}

export default Input;