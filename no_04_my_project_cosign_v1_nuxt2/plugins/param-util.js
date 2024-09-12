Object.defineProperty(Object.prototype, 'getParam', {
    value: function() {
        const params = new URLSearchParams();
        for(var i in this) {
            params.append(i, this[i]);
        }
        return params;
    }
})

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';