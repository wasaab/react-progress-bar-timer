import { forwardRef, ForwardedRef, useEffect, useImperativeHandle } from 'react';
import { alpha, Box, ButtonBase, Slide, Typography } from '@mui/material';
import { blue } from '@mui/material/colors';
import { makeStyles } from 'tss-react/mui';
import { keyframes } from '@emotion/react';
import {
  type ProgressTimerProps,
  type ProgressTimerHandle,
  Direction,
  Variant
} from './ProgressTimer.types';
import useTimer from '../hooks';

const getRadius = (rounded: boolean) => (rounded ? 4 : 0);

const useStyles = makeStyles<{ color: string, rootRounded: boolean, barRounded: boolean }>()(
  (_theme, { color, rootRounded, barRounded }) => ({
    root: {
      width: '100%',
      borderRadius: getRadius(rootRounded)
    },
    progressContainer: {
      flex: 1,
      position: 'relative',
      overflowX: 'hidden',
      borderRadius: getRadius(rootRounded),
      backgroundColor: alpha(color, 0.4)
    },
    progress: {
      zIndex: 1,
      inset: 0,
      position: 'absolute',
      transformOrigin: 'left center',
      backgroundColor: color,
      borderRadius: getRadius(barRounded),
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
  })
);

const padTime = (num: number) => `${num}`.padStart(2, '0');

const ProgressTimer = forwardRef<ProgressTimerHandle, ProgressTimerProps>(({
  direction = Direction.Right,
  variant = Variant.Fill,
  color = blue[700],
  fontColor = '#ffffffd9',
  duration = 60,
  label = '',
  buttonText = '',
  classes = {},
  fontSize,
  showDuration = false,
  rootRounded = true,
  barRounded = false,
  started,
  onFinish = () => {}
}: ProgressTimerProps, ref: ForwardedRef<ProgressTimerHandle>) => {
  const { classes: styles, cx } = useStyles({ color, rootRounded, barRounded }, { props: { classes } });
  const { time, timer, isRunning, start, stop, restart } = useTimer({
    duration,
    onFinish: () => onFinish(label || buttonText)
  });

  /**
   * Controls timer via functions instead of "started" prop.
   */
  useImperativeHandle(ref, () => ({ start, stop, restart }));

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
   * Controls timer via "started" prop.
   */
  const handleStartedChange = () => {
    if (started == null) { return; }

    if (started) {
      if (timer) {
        restart();
      } else {
        start();
      }
    } else {
      stop();
    }
  };

  useEffect(handleStartedChange, [started]);

  return (
    <ButtonBase
      className={styles.root}
      onClick={timer ? stop : start}
      aria-label={label}
    >
      <div
        className={cx(
          styles.progressContainer,
          { [styles.finished]: !time && variant === Variant.Empty }
        )}
      >
        <Box
          className={styles.textContainer}
          fontSize={fontSize}
          color={fontColor}
        >
          {(label || (buttonText && !timer) || !time) && (
            <Typography
              className={styles.label}
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
            <Typography className={styles.time}>
              {formatTime()}
            </Typography>
          </Slide>
        </Box>
        <span
          className={cx(
            styles.progress,
            { [styles.finished]: !time && variant === Variant.Fill }
          )}
          style={{
            transform: buildProgressTransformation(),
            transition: timer ? `transform ${duration}s linear 0s` : undefined
          }}
        />
      </div>
    </ButtonBase>
  );
});

export default ProgressTimer;
