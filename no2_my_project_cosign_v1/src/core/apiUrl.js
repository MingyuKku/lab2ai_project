let API_URL = 'https://api.cosign.cc';

if(process.env.NODE_ENV === "local") {
    // API_URL = 'http://211.235.236.101:20002'
    API_URL = 'http://localhost:20002';
}

if(location.href.includes("https://qa.cosign.cc")) {
    API_URL = 'https://qa-api.cosign.cc';
}

if(location.href.includes("https://dev.cosign.cc")) {
    API_URL = 'https://dev-api.cosign.cc';
}

export {API_URL}

const CODE_SUCCESS = 1000;
const CODE_NOT_EXISTS = 1001;
const CODE_NO_LOGIN = 1002;

export {CODE_SUCCESS, CODE_NOT_EXISTS, CODE_NO_LOGIN};

Object.defineProperty(Object.prototype, 'getParam', {
    value: function() {
        const params = new URLSearchParams();
        for(var i in this) {
            params.append(i, this[i]);
        }
        return params;
    }
})