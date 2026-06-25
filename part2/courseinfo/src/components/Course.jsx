const Header = ({ title }) => {
  return (
    <div>
      <h1>{title}</h1>
    </div>
  )
}

const Part = ({ part }) => {
  return (
    <div>
      <p>{part.name} {part.exercises}</p>
    </div>
  )
}

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map(part =>
        <Part key={part.id} part={part} />
      )}
    </div>
  )
}

const Total = ({ parts }) => {
  const total_exercises = parts.reduce((sum, part) => {
    return sum + part.exercises
  }, 0)

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

