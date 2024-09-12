/** @type {import('tailwindcss').Config} */
module.exports = {
    mode: 'jit',
    content: [
        "./src/**/*.{js,jsx,ts,tsx}", // src 하위 파일 중 확장자가 .js,.jsx,.ts,.tsx인 파일을 대상으로 한다는 의미
    ],
    theme: {
        extend: {
            screens: {
                'sm': {'max': '480px'},
                'md': {'min': '480px', 'max': '768px'},
                'lg': {'min': '768px'},
                'max-460': {'max': '460px'},
                'max-360': {'max': '360px'},
                'max-400': {'max': '400px'}
            },
            fontFamily: {
                'spoqa': ['SpoqaHanSansNeo', 'sans-serif'],
            },
            colors: {
                'price': {
                    'profit': '#00B287'
                },
                'system': {
                    'mint': '#37CCA4',
                    'green': '#1ED470'
                },
                'p&l': {
                    'profit-01': '#37CCA4',
                    'profit-02': '#00AF85',
                },
                'position': {
                    'long': '#00B287',
                    'long-goal-1': '#61CBB1',
                    'long-goal-2': '#00B287',
                    'long-goal-3': '#22866E',
                    'short': '#F3475D',
                    'short-goal-1': '#FFA4A7',
                    'short-goal-2': '#F67789',
                    'short-goal-3': '#F3475D',
                    'stop-price': '#C8835C',
                },
                'font': {
                    'black': '#000000',
                    'dark-01': '#4B5058',
                    'dark-02': '#707A8A',
                    'dark-03': '#929AA5',
                    'dark-04': '#E5E8EB',
                    'white': '#FFFFFF'
                },
                'bg': {
                    'black': '#000000',
                    'dark-03': '#929AA5',
                    'dark-04': '#48515F',
                    'gray-01': '#D7DADE',
                    'gray-02': '#E5E8EB',
                    'gray-03': '#EFF2F5',
                    'gray-04': '#F4F6F9',
                    'gray-05': '#F9F9FB',
                    'green': '#E2FEEA',
                    'white': '#FFFFFF',
                },
                'border': {
                    'black': '#000000',
                    'dark-01': '#4B5058',
                    'dark-02': '#707A8A',
                    'dark-03': '#929AA5',
                    'gray-01': '#BCBEC2',
                    'gray-02': '#D2D4D8',
                    'gray-03': '#D9DCE1',
                    'gray-04': '#E5E8EB',
                    'gray-05': '#EFF1F2',
                    'white': '#FFFFFF',
                },
                'button': {
                    'default': '#F55D07',
                    'press': '#C44A06',
                    'disable': '#E6E0DC',
                },
            },
            backgroundImage: {
                'cosign-gra': 'linear-gradient(0deg, #DF2A9D, #F23A61, #F95C36)',
                'profit-green-gra': 'linear-gradient(180deg, #47E18D -1.39%, #1ED470 98.61%)',
                'position-long-gra': 'linear-gradient(90deg, #00A075 1.81%, #4ADC8C)',
                'position-short-gra': 'linear-gradient(90deg, #F33652 1.81%, #FF88A5)',
                'nav-sign-gra': 'linear-gradient(0deg, #DF2A9D -2.69%, #F23A61 49.17%, #F95C36)',
                'free-sign-gra': 'linear-gradient(90deg, #DF2A9D -2.69%, #F23A61 49.17%, #F95C36)',
                'free-sign-gra2': 'linear-gradient(90deg, #FD626B, #F14C98)',
                'button': 'linear-gradient(90deg, #E12C95 0%, #F53B57 20%, #FF9900 40%, #E12C95 60%, #F53B57 80%, #FF9900 100%);'
            },
            letterSpacing: {
                'basic': '-1%'
            },
            lineHeight: {
                'basic': '1.6em'
            },
            width: {
                'desktop': '420px',
                'crypto-sm': '16px',
                'crypto-md': '24px',
                'crypto-lg': '38px',
                'model-sm': '24px',
                'model-md': '40px',
                'model-lg': '68px',
            },
            maxWidth: {
                'desktop': '420px',
            },
            height: {
                'viewScreen': 'calc(var(--vh,1vh)*100)',
                'viewScreen-header': 'calc(var(--vh,1vh)*100 - 76px)',
                'viewScreen-header-nav': 'calc(var(--vh,1vh)*100 - 76px - 60px)',
                'viewScreen+1': 'calc(var(--vh,1vh)*100 + 1px)',
                'app-header': '76px',
                'main-nav': '60px',
                'crypto-sm': '16px',
                'crypto-md': '24px',
                'crypto-lg': '38px',
                'model-sm': '24px',
                'model-md': '40px',
                'model-lg': '68px',
            },
            minHeight: {
                'viewScreen': 'calc(var(--vh,1vh)*100)',
                'viewScreen-header': 'calc(var(--vh,1vh)*100 - 76px)',
                'viewScreen-header-nav': 'calc(var(--vh,1vh)*100 - 76px - 60px)',
                'viewScreen+1': 'calc(var(--vh,1vh)*100 + 1px)',
            },
            padding: {
                'primary': '16px',
                'app-header': '76px',
                'main-nav': '60px',
                'space-top-lg': '20px',
                'space-top-md': '16px',
                'space-top-sm': '12px',
                'space-bottom-lg': '25px',
                'space-bottom-md': '20px',
                'space-bottom-sm': '15px',
                'space-between-y-lg': '20px',
                'space-between-y-md': '16px',
                'space-between-y-sm': '12px',
                'space-between-y-ssm': '8px',
                'space-between-y-xs': '4px',
                'space-page-bottom': '60px',
            },
            spacing: {
                'primary': '16px',
                'app-header': '76px',
                'main-nav': '60px',
                'space-top-lg': '20px',
                'space-top-md': '16px',
                'space-top-sm': '12px',
                'space-bottom-lg': '25px',
                'space-bottom-md': '20px',
                'space-bottom-sm': '15px',
                'space-between-y-lg': '20px',
                'space-between-y-md': '16px',
                'space-between-y-sm': '12px',
                'space-between-y-ssm': '8px',
                'space-between-y-xs': '4px',
                'space-page-bottom': '60px',
            },
            inset: {
                'app-header': '76px',
                'lang-header': '100px',
            },
            boxShadow: {
                '01': '0 3px 8px rgba(0,0,0, 0.08)',
                '02': '0 4px 12px rgba(0,0,0, 0.16)',
                '03': '0 1px 1px rgba(0,0,0, 0.2)',
                '04': '0 1px 2px rgba(0,0,0, 0.2)',
                '09': '0 12px 24px rgba(0,0,0, 0.3)',
                'news-card': '0 0 10px rgba(0,0,0, 0.2)',
                'news-card-2': '0 1px 11px #eee',
                'news-item-1': '0 1px 11px rgba(55, 184, 255, 0.13)',
                'news-item-2': '0 1px 11px rgba(112, 94, 85, 0.13)',
                'light-01': '0 4px 4px rgba(221, 221, 221, 0.5)',
                'chat': '0 0 10px rgba(0,0,0,0.04)',
                'toast': '0 3px 6px rgba(0,0,0,0.25)',
                'border-1': '0 0 0 4px rgba(243, 71, 93, 0.25)'
            },
            dropShadow: {
                'default': '0 1px 1px rgba(0,0,0, 0.3)'
            },
            transitionProperty: {
                'opacity-transform': 'opacity, transform',
                'background': 'background',
                'border': 'border',
                'border-shadow': 'border, box-shadow',
            },
            transitionDuration: {
                'primary': '400ms',
            },
            transitionTimingFunction: {
                'primary': 'cubic-bezier(0.33, 1, 0.68, 1)',
                'second': 'cubic-bezier(0.33, 1.25, 0.55, 1)'
            },
            animation: {
                'rotate-loader': 'rotation 0.6s linear infinite',
            },
            keyframes: {
                'rotation': {
                    '0%': { transform: 'rotate(0deg)' },
                    '100%': { transform: 'rotate(360deg)' },
                }
            }
        },
    },
    plugins: [

    ],
}