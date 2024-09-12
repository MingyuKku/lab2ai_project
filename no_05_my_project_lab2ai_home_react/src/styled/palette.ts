// SETUP COLORS
const GREY = {
  0: '#FFFFFF',
  100: '#FAFAFA',
  200: '#F5F5F5',
  300: '#EDEDED',
  400: '#CDCDCD',
  500: '#9B9B9B',
  600: '#737373',
  700: '#3D3D3D',
  800: '#0F172A',
  900: '#000',
} as const;

const RED = {
  default: '#F63E80',
  0: '#E22D6E',
  100: '#F53B3B',
} as const;

const GREEN = {
  default: '#0EB48C',
  0: '#EFFAF7',
  100: '#B2E5D6',
} as const;


const PRIMARY = {
  text: '#0F172A',
  background: '#F9FAFC',
  mainUp: GREEN.default,
  mainDown: '#F33652',
} as const;


const palette = {
  common: { black: '#000', white: '#fff' },
  primary: PRIMARY,
  grey: GREY,
  text: {
    primary: GREY[800],
    secondary: GREY[700],
    lightly: GREY[400],
    point: '#F63E80',
    point2: '#4220A4',
    error: PRIMARY.mainDown,
  },
  background: {
    paper: PRIMARY.background,
    paper2: '#F2F4F9',
    default: GREY[200],
    element: GREY[300],
  },
  border: {
    primary: GREY[400],
  },
  action: {
    // active: GREY[600],
    // hover: alpha(GREY[500], 0.08),
    // selected: alpha(GREY[500], 0.16),
    // disabled: alpha(GREY[500], 0.8),
    // disabledBackground: alpha(GREY[500], 0.24),
    // focus: alpha(GREY[500], 0.24),
    hover: '#F9F9F9',
    hoverOpacity: 0.08,
    disabledOpacity: 0.48,
  },
  screen: {
    desktop: '1320px',
    tablet: '1024px',
    mobile: '720px',
  }
};

export default palette;