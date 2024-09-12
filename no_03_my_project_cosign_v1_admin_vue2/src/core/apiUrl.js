let API_URL = 'https://manager-api.cosign.cc';
// let API_URL = 'https://dev-manager-api.cosign.cc';

if(process.env.NODE_ENV === "local") {
    // API_URL = 'http://211.235.236.101:20002'
    API_URL = 'http://localhost:20007';
}

if(location.href.includes("https://qa-manager.cosign.cc")) {
    API_URL = 'https://qa-manager-api.cosign.cc';
}

if(location.href.includes("https://dev-manager.cosign.cc")) {
    API_URL = 'https://dev-manager-api.cosign.cc';
}

if(location.href.includes("https://green-manager.cosign.cc")) {
    API_URL = 'https://green-manager-api.cosign.cc';
}

export {API_URL}

const CODE_SUCCESS = 1000;
const CODE_NOT_EXISTS = 1001;
const CODE_NO_LOGIN = 1002;

export {CODE_SUCCESS, CODE_NOT_EXISTS, CODE_NO_LOGIN};
