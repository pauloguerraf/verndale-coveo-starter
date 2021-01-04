// YourTheme.js

import { create } from '@storybook/theming/create';
import verndaleLogo from './logo-verndale.png';

export default create({
  base: 'light',

  colorPrimary: '#e4b048',
  colorSecondary: '#06847b',

  // UI
  appBg: '#ffffff',
  appContentBg: '#ffffff',
  appBorderColor: '#e2ebea',
  appBorderRadius: 0,

  // Typography
  fontBase: '"Open Sans", sans-serif',
  fontCode: 'monospace',

  // Text colors
  textColor: 'black',
  textInverseColor: 'rgba(255,255,255,0.9)',

  // Toolbar default and active colors
  barTextColor: '#4a4a4a',
  barSelectedColor: '#e4b048',
  barBg: '#f5f5f5',

  brandTitle: 'Verndale Digital Styling',
  brandUrl: 'https://www.verndale.com/',
  brandImage: verndaleLogo,
});
