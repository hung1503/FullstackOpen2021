import react from "react";

const Header = ({courses}) => {
    return (
      <div>
        
          <div key={courses.id}>
            <h2>{courses.name}</h2>
          </div>
      </div>
    )
  }
  
  const Content = ({courses}) => {
    return (
      <div>
          <div key={courses.parts.id}>
            <Part part={courses.parts}/>
          </div>
      </div>
    )
  }
  
  const Part = ({part}) => {
    return (
      <div>
        {part.map((info) => (
          <div key={info.id}>
            <p>{info.name} {info.exercises}</p>
         </div>
        ))}
      </div>)
  }
  
  const Total = ({courses}) => {
    const total = courses.reduce((acc, cur) => {
      return {
        exercises: acc.exercises + cur.exercises}
      });
    return (
      <div>
          <div>
            <h4>Total of exercises: {total.exercises}</h4>
         </div>
      </div>
    )
  }
  
  const Course = ({courses}) => {
    return (
      <div>
      <h1>Web development curriculum</h1>
      {courses.map((data, index) => (
        <div key={index}>
          <Header courses = {data} />
          <Content courses = {data}/>
          <Total courses = {data.parts}/>
        </div>
      ))}
      </div>
    )
  }

export default Course;