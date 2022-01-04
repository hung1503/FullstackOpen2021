import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { addVote } from "../reducers/anecdoteReducer"
import { noti, hide } from "../reducers/notificationReducer"
const Anec = ({ anecdote, handleVote }) => {
    return (
        <div>
            <div>
                {anecdote.content}
            </div>
            <div>
                Vote: {anecdote.votes}
                <button onClick={handleVote}>vote</button>
            </div>
        </div>
    )
}

const AnecdoteList = () => {
    const anecdotes = useSelector(state => state.anecdotes)
    const filter = useSelector(state => state.filter)
    const dispatch = useDispatch()

    const filterAnecdotes = 
        filter === ''
        ? anecdotes
        : anecdotes.filter(data => data.content.toLowerCase().includes(filter.toLowerCase()))

    
    const handleVote = (id) => {
        console.log("vote", id)
        dispatch(addVote(id))
        dispatch(noti(`you voted '${anecdotes.find(a => a.id === id).content}'`))
        setTimeout(() => {
            dispatch(hide(null))
        }, 5000)
    }
    
    return (
        <div>
        {filterAnecdotes
            .sort((a, b) => b.votes - a.votes)
            .map(anecdote => (
                <Anec 
                    key={anecdote.id} 
                    anecdote={anecdote} 
                    handleVote={() => handleVote(anecdote.id)} 
                />
            ))}
        </div>
    )
}

export default AnecdoteList
