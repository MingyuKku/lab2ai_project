Object.getParams = function(obj: Record<string, any>): URLSearchParams {
    const params = new URLSearchParams();
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            params.append(key, obj[key]);
        }
    }

    return params;
}