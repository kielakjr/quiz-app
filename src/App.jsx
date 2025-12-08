import React from 'react'
import questions from './data/questions'
import Question from './components/Question.jsx'
import Answer from './components/Answer.jsx'

const App = () => {

  const question = questions[0];

  return (
    <div id="quiz">
      <div id="question-overview">
        <div id="question">
          <Question
            key={question.id}
            question={question.text}
          />
        </div>
        <div id="answers">
          {question.answers.map((answer, index) => (
            <Answer
              key={index}
              text={answer}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default App
