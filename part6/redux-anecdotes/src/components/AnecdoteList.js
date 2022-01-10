import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { addVote } from "../reducers/anecdoteReducer"
import { noti } from "../reducers/notificationReducer"
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

    
    const handleVote = (anec) => {
        console.log("vote", anec.id)
        dispatch(addVote(anec))
        dispatch(noti(`you voted '${anecdotes.find(a => a.id === anec.id).content}'`, 5000))
    }
    
    return (
        <div>
        {filterAnecdotes
            .sort((a, b) => b.votes - a.votes)
            .map(anecdote => (
                <Anec 
                    key={anecdote.id} 
                    anecdote={anecdote} 
                    handleVote={() => handleVote(anecdote)} 
                />
            ))}
        </div>
    )
}

export default AnecdoteList
