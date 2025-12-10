import { useRef } from 'react'

const Answer = ({ text, selected, onSelect, showCorrect, isCorrect }) => {

  const buttonRef = useRef();

  const applyClasses = () => {
    if (showCorrect && selected) {
      if (isCorrect) {
        return 'correct';
      } else if (selected && !isCorrect) {
        return 'wrong';
      }
    } else {
      if (selected) {
        return 'selected';
      }
    }
    return '';
  }

  return (
    <li className="answer" onClick={() => onSelect(text)}>
      <button ref={buttonRef} className={applyClasses()}>{text}</button>
    </li>
  )
}

export default Answer
