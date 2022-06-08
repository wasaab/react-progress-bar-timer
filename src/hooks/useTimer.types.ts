export type TimerCallbacks = {
  /** Callback fired every 1s while timer is running. */
  onTick?: () => void;
  /** Callback fired when timer finishes. */
  onFinish?: () => void;
};

export interface UseTimerProps extends TimerCallbacks {
  /** Duration of the timer in seconds. */
  duration: number;
}