import { useState, useEffect } from 'react'
import { useSubscription, useApolloClient } from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Notify from './components/Notify'
import Login from './components/Login'
import Recommnend from './components/Recommend'
import { BOOK_ADDED } from './queries'

const App = () => {
  const [page, setPage] = useState('authors')
  const [errorMessage, setErrorMessage] = useState(null)
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('library-user')
    if (loggedUserJSON) {
      setToken(loggedUserJSON.token)
    }
  }, [])

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      alert(`${subscriptionData.data.bookAdded.title} added sucessfully!`)
    }
  })
  
  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  if(!token) {
    return (
      <div>

        <h2>Login</h2>        
        <Notify message={errorMessage} />
        <Login 
          setToken={setToken}
          setError={notify}
        />
      </div>
    )
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token !== null && <button onClick={() => setPage('add')}>add book</button>}
        {token !== null && <button onClick={() => setPage('recommend')}>recommend</button>}
        
      </div>
      
      <Notify errorMessage={errorMessage} />
      {token !== null && <button onClick={logout}>logout</button>}
      <Authors show={page === 'authors'} />

      {token !== null && <Books show={page === 'books'} />}

      <NewBook show={page === 'add'} setError={notify}/>

      <Recommnend show={page === 'recommend'} />

    </div>
  )
}

export default App
