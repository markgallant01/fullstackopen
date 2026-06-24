import { useState } from "react"

const App = () => {
  // save the clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)

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
      <button onClick={handleGoodClick}>good</button>
      <button onClick={handleNeutralClick}>neutral</button>
      <button onClick={handleBadClick}>bad</button>
      <h2>statistics</h2>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {total}</p>
      <p>average {getAverage()}</p>
      <p>positive {getPositivePercentage()} %</p>
    </div>
  )
}

export default App

