import React from 'react';
import OneDark from './one-dark';
import OneLight from './one-light';

const getTheme = (themeName) => {
  switch(themeName){
    case 'oneLight': {
      return OneLight;
    }
    default: {
      return OneDark;
    }
  }
};

const ThemeContext = React.createContext({
  theme: 'oneDark',
  setTheme: () => {},
});

export {
  getTheme,
  ThemeContext
}