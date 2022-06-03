import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { createTheme } from '@mui/material';
import { ThemeProvider } from '@mui/styles';

export const parameters = {
  actions: {
    argTypesRegex: '^on.*'
  },
  backgrounds: {
    default: 'dark'
  },
  controls: {
    matchers: {
      color: /color$/i
    }
  },
  docs: {
    source: {
      excludeDecorators: true
    }
  }
};

const muiCache = createCache({
  key: 'mui',
  prepend: true
});
const darkTheme = createTheme({
  palette: {
    mode: 'dark'
  }
});

export const decorators = [
  (Story) => (
    <CacheProvider value={muiCache}>
      <ThemeProvider theme={darkTheme}>
        <Story />
      </ThemeProvider>
    </CacheProvider>
  )
];