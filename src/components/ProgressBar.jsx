import React, { useEffect } from 'react'
import { useState } from 'react'

const ProgressBar = ({ max }) => {

  const [progress, setProgress] = useState(max);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => prev - 10);
    }, 10);
    return () => clearInterval(interval);
  }, []);

  return (
    <progress value={progress} max={max}></progress>
  )
}

export default ProgressBar
