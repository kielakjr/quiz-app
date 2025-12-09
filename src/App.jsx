import React from 'react'
import Quiz from './components/Quiz.jsx'
import questionsData from './data/questions.js'

const App = () => {

  const [givenAnswers, setGivenAnswers] = React.useState(questionsData.map((question) => ({ id: question.id, answer: null })))
  const [quizSubmitted, setQuizSubmitted] = React.useState(false)

  const handleAnswer = (answer) => {
    setGivenAnswers([...givenAnswers, answer])
  }

  const submitQuiz = () => {
    setQuizSubmitted(true)
  }

  console.log(givenAnswers)

  return (
    <>
      {quizSubmitted ? (
        <h2>Quiz Submitted!</h2>
      ) : (
        <Quiz onAnswer={handleAnswer} submitQuiz={submitQuiz} />
      )}
    </>
  )
}

export default App
