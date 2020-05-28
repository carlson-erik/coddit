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
}

export {
  getTheme,
  OneDark,
  OneLight
}