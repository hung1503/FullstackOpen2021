import React from "react"
import { createAnecdote } from "../reducers/anecdoteReducer"
import { noti } from "../reducers/notificationReducer"
import { connect } from 'react-redux'

const AnecdoteForm = (props) => {
    const addAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        props.createAnecdote(content)
        props.noti(`you added '${content}'`, 5000)
      }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={addAnecdote}>
                <div><input name="anecdote" /></div>
                <button type="submit" >create</button>
            </form>
        </div>
    )
}

export default connect(
    null, 
    { createAnecdote, noti }
)(AnecdoteForm)
    