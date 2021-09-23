import { BiAlarm, BiBadgeCheck, BiXCircle } from 'react-icons/bi';
import styles from '../styles/components/Countdown.module.css';
import { useState, useEffect } from 'react';

let countdownTimeout: NodeJS.Timeout;

export function Countdown() {
  const [time, setTime] = useState(2);
  const [isActive, setIsActive] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');

  const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');

  function startCountdown(): void {
    setIsActive(true);
  }

  function resetCountdown(): void {
    clearTimeout(countdownTimeout);
    setIsActive(false);
    setTime(1500);
  }

  useEffect(() => {
    if (isActive && time > 0) {
      countdownTimeout = setTimeout(() => {
        setTime(time - 1);
      }, 1000);
    } else if (isActive && time === 0) {
      setHasFinished(true);
      setIsActive(false);
    }
  }, [isActive, time]);

  return (
    <div>
      <div className={styles.countdownContainer}>
        <div>
          <span>{minuteLeft}</span>
          <span>{minuteRight}</span>
        </div>
        <span>:</span>
        <div>
          <span>{secondLeft}</span>
          <span>{secondRight}</span>
        </div>
      </div>

      {hasFinished ? (
        <button disabled className={styles.countdownButton}>
          Ciclo encerrado{' '}
          <i className={`${styles.countdownIcon} ${styles.countdownIconFinished}`}>
            <BiBadgeCheck color="var(--green)" />
          </i>
        </button>
      ) : (
        <>
          {isActive ? (
            /** BOTÃO ABANDONAR CICLO */ <button
              type="button"
              onClick={resetCountdown}
              className={`${styles.countdownButton} ${styles.countdownButtonActive}`}
            >
              Abandonar ciclo
              <i className={`${styles.countdownIcon} ${styles.countdownIconActive}`}>
                <BiXCircle />
              </i>
            </button>
          ) : (
            /** BOTÃO INICIAR CICLO */
            <button type="button" className={styles.countdownButton} onClick={startCountdown}>
              Iniciar ciclo
              <i className={`${styles.countdownIcon} ${styles.countdownIconActive}`}>
                <BiAlarm size="1.5rem" style={{ color: 'var(--white)' }} />
              </i>
            </button>
          )}
        </>
      )}
    </div>
  );
}
