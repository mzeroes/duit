import { DefaultTheme } from 'react-native-paper';
import { Theme } from './constants';
import styles from './styles';

export {
  Theme,
  styles
};

export const papertheme = {
  ...DefaultTheme,
  roundness: 4,
  dark: true,
  colors: {
    ...DefaultTheme.colors,
    primary: Theme.overlay,
    accent: Theme.dark,
    background: Theme.surface,
    surface: Theme.surface,
    text: Theme.text,
    error: Theme.red,
    disabled: Theme.disabled,
    placeholder: Theme.placeholder,
    backdrop: Theme.background
  }
};
