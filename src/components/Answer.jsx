import React from 'react'

const Answer = ({ text, selected, onSelect }) => {
  return (
    <li className="answer" onClick={() => onSelect(text)}>
      <button className={selected ? 'selected' : ''}>{text}</button>
    </li>
  )
}

export default Answer
