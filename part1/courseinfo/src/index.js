import React from 'react'

const Header = ({course}) => {
  return (
    <div>
      <h1>{course}</h1>
    </div>
  )
}

const Content = ({parts}) => {
  const [pa1, pa2, pa3] = parts;
  return (
    <div>
      <Part name={pa1.name} exercises={pa1.exercises}/>
      <Part name={pa2.name} exercises={pa2.exercises}/>
      <Part name={pa3.name} exercises={pa3.exercises}/>
    </div>
  )
}

const Part = ({name, exercises}) => {
  return (
    <div>
      {name} {exercises}
    </div>
    
  )
}

const Total = ({parts}) => {
  const [ex1, ex2, ex3] = parts;
  return (
    <div>
      <p>Number of exercises {ex1.exercises + ex2.exercises + ex3.exercises}</p>
    </div>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }
  return (
    <div>
      <Header course = {course.name} />
      <Content parts = {course.parts}/>
      <Total parts = {course.parts} />
    </div>
  )
}

export default App