import 'react-app-polyfill/ie11';
import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { CacheProvider } from "@emotion/react";
import createCache from '@emotion/cache';
import ProgressTimer from '../src/ProgressTimer';
import { Box, Button, ButtonGroup, FormControlLabel, Switch, ThemeProvider, Typography } from '@mui/material';
import { ProgressTimerHandle } from '../src/ProgressTimer.types';
import darkTheme from './theme';

const muiCache = createCache({
  key: 'mui',
  prepend: true
});

const App = () => {
  const [started, setStarted] = React.useState(false);
  const ref = React.useRef<ProgressTimerHandle>(null);

  return (
    <CacheProvider value={muiCache}>
      <ThemeProvider theme={darkTheme}>
        <Typography variant="subtitle2" mb={1}>
          Click the progress bar to control the timer
        </Typography>
        <ProgressTimer
          ref={ref}
          started={started}
          color="#1976d2"
          fontColor="rgba(255, 255, 255, 0.85)"
          duration={5}
          label="Label"
        />

        <Box display="flex" flexDirection="column" alignItems="center">
          <Typography variant="subtitle2" mt={4} mb={1}>
            Control Timer with Prop
          </Typography>
          <FormControlLabel
            control={<Switch checked={started} onChange={() => setStarted(!started)} />}
            label="Started"
          />

          <Typography variant="subtitle2" mt={4} mb={1}>
            Control Timer with Ref
          </Typography>
          <ButtonGroup sx={{ marginBottom: 2 }}>
            <Button title="start a stopped timer" onClick={() => ref.current?.start()}>
              Start
            </Button>
            <Button title="stop a running timer" onClick={() => ref.current?.stop()}>
              Stop
            </Button>
            <Button title="restart a running or finished timer" onClick={() => ref.current?.restart()}>
              Restart
            </Button>
          </ButtonGroup>
        </Box>
      </ThemeProvider>
    </CacheProvider>
  );
};

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(<App />);