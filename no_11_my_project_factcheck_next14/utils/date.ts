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
        if (typeof(text) === "string") {
            const seperator: string = text.includes("T")? "T" : " ";
            const halfs = text.split(seperator);
  
            if (halfs.length > 1) {
                const dates = halfs[0].split("-");
                const hours = halfs[1].split(":");
  
                if (hours.length >= 3) {
                    return new Date(parseInt(dates[0]), parseInt(dates[1])-1, parseInt(dates[2]),
                            parseInt(hours[0]), parseInt(hours[1]), parseInt(hours[2]));
                } else {
                    return new Date(parseInt(dates[0]), parseInt(dates[1])-1, parseInt(dates[2]),
                            parseInt(hours[0]), parseInt(hours[1]));
                }            
            } else if (halfs.length === 1) {
                const dates = halfs[0].split("-");
        
                return new Date(parseInt(dates[0]), parseInt(dates[1])-1, parseInt(dates[2]));
            } else {
                return new Date(text);
            }
        } else {
            return new Date(text);
        }
    } catch(err) {
        console.log(err, text);
        return new Date(text);
    }
}

Date.prototype.format = function(f) {
    if (!this.valueOf()) return " ";

    const weekName = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
    const hour = this.getHours() % 12 === 0 ? 12 : this.getHours() % 12;

    return f.replace(/(yyyy|yy|MM|M|dd|d|E|hh|mm|ss|a\/p)/gi, ($1) => {
        switch ($1) {
            case "yyyy": return String(this.getFullYear());
            case "yy": return (this.getFullYear() % 1000).zf(2);
            case "MM": return (this.getMonth() + 1).zf(2);
            case "M": return String(this.getMonth() + 1);
            case "dd": return this.getDate().zf(2);
            case "d": return String(this.getDate());
            case "E": return weekName[this.getDay()];
            case "HH": return this.getHours().zf(2);
            case "hh": return hour.zf(2);
            case "mm": return this.getMinutes().zf(2);
            case "ss": return this.getSeconds().zf(2);
            case "a/p": return this.getHours() < 12 ? "오전" : "오후";
            default: return $1;
        }
    });
}