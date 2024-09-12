import palette from './palette';

const FLEX = {
  flex: {
    'display': 'flex',
  },
  aline: {
    'display': 'flex',
    'align-items': 'center'
  },
  justify: {
    'display': 'flex',
    'align-items': 'center',
    'justify-content': 'center',
  },
  between: {
    'display': 'flex',
    'align-items': 'center',
    'justify-content': 'space-between',
  },
  around: {
    'display': 'flex',
    'align-items': 'center',
    'justify-content': 'space-around',
  }
}

const BUTTON = {
  'appearance': 'none',
  '-webkit-appearance': 'none',
  'outline': 'none',
  'border': 'none',
  'border-radius': '0.375rem',
  'padding': '12px 16px',
  'background': 'none',
}

const TEXT = {
  pc_text_sm: {
    'font-size': '18px',
    'font-weight': '500',
    'color': palette.text.secondary,
    'line-height': '30px',
  },
  pc_text_md: {
    'font-size': '22px',
    'font-weight': '400',
    'color': palette.text.primary,
    'line-height': '20px',
  },
  pc_text_md_bold: {
    'font-size': '22px',
    'font-weight': '700',
    'color': palette.text.secondary,
    'line-height': '20px',
  },
  pc_text_lg: {
    'font-size': '28px',
    'font-weight': '700',
    'color': palette.text.primary,
    'line-height': '40px',
  },
  pc_title_sm: {
    'font-size': '30px',
    'font-weight': '700',
    'color': palette.text.primary,
    'line-height': '42px',
  },
  pc_title_sm_en: {
    'font-family': "'Pretendard', sans-serif",
    'font-size': '30px',
    'font-weight': '700',
    'color': palette.text.secondary,
    'line-height': '30px',
  },
  pc_title_md: {
    'font-size': '40px',
    'font-weight': '700',
    'color': palette.text.primary,
    'line-height': '57px',
  },
  pc_title_lg_en: {
    'font-family': "'Pretendard', sans-serif",
    'font-size': '44px',
    'font-weight': '700',
    'color': palette.text.primary,
    'line-height': '44px',
  },
  caption_en: {
    'font-family': "'Pretendard', sans-serif",
    'font-size': '14px',
    'font-weight': '500',
    'color': '#fff',
    'line-height': '20px',
  },
  caption_kr: {
    'font-size': '12px',
    'font-weight': '500',
    'color': '#777',
    'line-height': '18px',
  },
  caption2: {
    'font-size': '14px',
    'font-weight': '500',
    'color': '#fff',
    'line-height': '21px',
  },
  // ===================================
  // 모바일 텍스트
  // ===================================
  mo_title_md_kr: {
    'font-size': '18px',
    'font-weight': '500',
    'color': palette.text.primary,
    'line-height': '22px',
  },
  mo_title_md_en: {
    'font-family': "'Pretendard', sans-serif",
    'font-size': '18px',
    'font-weight': '500',
    'color': palette.text.primary,
    'line-height': '25px',
  },
  mo_title_md2_en: {
    'font-family': "'Pretendard', sans-serif",
    'font-size': '21px',
    'font-weight': '700',
    'color': palette.text.primary,
    'line-height': '28px',
  },
  mo_title_md2_kr: {
    'font-size': '20px',
    'font-weight': '700',
    'color': palette.text.primary,
    'line-height': '28px',
  },
  mo_title_md_bold_kr: {
    'font-size': '18px',
    'font-weight': '700',
    'color': '#fff',
    'line-height': '24px',
  },
  mo_text_md: {
    'font-size': '15px',
    'font-weight': '700',
    'color': palette.text.primary,
    'line-height': '21px',
  },
  mo_text_sm: {
    'font-size': '14px',
    'font-weight': '400',
    'color': palette.text.secondary,
    'line-height': '23px',
  },
  mo_text_sm_bold: {
    'font-size': '14px',
    'font-weight': '700',
    'color': palette.text.secondary,
    'line-height': '23px',
  },
  mo_caption_light: {
    'font-size': '12px',
    'font-weight': '400',
    'color': '#777',
    'line-height': '18px',
  },
}

const SHADOW = {
  default: {
    'box-shadow': '0 42px 100px rgba(0,0,0, 0.1)'
  },
} as const;

const global = {
  width: {
    max: '1320px',
    mobile: '1024px',
  },
  height: {
    header: '80px',
  },
  margin: {
    pc: {
      lg: '170px',
      md: '90px',
      sm: '50px',
    },
    mo: {
      lg: '60px',
      md: '40px',
      sm: '20px',
    }
  },
  padding: {
    default: '16px',
    10: '10px',
    12: '12px',
    15: '15px',
  },
  flex: FLEX,
  shadow: SHADOW,
  text: TEXT,
  gradient: 'linear-gradient(93.4deg, #F53B3B 5.87%, #E22D6E 100%)',
} as const;

export {
  global
}