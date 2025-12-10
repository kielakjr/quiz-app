import React, { useEffect } from 'react'
import { useState } from 'react'

const ProgressBar = ({ max, answered }) => {

  const [progress, setProgress] = useState(max);

  useEffect(() => {
    setProgress(max);
  }, [max]);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => prev - 10);
    }, 10);
    return () => clearInterval(interval);
  }, [max]);

  return (
    <progress className={answered ? "answered" : ""} value={progress} max={max}></progress>
  )
}

export default ProgressBar
