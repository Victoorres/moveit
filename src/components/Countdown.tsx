import { BiAlarm, BiBadgeCheck, BiXCircle } from 'react-icons/bi';
import styles from '../styles/components/Countdown.module.css';
import { useState, useEffect } from 'react';

let countdownTimeout: NodeJS.Timeout;

export function Countdown() {
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
   * Time position variables
   */
  const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');
  const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');

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
    setIsActive(false);
    setTime(1500);
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
