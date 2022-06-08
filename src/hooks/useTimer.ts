import { useEffect, useRef, useState } from 'react';
import type { UseTimerProps, TimerCallbacks } from './useTimer.types';

const useTimer = ({
  duration,
  onTick = () => {},
  onFinish = () => {}
}: UseTimerProps) => {
  const [time, setTime] = useState(duration);
  const [timer, setTimer] = useState<ReturnType<typeof setInterval>>();
  const isRunning = Boolean(timer && time);
  const callbackRef = useRef<TimerCallbacks>();

  /**
   * Update callback ref on changes to callback props
   * to allow changes to reflect within setInterval's callback.
   */
  useEffect(() => {
    callbackRef.current = { onTick, onFinish };
  }, [onTick, onFinish]);

  /**
   * Starts a stopped timer.
   */
  const start = () => {
    setTime(duration);

    const timer = setInterval(() => {
      callbackRef.current?.onTick?.();

      setTime((prevTime) => {
        const updatedTime = prevTime - 1;

        if (!updatedTime) {
          clearInterval(timer);
          callbackRef.current?.onFinish?.();
        }

        return updatedTime;
      });
    }, 1000);

    setTimer(timer);
  };

  /**
   * Stops a running timer.
   */
  const stop = () => {
    clearInterval(timer);
    setTimer(undefined);
  };

  /**
   * Restarts a running or finished timer.
   */
  const restart = () => {
    setTime(0);
    stop();
  };

  /**
   * Restarts the timer if time is 0.
   * This allows UI to reset visually prior to restarting.
   */
  const handleRestart = () => {
    if (time) { return; }

    start();
  };

  useEffect(handleRestart, [timer]);

  /**
   * Cleanup by clearing interval on unmount.
   */
  useEffect(() => () => clearInterval(timer), []);

  return { time, timer, isRunning, start, stop, restart };
};

export default useTimer;