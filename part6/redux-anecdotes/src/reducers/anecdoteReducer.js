const anecdoteReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type) {
    case 'ADD_ANECDOTE':
      return [...state, action.data.content]
    case 'VOTE':
      const id = action.data.id
      const anecdote = state.find(a => a.id === id)
      const updatedAnecdote = {
        ...anecdote,
        votes: anecdote.votes + 1
      }
      return state.map(a => a.id === id ? updatedAnecdote : a)
    case 'INIT_ANECDOTES':
      return action.data.anecdotes
    default:
      return state
    }
}

export const addVote = (id) => {
  return {
    type: 'VOTE',
    data: { id }
  }
}

export const createAnecdote = (content) => {
  return {
    type: 'ADD_ANECDOTE',
    data: {
      content
    }
  }
}

export const initAnecdotes = (anecdotes) => {
  return {
    type: 'INIT_ANECDOTES',
    data: {
      anecdotes
    }
  }
}

export default anecdoteReducer