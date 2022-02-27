import React from "react"
import { ALL_AUTHORS } from "../queries"
import { useQuery } from "@apollo/client"
import EditYear from "./EditYear"

const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS)

  if(result.loading) {
    return <div>loading...</div>
  }

  if (!props.show) {
    return null
  }
  const authors = result.data.allAuthors
  const editYear = authors.map((author) => {
    return {
      value: author.name.toLowerCase(),
      label: author.name
    }
  })

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookC}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <EditYear editYear={editYear}/>
    </div>
  )
}

export default Authors
