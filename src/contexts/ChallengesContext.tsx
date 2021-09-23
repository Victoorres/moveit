import { createContext, ReactNode, useEffect, useState } from 'react';
import challenges from '../../challenges.json';
import Cookies from 'js-cookie';

interface Challenge {
  amount: number;
  description: string;
  type: 'body' | 'eye';
}

interface ChallengesContextData {
  level: number;
  levelUp: () => void;
  currentExperience: number;
  activeChallenge: Challenge;
  resetChallenge: () => void;
  challengesCompleted: number;
  completeChallenge: () => void;
  startNewChallenge: () => void;
  experienceToNextLevel: number;
}

interface ChallengesProviderProps {
  level: number;
  children: ReactNode;
  currentExperience: number;
  challengesCompleted: number;
}

export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({ children, ...rest }: ChallengesProviderProps) {
  /**
   * States
   */
  const [level, setLevel] = useState(rest.level ?? 1);
  const [activeChallenge, setActiveChallenge] = useState(null);
  const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0);
  const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted ?? 0);

  /**
   * Constants
   */
  const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

  /**
   * Effects
   */
  useEffect(() => {
    Notification.requestPermission();
  }, []);

  useEffect(() => {
    Cookies.set('level', level.toString());
    Cookies.set('currentExperience', currentExperience.toString());
    Cookies.set('challengesCompleted', challengesCompleted.toString());
  }, [level, currentExperience, challengesCompleted]);

  /**
   * Functions
   */
  function levelUp() {
    setLevel(level + 1);
  }

  function startNewChallenge(): void {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randomChallengeIndex];

    setActiveChallenge(challenge);

    new Audio('/notification.mp3').play();

    if (Notification.permission === 'granted') {
      new Notification('Novo desafio', {
        body: `Valendo ${challenge.amount} xp`,
      });
    }
  }

  function resetChallenge(): void {
    setActiveChallenge(null);
  }

  function completeChallenge(): void {
    if (!activeChallenge) {
      return;
    }

    const { amount } = activeChallenge;

    let finalExperience = currentExperience + amount;

    if (finalExperience >= experienceToNextLevel) {
      finalExperience = finalExperience - experienceToNextLevel;
      levelUp();
    }

    setActiveChallenge(null);
    setCurrentExperience(finalExperience);
    setChallengesCompleted(challengesCompleted + 1);
  }

  return (
    <ChallengesContext.Provider
      value={{
        level,
        currentExperience,
        challengesCompleted,
        levelUp,
        startNewChallenge,
        activeChallenge,
        resetChallenge,
        experienceToNextLevel,
        completeChallenge,
      }}
    >
      {children}
    </ChallengesContext.Provider>
  );
}
