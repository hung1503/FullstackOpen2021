import React from "react"
import { addVote } from "../reducers/anecdoteReducer"
import { noti } from "../reducers/notificationReducer"
import { connect } from 'react-redux'

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

const AnecdoteList = (props) => {
    
    const handleVote = (anec) => {
        console.log("vote", anec.id)
        props.addVote(anec)
        props.noti(`you voted '${props.anecdotes.find(a => a.id === anec.id).content}'`, 5000)
    }
    
    return (
        <div>
        {props.anecdotes
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

const mapStateToProps = (state) => {
    if(state.filter === '') {
        return {
            anecdotes: state.anecdotes,
            filter: state.filter
        }
    } else {
        return {
            anecdotes: state.anecdotes.filter(data => data.content.toLowerCase().includes(state.filter.toLowerCase())),
            filter: state.filter
        }
    }
}

const mapDispatchToProps = {
    addVote,
    noti
}

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)
