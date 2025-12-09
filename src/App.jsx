import React from 'react'
import Quiz from './components/Quiz.jsx'
import Summary from './components/Summary.jsx'

const App = () => {

  const [givenAnswers, setGivenAnswers] = React.useState([])
  const [quizSubmitted, setQuizSubmitted] = React.useState(false)

  const handleAnswer = (answer) => {
    setGivenAnswers([...givenAnswers, answer])
  }

  const submitQuiz = () => {
    setQuizSubmitted(true)
  }

  return (
    <>
      {quizSubmitted ? (
        <Summary givenAnswers={givenAnswers} />
      ) : (
        <Quiz onAnswer={handleAnswer} submitQuiz={submitQuiz} />
      )}
    </>
  )
}

export default App
