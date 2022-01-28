import React from "react";

const Anecdote = ({ anecdote }) => (
    <div>
        <h2>{anecdote.content}</h2>
        <p>Author: {anecdote.author}</p>
        <p>For more info: {anecdote.info}</p>
        <div>
            Anecdote has {anecdote.votes}
            <button onClick={() => anecdote.vote()}>vote</button>
        </div>
    </div>
)

export default Anecdote