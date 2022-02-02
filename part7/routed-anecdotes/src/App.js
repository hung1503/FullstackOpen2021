import React, { useState } from 'react'
import {  
  Switch, 
  Route, 
  Link,
  useRouteMatch
} from 'react-router-dom'
import { useField } from './hooks'


import Footer from './components/Footer'
import About from './components/About'
import CreateNew from './components/CreateNew'
import Anecdote from './components/Anecdote'
import AnecdoteList from './components/AnecdoteList'

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: '1'
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: '2'
    }
  ])

  const padding = {
    paddingRight: 5
}

  const [notification, setNotification] = useState('')

  const match = useRouteMatch('/anecdotes/:id')
  const anecdote = match
    ? anecdotes.find((anecdote) => anecdote.id === match.params.id)
    : null

  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    setAnecdotes(anecdotes.concat(anecdote))
    setNotification(`'${anecdote.content}' by ${anecdote.author} added`)
    setTimeout(() => {
      setNotification('')}, 10000)
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  return (
    <div>
      <div>
        <h1>Software anecdotes</h1>
        <Link style={padding} to="/about">about</Link>
        <Link style={padding} to="/anecdotes">anecdote</Link>
        <Link style={padding} to="/create">create new</Link>
      </div>

      <div>
        {notification}
      </div>
      <Switch>
        <Route path='/anecdotes/:id'>
          <Anecdote anecdote={anecdote} />
        </Route>    
        <Route path='/anecdotes'>
          <AnecdoteList anecdotes={anecdotes} />
        </Route>
        <Route path='/about'>
          <About />
        </Route>
        <Route path='/create'>
          <CreateNew addNew={addNew} />
        </Route>
        <Route exact path="/" render={()=><AnecdoteList anecdotes={anecdotes} />} />
      </Switch>

      <Footer />
    </div>
  )
}

export default App;