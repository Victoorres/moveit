import { useContext } from 'react';
import { BiAlarm, BiBadgeCheck, BiXCircle } from 'react-icons/bi';
import { CountdownContext } from '../contexts/CountdownContext';
import styles from '../styles/components/Countdown.module.css';

export function Countdown() {
  const { hasFinished, seconds, minutes, isActive, resetCountdown, startCountdown } = useContext(CountdownContext);

  /**
   * Time position variables
   */
  const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');
  const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');

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
