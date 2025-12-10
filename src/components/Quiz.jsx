import { useEffect } from 'react'
import Question from './Question.jsx'
import Answer from './Answer.jsx'
import ProgressBar from './ProgressBar.jsx'
import { useReducer } from 'react'
import questionsData from '../data/questions.js'

const QUESTIONS = questionsData;
const TIME_FOR_QUESTION = 5;
const TIME_AFTER_ANSWER = 0.8;
const TIME_TO_SHOW_CORRECT_ANSWER = 1.5;

const shuffleArray = (array) => {
  return array
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}

const questionReducer = (state, action) => {
  switch (action.type) {
    case 'NEXT_QUESTION':
      const nextIndex = state.index + 1;
      if (nextIndex < QUESTIONS.length) {
        return {
          ...state,
          index: nextIndex,
          text: QUESTIONS[nextIndex].text,
          answers: shuffleArray(QUESTIONS[nextIndex].answers),
          id: QUESTIONS[nextIndex].id,
          time: TIME_FOR_QUESTION,
          correct: QUESTIONS[nextIndex].answers[0],
          selectedAnswer: null,
          showCorrect: false,
        };
      } else {
        return {
          ...state,
          last: true,
        };
      }
    case 'SELECT_ANSWER':
      return {
        ...state,
        selectedAnswer: action.payload,

      };
    case 'SET_TIME':
      return {
        ...state,
        time: action.payload,
      };
    case 'SHOW_CORRECT':
      return {
        ...state,
        showCorrect: true,
      };
    default:
      return state;
  }
}

const Quiz = ({ onAnswer, submitQuiz }) => {

  const [question, dispatchQuestion] = useReducer(questionReducer, {
    index: 0,
    text: QUESTIONS[0].text,
    answers: shuffleArray(QUESTIONS[0].answers),
    id: QUESTIONS[0].id,
    selectedAnswer: null,
    time: TIME_FOR_QUESTION,
    correct: QUESTIONS[0].answers[0],
    last: false,
    showCorrect: false,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!question.selectedAnswer) {
        onAnswer({ id: question.id, answer: null, text: question.text, correct: false });
        dispatchQuestion({ type: 'NEXT_QUESTION' });
      }

    }, TIME_FOR_QUESTION * 1000);

    return () => clearTimeout(timer);
  }, [question.index, question.time]);

  const selectAnswer = (answer) => {
    dispatchQuestion({ type: 'SELECT_ANSWER', payload: answer })
    onAnswer({ id: question.id, answer: answer, text: question.text, correct: question.correct === answer });
  }

  useEffect(() => {
    if (question.last) {
      submitQuiz();
    }
  }, [question.last, submitQuiz]);

  useEffect(() => {
    if (question.selectedAnswer) {
      dispatchQuestion({ type: 'SET_TIME', payload: TIME_AFTER_ANSWER});
      const timer = setTimeout(() => {
        dispatchQuestion({ type: 'SHOW_CORRECT' });
        dispatchQuestion({ type: 'SET_TIME', payload: TIME_TO_SHOW_CORRECT_ANSWER});
        const correctTimer = setTimeout(() => {
          dispatchQuestion({ type: 'NEXT_QUESTION' });
        }, TIME_TO_SHOW_CORRECT_ANSWER * 1000);
        return () => clearTimeout(correctTimer);
      }, TIME_AFTER_ANSWER * 1000);
      return () => clearTimeout(timer);
    }
  }, [question.selectedAnswer]);

  return (
    <div id="quiz">
        <div id="question-overview">
          <div id="question">
            <ProgressBar max={question.time * 1000} key={question.index} answered={!!question.selectedAnswer && !question.showCorrect} />
            <Question text={question.text} />
          </div>
          <ul id="answers">
            {question.answers.map((answer, index) => (
              <Answer key={`${index}-${answer}`} text={answer} onSelect={selectAnswer} selected={answer === question.selectedAnswer} showCorrect={question.showCorrect} isCorrect={answer === question.correct} disabled={!!question.selectedAnswer} />
            ))}
          </ul>
        </div>
    </div>
  )
}

export default Quiz
