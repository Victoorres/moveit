import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { ChallengesContext } from './ChallengesContext';

interface CountdownContextData {
  minutes: number;
  seconds: number;
  hasFinished: boolean;
  isActive: boolean;
  startCountdown: () => void;
  resetCountdown: () => void;
}

interface CountdownProviderProps {
  children: ReactNode;
}

export const CountdownContext = createContext({} as CountdownContextData);

let countdownTimeout: NodeJS.Timeout;

export function CountdownProvider({ children }: CountdownProviderProps) {
  /**
   * Contexts
   */
  const { startNewChallenge } = useContext(ChallengesContext);

  /**
   * States
   */
  const [time, setTime] = useState(2);
  const [isActive, setIsActive] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);

  /**
   * Time variables
   */
  const seconds = time % 60;
  const minutes = Math.floor(time / 60);

  /**
   * Start countdown function
   */
  function startCountdown(): void {
    setIsActive(true);
  }

  /**
   * Stop countdown function
   */
  function resetCountdown(): void {
    clearTimeout(countdownTimeout);
    setHasFinished(false);
    console.log(hasFinished);

    setIsActive(false);
    setTime(2);
  }

  /**
   * Effects
   */
  useEffect(() => {
    if (isActive && time > 0) {
      countdownTimeout = setTimeout(() => {
        setTime(time - 1);
      }, 1000);
    } else if (isActive && time === 0) {
      setHasFinished(true);
      setIsActive(false);
      startNewChallenge();
    }
  }, [isActive, time]);

  return (
    <CountdownContext.Provider value={{ minutes, seconds, hasFinished, isActive, startCountdown, resetCountdown }}>
      {children}
    </CountdownContext.Provider>
  );
}
