import { useRef } from 'react'

const Answer = ({ text, selected, onSelect }) => {

  const buttonRef = useRef();

  return (
    <li className="answer" onClick={() => onSelect(text)}>
      <button ref={buttonRef} className={selected ? 'selected' : ''}>{text}</button>
    </li>
  )
}

export default Answer
