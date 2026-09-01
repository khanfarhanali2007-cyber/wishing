import { useEffect, useState } from 'react';

export function useRelationshipTimer(startDate) {
  const [time, setTime] = useState(() => calculateTimeDifference(startDate));

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(calculateTimeDifference(startDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [startDate]);

  return time;
}

function calculateTimeDifference(startDate) {
  const start = new Date(startDate).getTime();
  const now = Date.now();
  const diff = Math.max(now - start, 0);

  const totalSeconds = Math.floor(diff / 1000);
  const months = Math.max(Math.floor(totalSeconds / 2592000), 0);
  const days = Math.max(Math.floor((totalSeconds % 2592000) / 86400), 0);
  const hours = Math.max(Math.floor((totalSeconds % 86400) / 3600), 0);
  const minutes = Math.max(Math.floor((totalSeconds % 3600) / 60), 0);
  const seconds = Math.max(totalSeconds % 60, 0);

  return {
    months,
    days,
    hours,
    minutes,
    seconds,
  };
}
