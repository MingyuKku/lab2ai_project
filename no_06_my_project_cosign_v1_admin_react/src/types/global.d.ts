export {};

declare global { 
    interface DateConstructor {
        parseUtcText: (text: string) => Date;
        toUtcText:  (text: string | Date) => Date;
        diffNow: () => string;
    }

    interface Object {
        getParams: (obj: object) => object;
    }
}



Date.parseUtcText = function(text) {
    const date = Date.parseText(text);
  
    const timestamp = date.getTime() + (date.getTimezoneOffset() * -60 * 1000);
  
    return new Date(timestamp);
}

Date.toUtcText = function(text) {
    const date = Date.parseText(text);

    const timestamp = date.getTime() + (date.getTimezoneOffset() * 60 * 1000);

    return new Date(timestamp);
}

Date.parseText = function(text) {
    try {
        if(typeof(text) === "string") {
            const seperator: string = text.includes("T")? "T" : " ";
            const halfs = text.split(seperator);
  
            if(halfs.length > 1) {
                const dates = halfs[0].split("-");
                const hours = halfs[1].split(":");
  
                if(hours.length >= 3) {
                    return new Date(parseInt(dates[0]), parseInt(dates[1])-1, parseInt(dates[2]),
                            parseInt(hours[0]), parseInt(hours[1]), parseInt(hours[2]));
                } else {
                    return new Date(parseInt(dates[0]), parseInt(dates[1])-1, parseInt(dates[2]),
                            parseInt(hours[0]), parseInt(hours[1]));
                }            
            } else if(halfs.length === 1) {
                const dates = halfs[0].split("-");
        
                return new Date(parseInt(dates[0]), parseInt(dates[1])-1, parseInt(dates[2]));
            } else {
                return new Date(text);
            }
        } else {
            // console.trace("parseText", text, typeof(text));
            return new Date(text);
        }
    } catch(err) {
        console.log(err, text);
    }
}



Date.diffNow = function() {
    if (!this.valueOf()) return " ";

    const now = new Date();

    const seconds = (now.getTime() - (this as Date).getTime()) / 1000;

    if (seconds / (24*60*60) >= 1) {
        return this.format('yyyy.MM.dd');
    } else if(seconds / (60*60) >= 1) {
        return `${Math.floor(seconds / (60*60))}시간 전`
    } else if(seconds / 60 >= 1) {
        return `${Math.floor(seconds / (60))}분 전`
    } else {
        return `방금`
    }
}



Object.getParams = function (obj:object): object {
    const params = new URLSearchParams();
    for(let key in obj) {
        params.append(key, obj[key])
    }
    return params;
}