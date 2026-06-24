import { useState } from "react"

const Button = ({ onClick, text }) => {
  return <button onClick={onClick}>{text}</button>
}

const StatisticLine = ({ text, value }) => {
  return <p>{text} {value}</p>
}

const Statistics = ({ values, getAverage, getPositivePercentage }) => {
  if (values.total === 0) {
    return <p>No feedback given</p>
  } else {
    return (
      <div>
        <h2>statistics</h2>
        <StatisticLine text="good" value={values.good} />
        <StatisticLine text="neutral" value={values.neutral} />
        <StatisticLine text="bad" value={values.bad} />
        <StatisticLine text="all" value={values.all} />
        <StatisticLine text="average" value={getAverage()} />
        <StatisticLine text="positive" value={getPositivePercentage()} />
      </div>
    )
  }
}

const App = () => {
  // save the clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)

  const values = {
    good: good,
    neutral: neutral,
    bad: bad,
    total: total
  }

  const handleGoodClick = () => {
    setGood(good + 1)
    setTotal(total + 1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
    setTotal(total + 1)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
    setTotal(total + 1)
  }

  const getAverage = () => {
    const goodScore = good
    const badScore = bad * -1
    const average = (goodScore + badScore) / total

    if (isNaN(average))
      return 0
    
    return average
  }

  const getPositivePercentage = () => {
    const positivePercentage = (good / total) * 100

    if (isNaN(positivePercentage)) {
      return 0
    } else {
      return positivePercentage
    }
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={handleGoodClick} text="good" />
      <Button onClick={handleNeutralClick} text="neutral" />
      <Button onClick={handleBadClick} text="bad" />
      <Statistics values={values} getAverage={getAverage}
        getPositivePercentage={getPositivePercentage}/>
    </div>
  )
}

export default App

