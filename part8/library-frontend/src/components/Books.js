import React, { useEffect, useState } from "react"
import { useQuery } from "@apollo/client"
import { ALL_BOOKS } from "../queries"

const Books = (props) => {
  const result = useQuery(ALL_BOOKS)

  const [filterGenre, setFilterGenre] = useState("all genres")
  
  if(result.loading) {
    return <div>loading...</div>
  }

  if (!props.show) {
    return null
  }  
  let books = result.data.allBooks
  let uniqueGenres = []
  if(books.length > 0) {
    let genres = []
    books.forEach(book => {
      book.genres.forEach(genre => {
        genres.push(genre)
      })
    })
    uniqueGenres = [...new Set(genres)]
  }

  if(filterGenre !== "all genres") {
    books = books.filter(book => book.genres.includes(filterGenre))
  }

  return (
    <div>
      <h2>books</h2>
      <p>in genre {filterGenre}</p>
      <table>
        <tbody>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Published</th>
          </tr>
          {books.map((a, i) => (
            <tr key={i}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
              <td>{a.genres}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{marginTop:'30px'}}>
        {uniqueGenres.map(genre => 
          <button key={genre} onClick={() => setFilterGenre(genre)}>{genre}</button>
        )}
        <button onClick={() => setFilterGenre('all genres')}>all genres</button>
      </div>
    </div>
  )
}

export default Books
