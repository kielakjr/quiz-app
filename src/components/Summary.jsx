import React from 'react'

const Summary = ({ givenAnswers }) => {
  return (
    <div id="summary">
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
