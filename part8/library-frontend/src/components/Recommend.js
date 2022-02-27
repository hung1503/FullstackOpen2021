import React from "react";
import { useQuery } from "@apollo/client";
import { ALL_BOOKS, USER } from "../queries";

const Recommnend = (props) => {
  const resultBook = useQuery(ALL_BOOKS);
  const resultUser = useQuery(USER);

  if (!props.show) {
    return null
  }

  if (resultBook.loading) {
    return <div>loading...</div>
  }

  const user = resultUser.data.me;
  const favoriteGenre = user.favoriteGenre;

  let books = resultBook.data.allBooks

  if(favoriteGenre) {
    books = books.filter(book => book.genres.includes(favoriteGenre))
  }
  return (
    <div>
      <h2>Recommendations for you</h2>
      <p>Books are your favorite genre: {favoriteGenre}</p>
      <table>
        <tbody>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Published</th>
          </tr>
          {books.map((book) =>{
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          })}
        </tbody>
      </table>
    </div>
  )
}

export default Recommnend;