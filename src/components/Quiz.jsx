import React, { useEffect } from 'react'
import Question from './Question.jsx'
import Answer from './Answer.jsx'
import ProgressBar from './ProgressBar.jsx'
import { useReducer } from 'react'
import questionsData from '../data/questions.js'

const QUESTIONS = questionsData;
const TIME_FOR_QUESTION = 3;

const questionReducer = (state, action) => {
  switch (action.type) {
    case 'NEXT_QUESTION':
      const nextIndex = state.index + 1;
      if (nextIndex < QUESTIONS.length) {
        return {
          ...state,
          index: nextIndex,
          text: QUESTIONS[nextIndex].text,
          answers: QUESTIONS[nextIndex].answers,
          id: QUESTIONS[nextIndex].id,
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
    index: 0,
    text: QUESTIONS[0].text,
    answers: QUESTIONS[0].answers,
    id: QUESTIONS[0].id,
    selectedAnswer: null,
    time: TIME_FOR_QUESTION,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatchQuestion({ type: 'NEXT_QUESTION' });

    }, TIME_FOR_QUESTION * 1000);

    return () => clearTimeout(timer);
  }, [question.index]);

  const selectAnswer = (answer) => {
    dispatchQuestion({ type: 'SELECT_ANSWER', payload: answer });
  }

  return (
    <div id="quiz">
        <div id="question-overview">
          <div id="question">
            <ProgressBar max={3} />
            <Question text={question.text} />
          </div>
          <div id="answers">
            {question.answers.map((answer, index) => (
              <Answer key={index} text={answer} onSelect={selectAnswer} selected={answer === question.selectedAnswer} />
            ))}
          </div>
        </div>
    </div>
  )
}

export default Quiz
