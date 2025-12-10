import React from 'react'
import quizCompleteLogo from '../assets/quiz-complete.png'

const Summary = ({ givenAnswers }) => {

  const skipped = Math.round(givenAnswers.filter(answer => answer.answer === null).length / givenAnswers.length * 100);
  const correct = Math.round(givenAnswers.filter(answer => answer.correct === true).length / givenAnswers.length * 100);
  const incorrect = Math.round(givenAnswers.filter(answer => answer.correct === false && answer.answer !== null).length / givenAnswers.length * 100);

  return (
    <div id="summary">
      <img src={quizCompleteLogo} alt="Quiz Complete" />
      <h2>Quiz Completed!</h2>
      <div id="summary-stats">
        <p>
          <p className="number">{skipped}%</p>
          <p className="text">Skipped</p>
        </p>
        <p>
          <p className="number">{correct}%</p>
          <p className="text">Answered Correctly</p>
        </p>
        <p>
          <p className="number">{incorrect}%</p>
          <p className="text">Answered Incorrectly</p>
        </p>
      </div>
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
