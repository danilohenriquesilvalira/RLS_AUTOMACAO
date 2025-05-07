import React, { useState, useEffect } from 'react';

interface CountUpProps {
  end: number;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
}

export const CountUp: React.FC<CountUpProps> = ({
  end,
  duration = 2,
  decimals = 0,
  prefix = '',
  suffix = ''
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;
    
    const countUp = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      const currentCount = Math.floor(progress * end);
      
      setCount(currentCount);
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(countUp);
      } else {
        setCount(end);
      }
    };
    
    animationFrame = requestAnimationFrame(countUp);
    
    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [end, duration]);
  
  return (
    <>{prefix}{count.toFixed(decimals)}{suffix}</>
  );
};