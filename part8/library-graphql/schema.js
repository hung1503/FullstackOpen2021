const { gql } = require('apollo-server')

const typeDefs = gql`
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Author {
    name: String!
    born: Int
    id: ID!
    bookC: Int
  } 

  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!   
    id: ID!
  }

  type Query {
    authorCount: Int!
    allAuthors: [Author!]!
    bookCount: Int!
    allBooks(author: String, genres: String): [Book!]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String!]!
    ) : Book

    editAuthor(
      name: String!
      born: Int!
    ) : Author

    createUser(
      username: String!
      favoriteGenre: String!
    ): User

    login(
      username: String!
      password: String!
    ): Token
  }

  type Subscription {
    bookAdded: Book!
  }
`

module.exports = typeDefs