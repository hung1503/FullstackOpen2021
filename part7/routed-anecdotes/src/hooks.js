import { useState } from 'react'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const resetValue = (event) => {
    setValue('')
  }

  return {
    type,
    value,
    onChange, 
    resetValue
  }
}

