import React, { useState, useEffect } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import pingSound from "../../assets/pingSound.mp3";
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

export default function Pomodoro() {
  const breakTimeSound = new Audio(pingSound);
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [displayMessage, setDisplayMessage] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [revisionTime, setRevisionTime] = useState(25);
  const [breakTime, setBreakTime] = useState(5);

  const timerMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const timerSeconds = seconds < 10 ? `0${seconds}` : seconds;

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const handleRevisionChange = (value) => {
    setRevisionTime(value);
    if (!isRunning) {
      setMinutes(value);
      setSeconds(0);
    }
  };

  const handleBreakChange = (value) => {
    setBreakTime(value);
  };

  const resetTimer = () => {
    setMinutes(revisionTime);
    setSeconds(0);
    setIsRunning(false);
    setDisplayMessage(false);
  };

  useEffect(() => {
    if (isRunning) {
      const interval = setInterval(() => {
        clearInterval(interval);

        if (seconds === 0) {
          if (minutes !== 0) {
            setSeconds(59);
            setMinutes((prevState) => prevState - 1)
          } else {
            let minutes = displayMessage ? revisionTime : breakTime;
            let seconds = 10;

            setMinutes(minutes);
            setSeconds(seconds);
            setDisplayMessage(!displayMessage);

            if (!displayMessage) {
              breakTimeSound.play();
            } else if (displayMessage) {
                breakTimeSound.play()
            }
          }
        } else {
          setSeconds((prevState) => prevState - 1);
        }
      }, 1000);
    }
  }, [seconds, isRunning]);

  const percentage = ((minutes * 60 + seconds) / (revisionTime  * 60)) * 100;

  return (
    <>
      <div>
        <h1>Pomodoro Timer</h1>
        {!displayMessage && <p>Time to Revise</p>}
        {displayMessage && <p>Go on a break!</p>}
      </div>
      <div>
        <CircularProgressbar
          value={percentage}
          text={`${timerMinutes}:${timerSeconds}`}
          styles={buildStyles({
            textSize: "16px",
            textColor: "#333",
            pathColor: "#007bff",
            trailColor: "#f3f3f3",
          })}
        />
      </div>
      <button onClick={toggleTimer}>{isRunning ? "Pause" : "Start"}</button>
      <button onClick={resetTimer}>Reset</button>
      <div>
        <h2>Revision Time: {revisionTime} minutes</h2>
        <Slider
          min={1}
          max={60}
          step={1}
          value={revisionTime}
          onChange={handleRevisionChange}
        />
      </div>
      <div>
        <h2>Break Time: {breakTime} minutes</h2>
        <Slider
          min={1}
          max={30}
          step={1}
          value={breakTime}
          onChange={handleBreakChange}
        />
      </div>
    </>
  );
}
