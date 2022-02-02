import React, { useState } from "react";
import { useField } from "../hooks";

const CreateNew = (props) => {
    const content = useField('text')
    const author = useField('text')
    const info = useField('text')
  
    const handleSubmit = (e) => {
      e.preventDefault()
      props.addNew({
        content: content.value,
        author: author.value,
        info: info.value,
        votes: 0
      })
    }

    const handleReset = (e) => {
      e.preventDefault()
      content.resetValue('')
      author.resetValue('')
      info.resetValue('')
    }

    return (
      <div>
        <h2>create a new anecdote</h2>
        <form>
          <div>
            content
            <input {...content} />
          </div>
          <div>
            author
            <input {...author} />
          </div>
          <div>
            url for more info
            <input {...info} />
          </div>
          <button onClick={handleSubmit}>create</button>
          <button onClick={handleReset}>reset</button>
        </form>
      </div>
    )
  
}

export default CreateNew