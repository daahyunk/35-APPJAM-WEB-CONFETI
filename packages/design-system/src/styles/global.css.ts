import { globalStyle, style } from '@vanilla-extract/css';

import { themeVars } from './theme.css';

/* CSS Variables */
globalStyle(':root', {
  vars: {
    '--min-width': '375px',
    '--max-width': '430px',
    '--height': '100dvh',
  },
});

/* HTML & Body Styles */
globalStyle('html, body', {
  ...themeVars.display.flexJustifyAlignCenter,
  position: 'relative',
  width: '100%',
  margin: '0',
  padding: '0',
  fontSize: '62.5%',
  scrollbarWidth: 'none',
  scrollBehavior: 'smooth',
});

/* Scrollbar Hide */
globalStyle('::-webkit-scrollbar', {
  display: 'none',
});

export const rootStyle = style({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  margin: '0 auto',
  minHeight: '100dvh',
  minWidth: 'var(--min-width)',
  maxWidth: 'var(--max-width)',
  backgroundColor: themeVars.color.white,
  ...themeVars.shadowStyles.shadow_global,
});
