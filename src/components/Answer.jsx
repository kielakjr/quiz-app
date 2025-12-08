import React from 'react'

const Answer = ({ text, selected, onSelect }) => {
  return (
    <div className="answer" onClick={() => onSelect(text)}>
      <button className={selected ? 'selected' : ''}>{text}</button>
    </div>
  )
}

export default Answer
