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
            const halfs = text.split("T");

            if(halfs.length > 1) {
                const dates = halfs[0].split("-");
                const hours = halfs[1].split(":");

                if(hours >= 3) {
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

// 시간을 UTC 시간 형식으로(yyyy-MM-ddTHH:mm:ssZ) 바뀌주는 함수
Date.getUtcText = (time) => {
    if(time.search('T') < 0) time = time.replace(/\s/g,'T') + 'Z';
    else {
        if(time.search('Z') < 0) time = time + 'Z';
    }
    return time;
}


Date.prototype.format = function(f) {
    if (!this.valueOf()) return " ";
 
    var weekName = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
    var d = this;
    const h = d.getHours() % 12;
     
    return f.replace(/(yyyy|yy|MM|M|dd|d|E|hh|mm|ss|a\/p)/gi, function($1) {
        switch ($1) {
            case "yyyy": return d.getFullYear();
            case "yy": return (d.getFullYear() % 1000).zf(2);
            case "MM": return (d.getMonth() + 1).zf(2);
            case "M": return (d.getMonth() + 1);
            case "dd": return d.getDate().zf(2);
            case "d": return d.getDate();
            case "E": return weekName[d.getDay()];
            case "HH": return d.getHours().zf(2);
            case "hh": return h.zf(2);
            case "mm": return d.getMinutes().zf(2);
            case "ss": return d.getSeconds().zf(2);
            case "a/p": return d.getHours() < 12 ? "오전" : "오후";
            default: return $1;
        }
    });
};

Date.prototype.diffNow = function() {
    if (!this.valueOf()) return " ";

    const now = new Date();
    
    const seconds = (now - this) / 1000;

    if(seconds / (24*60*60) >= 1) {
        return `${Math.floor(seconds / (24*60*60))}일 전`
    } else if(seconds / (60*60) >= 1) {
        return `${Math.floor(seconds / (60*60))}시간 전`
    } else if(seconds / 60 >= 1) {
        return `${Math.floor(seconds / (60))}분 전`
    } else {
        return `방금 전`
    }
}

Date.prototype.getRemainTime = function() {
    if (!this.valueOf()) return " ";

    const now = new Date();

    const totalSeconds = (this - now) / 1000;
    const seconds = Math.floor((this - now) / 1000 % 60);
    const minutes = Math.floor((totalSeconds / 60) % 60);
    const hour = Math.floor(totalSeconds / 60 / 60);

    let resultTexts = [];

    if(hour > 0) {
        resultTexts.push(`${hour.toTwoInt()}시간`);
    }
    if(hour > 0 || minutes > 0) {
        resultTexts.push(`${minutes.toTwoInt()}분`);
    }
    if(hour > 0 || minutes > 0 || seconds > 0) {
        resultTexts.push(`${seconds.toTwoInt()}초`);
    }

    if(seconds >= 0) {
        return resultTexts.join(" ");
    } else {
        return null;
    }
}

Date.prototype.addDate = function (interval, units) {
    let ret = new Date(this);
    var checkRollover = function() { if(ret.getDate() != this.getDate()) ret.setDate(0);};

    switch(String(interval).toLowerCase()) {
        case 'year'   :  ret.setFullYear(ret.getFullYear() + units); checkRollover();  break;
        case 'quarter':  ret.setMonth(ret.getMonth() + 3*units); checkRollover();  break;
        case 'month'  :  ret.setMonth(ret.getMonth() + units); checkRollover();  break;
        case 'week'   :  ret.setDate(ret.getDate() + 7*units);  break;
        case 'day'    :  ret.setDate(ret.getDate() + units);  break;
        case 'hour'   :  ret.setTime(ret.getTime() + units*3600000);  break;
        case 'minute' :  ret.setTime(ret.getTime() + units*60000);  break;
        case 'second' :  ret.setTime(ret.getTime() + units*1000);  break;
        default       :  ret = undefined;  break;
      }
      return ret;
}

Date.prototype.defaultFormat = function() {
    if (!this.valueOf()) return " ";

    const now = new Date();

    if(now.format("yyyy-MM-dd") === this.format("yyyy-MM-dd")) {
        return this.format("HH:mm:ss");
    } else {
        return this.format("yyyy-MM-dd HH:mm:ss");
    }

}
 
String.prototype.string = function(len){var s = '', i = 0; while (i++ < len) { s += this; } return s;};
String.prototype.zf = function(len){return "0".string(len - this.length) + this;};
Number.prototype.zf = function(len){return this.toString().zf(len);};

Number.prototype.toTwoInt = function() {
    return (this < 10? '0': '') + this;
}
