import React from 'react'
import { connect } from 'react-redux'
import { filter } from '../reducers/filterReducer'

const Filter = (props) => {
    const style = {
        marginBottom: 10
    }

    return (
        <div style={style}>
        filter <input onChange={(event) => props.filter(event.target.value)} />
        </div>
    )
}

export default connect(
    null,
    { filter }
)(Filter)