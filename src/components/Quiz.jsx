import React from 'react'
import Question from './Question.jsx'
import Answer from './Answer.jsx'
import ProgressBar from './ProgressBar.jsx'
import { useReducer } from 'react'
import questionsData from '../data/questions.js'

const QUESTIONS = questionsData;

const questionReducer = (state, action) => {
  switch (action.type) {
    case 'NEXT_QUESTION':
      const nextIndex = state.index + 1;
      if (nextIndex < QUESTIONS.length) {
        return {
          ...state,
          currentQuestion: QUESTIONS[nextIndex],
          index: nextIndex,
          selectedAnswer: null,
        };
      } else {
        return state;
      }
    case 'SELECT_ANSWER':
      return {
        ...state,
        selectedAnswer: action.payload,
      };
    default:
      return state;
  }
}

const Quiz = () => {

  const [question, dispatchQuestion] = useReducer(questionReducer, {
    currentQuestion: QUESTIONS[0],
    index: 0,
    selectedAnswer: null,
  });
  console.log(question.currentQuestion)

  const selectAnswer = (answer) => {
    dispatchQuestion({ type: 'SELECT_ANSWER', payload: answer });
  }

  return (
    <div id="quiz">
        <div id="question-overview">
          <div id="question">
            <ProgressBar max={1000} />
            <Question text={question.currentQuestion.text} />
          </div>
          <div id="answers">
            {question.currentQuestion.answers.map((answer, index) => (
              <Answer key={index} text={answer} onSelect={selectAnswer} selected={answer === question.selectedAnswer} />
            ))}
          </div>
        </div>
    </div>
  )
}

export default Quiz
