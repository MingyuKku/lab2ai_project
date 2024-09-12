/** @type {import('tailwindcss').Config} */
module.exports = {
    mode: 'jit',
    content: [
        './app/**/*.{js,ts,jsx,tsx,mdx}',
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./containers/**/*.{js,ts,jsx,tsx,mdx}',
        './context/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            fontFamily: {
                'noto-sans': ['NotoSansKR', 'sans-serif'],
            },
            colors: {
                'primary': {
                    'blue': '#0351C5',
                    'blue-02': '#00367B',
                    'red': '#FB494C',
                },
                'secondary': {
                    'degree-01': '#D40011',
                    'degree-02': '#FC8AA4',
                    'degree-03': '#EABB09',
                    'degree-04': '#69BEDF',
                    'degree-05': '#007BDC',
                    'degree-light-01': '#FFDBDB',
                    'degree-light-02': '#FFE4D0',
                    'degree-light-03': '#FAEFD8',
                    'degree-light-04': '#D2F4F6',
                    'degree-light-05': '#CEEBFF',
                },
                'achromatic': {
                    'black': '#000',
                    '01': '#222',
                    '02': '#48515C',
                    '03': '#C9C9C9',
                    '04': '#E6E6E6',
                    '05': '#F9F9FA',
                    'white': '#FFFFFF',
                },
            },
            width: {
                desktop: '480px',
            },
            maxWidth: {
                desktop: '480px'
            },
            height: {
                'main-header': '60px',
                'bottom-chat-input': '66px',
                'viewScreen': 'calc(var(--vh,1vh)*100)',
                'viewScreen-header': 'calc(var(--vh,1vh)*100 - 60px)',
            },
            minHeight: {
                'viewScreen': 'calc(var(--vh,1vh)*100)',
                'viewScreen-header': 'calc(var(--vh,1vh)*100 - 60px)',
            },
            padding: {
                'main-header': '60px',
                'side': '36px',
            },
            spacing: {
                'main-header': '60px',
            },
            boxShadow: {
                'blue-01': '0 0px 8px rgba(3, 81, 197, 0.25)',
                '01': '0 8px 20px rgba(0,0,0, 0.32)',
                '02': '0 2px 4px rgba(0,0,0, 0.25)',
                '03': '-12px 16px 20px rgba(0,0,0, 0.34)',
                '04': '0px 1px 2px rgba(0,0,0, 0.3)'
            },
            transitionProperty: {
                'padding': 'padding',
                'background': 'background',
                'shadow': 'box-shadow',
            },
        },
    },
    plugins: [],
}