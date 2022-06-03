export enum Direction {
  Left = 'left',
  Right = 'right'
}

export enum Variant {
  Fill = 'fill',
  Empty = 'empty'
}

export type ProgressTimerHandle = {
  /** starts a stopped timer. */
  start: () => void;
  /** stops a running timer. */
  stop: () => void;
  /** restarts a running or finished timer. */
  restart: () => void;
};

/**
 * Determines if the bar fills or empties
 * as the timer advances.
 *
 * @default 'fill'
 */
type BarVariant = 'empty' | 'fill';

/**
 * The direction the bar grows toward.
 *
 * @default 'right'
 */
type BarDirection = 'left' | 'right';

type ProgressTimerClasses = {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to the progress bar container. */
  progressContainer: string;
  /** Styles applied to the text container. */
  textContainer: string;
  /** Styles applied to the progress bar. */
  progress: string;
  /** Styles applied to the label. */
  label: string;
  /** Styles applied to the time. */
  time: string;
  /** Styles applied when the timer has finished (used for alerting). */
  finished: string;
};

type ProgressTimerProps = {
  /** Direction the bar grows toward. */
  direction?: BarDirection;
  /** Determines if the bar fills or empties. */
  variant?: BarVariant;
  /** Color of the bar; background is same with lower opacity. */
  color?: string;
  /** Color of the label and timer. */
  fontColor?: string;
  /** Duration of the timer in seconds. */
  duration?: number;
  /** Label that describes the timer. */
  label?: string;
  /** Text displayed when timer is inactive (overrides label). */
  buttonText?: string;
  /** Styles applied to the component. */
  classes?: Partial<ProgressTimerClasses>;
  /** Font size of the label and timer. Use to scale progress bar size. */
  fontSize?: string | number;
  /** Whether the timer's duration should be shown when inactive. */
  showDuration?: boolean;
  /** Whether the progress bar's root element should be rounded. */
  rootRounded?: boolean;
  /** Whether the progress bar should be rounded. */
  barRounded?: boolean;
  /** Whether the timer should be started. (true = start, false = stop, null/undefined = await input). */
  started?: boolean | null;
};

export default ProgressTimerProps;
