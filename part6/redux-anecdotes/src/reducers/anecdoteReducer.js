import anecdoteService from '../services/anecdote'

const anecdoteReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type) {
    case 'ADD_ANECDOTE':
      return [...state, action.data]
    case 'VOTE':
      const id = action.data
      const anecdote = state.find(a => a.id === id)
      const updatedAnecdote = {
        ...anecdote,
        votes: anecdote.votes + 1
      }
      return state.map(a => a.id === id ? updatedAnecdote : a)
    case 'INIT_ANECDOTES':
      return action.data
    default:
      return state
    }
}

export const addVote = (anec) => {
  return async dispatch => {
    const updatedAnec = {
      ...anec,
      votes: anec.votes + 1
    }
    const anecdote = await anecdoteService.vote(updatedAnec)
    dispatch({
    type: 'VOTE',
    data: anecdote.id 
    })
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'ADD_ANECDOTE',
      data: newAnecdote
      
    })
  }
}

export const initAnecdotes = (anecdotes) => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}


export default anecdoteReducer