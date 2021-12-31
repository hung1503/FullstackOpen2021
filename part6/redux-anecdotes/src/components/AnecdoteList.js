import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { addVote } from "../reducers/anecdoteReducer"

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
    const anecdotes = useSelector(state => state);
    const dispatch = useDispatch();
    
    const handleVote = (id) => {
        console.log("vote", id)
        dispatch(addVote(id))
    }
    
    return (
        <div>
        <h2>Anecdotes</h2>
        {anecdotes
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
