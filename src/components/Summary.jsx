import React from 'react'
import quizCompleteLogo from '../assets/quiz-complete.png'

const Summary = ({ givenAnswers }) => {
  return (
    <div id="summary">
      <img src={quizCompleteLogo} alt="Quiz Complete" />
      <h2>Quiz Completed!</h2>
      <ol>
        {givenAnswers.map(answer => (
          <>
          <h3>{answer.id[1]}</h3>
          <li key={answer.id}>
            <p className='question'>{answer.text}</p>
            <p className={`user-answer ${answer.correct ? 'correct' : 'wrong'}`}>{answer.answer}</p>
          </li>
          </>
        ))}
      </ol>
    </div>
  )
}

export default Summary
