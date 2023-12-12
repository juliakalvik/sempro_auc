import { useState, useEffect } from "react";

const CountdownTimer = (props) => {
  // eslint-disable-next-line react/prop-types
  const targetDateTime = new Date(props.endsAt);

  // Get the current date and time
  const now = new Date();

  // Calculate the total seconds from now to the target date
  const totalSeconds = (targetDateTime - now) / 1000;
  const [timeInSeconds, setTimeInSeconds] = useState(totalSeconds);

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
    const days = Math.floor(time / (3600 * 24));
    const hours = Math.floor((time % (3600 * 24)) / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = Math.floor(time % 60);

    return `${days}d ${String(hours).padStart(2, "0")}h ${String(
      minutes
    ).padStart(2, "0")}m ${String(seconds).padStart(2, "0")}s`;
  };

  return (
    <div>
      <p>Bid ends in: {formatTime(timeInSeconds)}</p>
    </div>
  );
};

export default CountdownTimer;
