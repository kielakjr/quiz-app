import React from 'react'

const Summary = ({ givenAnswers }) => {
  return (
    <div id="summary">
      <ol>
        {givenAnswers.map(answer => (
          <li key={answer.id}>
            Question {answer.id}: {answer.answer}
          </li>
        ))}
      </ol>
    </div>
  )
}

export default Summary
