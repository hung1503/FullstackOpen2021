import { gql } from '@apollo/client'

export const ALL_BOOKS = gql`
  query {
    allBooks {
      title
      author{
        name
      }
      genres
      published
    }
  }
`

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookC
    }
  }
`

export const CREATE_BOOK = gql`
  mutation addBook(
    $title: String!, 
    $author: String!, 
    $published: Int!, 
    $genres: [String!]!
    ) {
    addBook(
      title: $title,
      published: $published,
      author: $author,
      genres: $genres
    ) {
      title
      published
      author {
        name
      }
      genres
    }
  }
`

export const EDIT_AUTHOR = gql`
 mutation editAuthor(
   $name: String!,
   $born: Int!
 ) {
   editAuthor(
     name: $name, 
     born: $born
     ) {
      name
      born
    }
  }
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`

export const USER = gql`
  query {
    me {
      favoriteGenre
    }
  }
`

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      title
      published
      author {
        name
      }
      genres
    }
  }
`