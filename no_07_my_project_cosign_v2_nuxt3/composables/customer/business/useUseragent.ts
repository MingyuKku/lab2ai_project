export const useUseragent = () => {


    const getOsVersion = () => {
        const { userAgent } = useDevice();
        
        if (userAgent.indexOf('Windows NT') !== -1) { // window 운영체제인 경우
            const osRegex = /Windows NT\s([\d.]+)/;
            const match = userAgent.match(osRegex);
            if (match) {
                return `Window ${match[1]}`;
            }

        } else if (userAgent.indexOf('Mac OS X') !== -1) { // Mac 운영체제인 경우
            const osRegex = /Mac OS X\s?([\d_]+)/;
            const match = userAgent.match(osRegex);
            if (match) {
                return `Mac ${match[1].replace(/_/g, '.')}`;
            }

        }

        // 예외 케이스: 예상하지 못한 userAgent
        return `Unknown OS: ${ userAgent }`;
    }

    const getBrowser = () => {
        let { userAgent } = useDevice();
        userAgent = userAgent.toLowerCase();

        let browser = '';
        let version = '';

        // Edge
        if (userAgent.indexOf('edge') > -1 || userAgent.indexOf('edg') > -1) {
            const regex = /(?:edge|edg)[\s\/]([\d.]+)/;
            browser = 'Edge';
            version = userAgent.match(regex)?.[1] ?? '';
        }
        // Opera
        else if (userAgent.indexOf('opera') > -1 || userAgent.indexOf('opr') > -1) {
            const regex = /(?:opera|opr)[\s\/]([\d.]+)/;
            browser = 'Opera';
            version = userAgent.match(regex)?.[1] ?? '';
        }
        // Samsung Internet
        else if (userAgent.indexOf('samsungbrowser') > -1) {
            const regex = /samsungbrowser\/([\d.]+)/;
            browser = 'Samsung Internet';
            version = userAgent.match(regex)?.[1] ?? '';
        }
        // Internet Explorer
        else if (userAgent.indexOf('trident') > -1) {
            browser = 'Internet Explorer';
            const rv = userAgent.indexOf('rv:');
            const regex = /rv:([\d.]+)/;
            version = userAgent.match(regex)?.[1] ?? '';
        }
        // Firefox
        else if (userAgent.indexOf('firefox') > -1) {
            const regex = /firefox\/([\d.]+)/;
            browser = 'Firefox';
            version = userAgent.match(regex)?.[1] ?? '';
        }
        // Chrome
        else if (userAgent.indexOf('chrome') > -1) {
            const regex = /chrome\/([\d.]+)/;
            browser = 'Chrome';
            version = userAgent.match(regex)?.[1] ?? '';
        }
        // Safari
        else if (userAgent.indexOf('safari') > -1) {
            const regex = /version\/([\d.]+)/;
            browser = 'Safari';
            version = userAgent.match(regex)?.[1] ?? '';
            
        } else {
            // 예외 케이스: 예상하지 못한 userAgent
            return `Unknown Browser: ${userAgent}`;
        }

        return `${browser} ${version}`;
    }

    return {
        getOsVersion,
        getBrowser,
    }
}