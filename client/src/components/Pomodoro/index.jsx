import React from 'react';
import { useTimer } from '../../contexts';
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

export default function Pomodoro() {
  const {
    minutes,
    seconds,
    displayMessage,
    isRunning,
    revisionTime,
    breakTime,
    showSettings,
    isActive,
    toggleTimer,
    toggleSettings,
    handleRevisionChange,
    handleBreakChange,
    resetTimer,
  } = useTimer();

  const timerMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const timerSeconds = seconds < 10 ? `0${seconds}` : seconds;

  const totalSeconds = displayMessage ? breakTime * 60 : revisionTime * 60;
  const percentage = ((minutes * 60 + seconds) / totalSeconds) * 100;
  const pathColour = displayMessage ? '#0f0' : '#007bff';

  return (
    <div>
      <div>
        <h1>Pomodoro Timer</h1>
        {!displayMessage && <p>Time to Revise!</p>}
        {displayMessage && <p>Go on a break!</p>}
      </div>
      <div>
        <CircularProgressbar
          value={percentage}
          text={`${timerMinutes}:${timerSeconds}`}
          styles={buildStyles({
            textSize: "16px",
            textColor: "#333",
            pathColor: pathColour,
            trailColor: "#f3f3f3",
          })}
        />
      </div>
      <div>
        <button onClick={toggleTimer}>{isActive ? "Pause" : "Start"}</button>
        <button onClick={resetTimer}>Reset</button>
        <button onClick={toggleSettings} disabled={isActive}>
          Settings
        </button>
        {showSettings && (
          <div>
            <div>
              <h3>Revision Time: {revisionTime} minutes</h3>
              <Slider
                min={1}
                max={60}
                step={1}
                value={revisionTime}
                onChange={handleRevisionChange}
              />
            </div>
            <div>
              <h3>Break Time: {breakTime} minutes</h3>
              <Slider
                min={1}
                max={30}
                step={1}
                value={breakTime}
                onChange={handleBreakChange}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
