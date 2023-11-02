import React, { createContext, useContext, useState, useEffect } from 'react';
import pingSound from '../../assets/pingSound.mp3';

const TimerContext = createContext();

export const TimerProvider = ({ children }) => {
  const breakTimeSound = new Audio(pingSound);
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [displayMessage, setDisplayMessage] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [revisionTime, setRevisionTime] = useState(25);
  const [breakTime, setBreakTime] = useState(5);
  const [showSettings, setShowSettings] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userID, setUserID] = useState(0);
  const [username, setUsername] = useState('');

  const toggleTimer = () => {
    setIsRunning(!isRunning);
    if (showSettings && !isRunning) {
      toggleSettings();
    }
    setIsActive(!isActive);
  };

  const toggleSettings = () => {
    setShowSettings(!showSettings);
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
    setMinutes(25);
    setSeconds(0);
    setIsRunning(false);
    setDisplayMessage(false);
    setIsActive(false);
    setRevisionTime(25);
    setBreakTime(5);
  };

  useEffect(() => {
    if (isRunning) {
      const interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes !== 0) {
            setMinutes((prevState) => prevState - 1);
            setSeconds(59);
          } else {
            let newMinutes = displayMessage ? revisionTime : breakTime;
            let newSeconds = 1;
            setMinutes(newMinutes);
            setSeconds(newSeconds);
            setDisplayMessage(!displayMessage);

            if (!displayMessage) {
              breakTimeSound.play();
            } else if (displayMessage) {
              breakTimeSound.play();
            }
          }
        } else {
          setSeconds((prevState) => prevState - 1);
        }
      }, 1000);

      return () => {
        clearInterval(interval);
      };
    }
  }, [seconds, isRunning]);

  return (
    <TimerContext.Provider
      value={{
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
        isLoggedIn,
        setIsLoggedIn,
        userID,
        setUserID,
        username,
        setUsername,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
};

export const useTimer = () => {
  return useContext(TimerContext);
};
