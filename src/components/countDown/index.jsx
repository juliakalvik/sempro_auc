import React, { useState, useEffect } from "react";

const CountdownTimer = () => {
  const initialTimeInSeconds = 7 * 60 * 60; // 7 hours in seconds
  const [timeInSeconds, setTimeInSeconds] = useState(initialTimeInSeconds);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeInSeconds((prevTime) => {
        if (prevTime > 0) {
          return prevTime - 1;
        } else {
          clearInterval(intervalId);
          // You can add logic here for when the countdown reaches zero
        }
      });
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;

    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}:${String(seconds).padStart(2, "0")}`;
  };

  return (
    <div>
      <p>Bid ends in: {formatTime(timeInSeconds)}</p>
    </div>
  );
};

export default CountdownTimer;
