const Header = ({ title }) => {
  return (
    <>
      <h1>{title}</h1>
    </>
  )
}

const Part = ({ part }) => {
  return (
    <>
      <p>{part.name} {part.exercises}</p>
    </>
  )
}

const Content = ({ parts }) => {
  return (
    <div>
      <ul>
        {parts.map(part =>
          <Part key={part.id} part={part} />
        )}
      </ul>      
    </div>
  )
}

const Total = ({ parts }) => {
  const total_exercises = parts[0].exercises +
    parts[1].exercises + parts[2].exercises

  return (
    <p>Number of exercises {total_exercises}</p>
  )
}

const Course = ({ course }) => {
  return (
    <div>
      <Header title={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default Course

