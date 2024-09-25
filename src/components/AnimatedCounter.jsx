// src/components/AnimatedCounter.jsx
import React, { useEffect, useState } from 'react';

const AnimatedCounter = ({ value }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const startValue = 0;
    const endValue = value;
    const duration = 2000; // Animation duration in milliseconds
    const incrementTime = (duration / endValue) > 1 ? Math.floor(duration / endValue) : 1;

    let current = startValue;
    const timer = setInterval(() => {
      if (current < endValue) {
        setCount(current);
        current++;
      } else {
        clearInterval(timer);
        setCount(endValue);
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [value]);

  return <span>{count}</span>;
};

export default AnimatedCounter;
