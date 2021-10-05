import React, { useState } from 'react'
import "./index.css"
import ReactDOM from 'react-dom'
import App from './App'

ReactDOM.render(
  <App />, 
  document.getElementById('root')
)
const Button = ({handleClick, text}) => {
  return (
    <button onClick = {handleClick}>{text}</button>
  )
}

const Statistics = ({good, neutral, bad}) => {
  const all = good + neutral + bad
  const average = (good-bad)/all
  const positive = good/all*100
  if(all===0){
    return (
      <div>
        No feedbaback given!
      </div>
    )
  }
  return (
    <div>
      <Statistic text = 'Good' value = {good}/>
      <Statistic text = 'Neutral' value = {neutral}/>
      <Statistic text = 'Bad' value = {bad}/>
      <Statistic text = 'All' value = {all}/>
      <Statistic text = 'Average' value = {average}/>
      <Statistic text = 'Positive' value = {positive}/>
      
    </div>
  )
}

const Statistic = ({text, value}) => (
        <tr>
          <th>{text}</th>
          <td>{value}</td>
        </tr>
  )



const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  const increaseGoodByOne = () => setGood(good + 1)
  const increaseNeutralByOne = () => setNeutral(neutral + 1)
  const increaseBadByOne = () => setBad(bad + 1)
  
  return (
    <div>
      <h1>Give Feedback</h1>
      <Button handleClick={increaseGoodByOne} text='Good'/>
      <Button handleClick={increaseNeutralByOne} text='Neutral'/>
      <Button handleClick={increaseBadByOne} text='Bad'/>
      <h1>Statistic</h1>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App