import { forwardRef, ForwardedRef, useEffect, useImperativeHandle, useState } from 'react';
import { alpha, Box, ButtonBase, Slide, Typography } from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import { keyframes } from '@emotion/react';
import ProgressTimerProps, { Direction, ProgressTimerHandle, Variant } from './ProgressTimer.types';

const useStyles = makeStyles()({
  root: {
    width: '100%'
  },
  progressContainer: {
    flex: 1,
    position: 'relative',
    overflowX: 'hidden',
    borderRadius: 4
  },
  progress: {
    zIndex: 1,
    inset: 0,
    position: 'absolute',
    transformOrigin: 'left center'
  },
  textContainer: {
    boxSizing: 'border-box',
    position: 'relative',
    height: '4em',
    zIndex: 2,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
    margin: 8,
    overflowY: 'hidden',
    fontWeight: 500
  },
  label: {
    lineHeight: 'normal',
    letterSpacing: '0.0285em',
    fontWeight: 'inherit',
    fontSize: '0.9em',
    transition: 'transform 300ms cubic-bezier(0, 0, 0.2, 1) 0ms'
  },
  time: {
    fontWeight: 'inherit',
    fontSize: '2em',
    lineHeight: 1
  },
  finished: {
    animation: `${keyframes`
      0% {
        opacity: 0.8;
        background-color: orangered;
      }
      `} 1s 5`
  }
});

const padTime = (num: number) => `${num}`.padStart(2, '0');
const getRadius = (rounded: boolean) => (rounded ? 4 : 0);

const ProgressTimer = forwardRef<ProgressTimerHandle, ProgressTimerProps>(({
  direction = Direction.Right,
  variant = Variant.Fill,
  color = 'rgb(255, 165, 0)',
  fontColor = '#212121',
  duration = 60,
  label = '',
  buttonText = '',
  classes = {},
  fontSize,
  showDuration = false,
  rootRounded = true,
  barRounded = false,
  started
}: ProgressTimerProps, ref: ForwardedRef<ProgressTimerHandle>) => {
  const { classes: styles, cx } = useStyles();
  const [time, setTime] = useState(duration);
  const [timer, setTimer] = useState<ReturnType<typeof setInterval>>();
  const isRunning = Boolean(timer && time);

  /**
   * Starts a stopped timer.
   */
  const startTimer = () => {
    setTime(duration);

    const timer = setInterval(() => {
      setTime((prevTime) => {
        const updatedTime = --prevTime;

        if (!updatedTime) {
          clearInterval(timer);
        }

        return updatedTime;
      });
    }, 1000);

    setTimer(timer);
  };

  /**
   * Stops a running timer.
   */
  const stopTimer = () => {
    clearInterval(timer);
    setTimer(undefined);
  };

  /**
   * Restarts a running or finished timer.
   */
  const restartTimer = () => {
    setTime(0);
    stopTimer();
  };

  /**
   * Controls timer via functions instead of "started" prop.
   */
  useImperativeHandle(ref, () => ({
    start: startTimer,
    stop: stopTimer,
    restart: restartTimer
  }));

  /**
   * Formats the time to mm:ss.
   *
   * @returns {string} the formatted time
   */
  const formatTime = () => `${padTime(Math.floor(time / 60))}:${padTime(time % 60)}`;

  /**
   * Gets the sign of the css translation that
   * determines if the bar moves left or right.
   *
   * @returns {string} the sign
   */
  const getSign = () => {
    const negativeDirection = timer ? Direction.Left : Direction.Right;

    return direction === negativeDirection ? '-' : '';
  };

  /**
   * Builds the progress transformation used
   * to move the progress bar left or right.
   *
   * @returns {string} the x translation css
   */
  const buildProgressTransformation = () => {
    const xPercentage = Boolean(timer) === (variant === Variant.Fill) ? '0%' : '100%';

    return `translateX(${getSign()}${xPercentage})`;
  };

  /**
   * Restarts the timer if time is 0.
   * This allows the bar to reset visually prior to restarting.
   */
  const handleRestart = () => {
    if (time) { return; }

    startTimer();
  };

  /**
   * Controls timer via "started" prop.
   */
  const handleStartedChange = () => {
    if (started == null) { return; }

    if (started) {
      if (timer) {
        restartTimer();
      } else {
        startTimer();
      }
    } else {
      stopTimer();
    }
  };

  useEffect(handleRestart, [timer]);
  useEffect(handleStartedChange, [started]);

  return (
    <ButtonBase
      className={cx(styles.root, classes.root)}
      style={{ borderRadius: getRadius(rootRounded) }}
      onClick={timer ? stopTimer : startTimer}
    >
      <div
        className={cx(
          styles.progressContainer,
          classes.progressContainer,
          { [cx(styles.finished, classes.finished)]: !time && variant === Variant.Empty }
        )}
        style={{
          borderRadius: getRadius(rootRounded),
          backgroundColor: alpha(color, 0.4)
        }}
      >
        <Box
          className={cx(styles.textContainer, classes.textContainer)}
          fontSize={fontSize}
          color={fontColor}
        >
          {(label || (buttonText && !timer) || !time) && (
            <Typography
              className={cx(styles.label, classes.label)}
              sx={{
                transform: isRunning || showDuration ? undefined : 'scale(1.86)',
              }}
            >
              {!isRunning && buttonText ? buttonText : label}
            </Typography>
          )}
          <Slide
            direction="up"
            timeout={{ enter: 100, exit: 70 }}
            in={showDuration || isRunning}
            mountOnEnter
            unmountOnExit
          >
            <Typography className={cx(styles.time, classes.time)}>
              {formatTime()}
            </Typography>
          </Slide>
        </Box>
        <span
          className={cx(
            styles.progress,
            classes.progress,
            { [cx(styles.finished, classes.finished)]: !time && variant === Variant.Fill }
          )}
          style={{
            backgroundColor: color,
            borderRadius: getRadius(barRounded),
            transform: buildProgressTransformation(),
            transition: timer ? `transform ${duration}s linear 0s` : undefined
          }}
        />
      </div>
    </ButtonBase>
  );
});

export default ProgressTimer;
