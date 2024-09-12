import type dayjs from "#build/dayjs.imports.mjs";
import type { EInterval } from "~/composables/_tv-tech-chart/_types";
import type { GoogleLoginResponse } from "~/composables/user/sign-in/business/_types";
import { getMinuteValueByInterval } from "~/composables/_tv-tech-chart/common";
import { useTimezoneCookies } from "~/composables/useCookie/timezone";

export {}

declare global {
    interface Window {
        Datafeeds: any;
        social: SocialHelper
    }

    interface SocialHelper {
        google: {
            login: (accessToken: string) => void;
            signup: (loginResponse: GoogleLoginResponse) => void;
            merge: (loginResponse: GoogleLoginResponse) => void;
        }
    }
    interface DateConstructor {
        // parseUtcToLocal: (text: string) => dayjs.Dayjs;
        // parseUtcToLocal: (text: string) => Date | null;
        parseUtcToLocal: (text: string) => Date;
        parseUtcText: (text: string) => Date;
        parseText: (text: string) => Date;
        isoFormat: (text: string) => string;
    }


    interface Date {
        format(text: string): string;
        diffNow(): string;
        getUtcTsSeconds: () => number;
        getTsSeconds: () => number;
        plusCandle: (candleCount: number, interval: EInterval) => Date;
    }

    interface String {
        string(len:number):string;
        zf(len:number):string;
        truncateDecimal(unit: number): number;
        reverseSubString(start: number, end?: number): string;
        
    }

    interface StringConstructor {
        normalizeWhitespace: (text: string) => string;
    }
    
    interface Number {
        zf(len:number):string;
        toTwoInt():string;
        truncateDecimal(unit: number): number;
        validateMinText(): string;
        tsFormat(): string;
    }

    interface Object {
        getParams(obj:Record<string, any>): URLSearchParams;
    }
}

export default defineNuxtPlugin(() => {
    const { $dayjs } = useNuxtApp();
    const { getCookie_timezone } = useTimezoneCookies();
    const timezoneCookie = getCookie_timezone();

    Date.parseUtcToLocal = function(text) {
        if (!timezoneCookie.value) {
            const localDate = $dayjs.utc(text).local().toDate();
            return localDate;
        }

        const tzDate = $dayjs.utc(text).tz(timezoneCookie.value).toDate();
        return tzDate;
    }

    Date.parseUtcText = function(text) {
        const date = Date.parseText(text);
    
        if (date !== undefined) {
            const timestamp = date.getTime() + (date.getTimezoneOffset() * -60 * 1000);
            return new Date(timestamp);
        }
        return date;
    }
    
    Date.parseText = function(text:string): Date {
        try {
            if (typeof(text) === "string") {
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
                return new Date(text);
            }
        } catch(err) {
            console.log(err, text);
            return new Date(text);
        }
    }
    
    Date.isoFormat = function(text: string): string {
        // 날짜와 시간 사이에 'T'가 있는지 검사하고 없으면 추가
        if (!text.includes('T')) {
            text = text.replace(' ', 'T');
        }

        // 문자열 끝에 'Z'가 있는지 검사하고 없으면 추가
        if (!text.endsWith('Z')) {
            text += 'Z';
        }

        return text;
    }

    Date.prototype.plusCandle = function(candleCount: number, interval: EInterval) {
        const timestamp = this.getTime() + (this.getTimezoneOffset() * -60 * 1000);
        const intervalMs = getMinuteValueByInterval(interval) * candleCount * 60 * 1000;

        return new Date(timestamp + intervalMs);
    }
    
    Date.prototype.getUtcTsSeconds = function() {
        const timestamp = this.getTime() + (this.getTimezoneOffset() * -60 * 1000);

        return Math.floor(timestamp / 1000);
    }
    
    Date.prototype.getTsSeconds = function() {
        return Math.floor(this.getTime() / 1000);
    }
    
    Date.prototype.format = function(f) {
        if (!this.valueOf()) return " ";
      
        const weekName = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
        const hour = this.getHours() % 12;
        const realFormat = f ?? "yyyy-MM-ss HH:mm:SS"
         
        return realFormat.replace(/(yyyy|yy|MM|M|dd|d|E|hh|mm|ss|a\/p)/gi, ($1) => {
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
    };
    
    // Date.prototype.diffNow = function() {
    //     if (!this.valueOf()) return " ";
    
    //     const now = new Date();
    
    //     const seconds = (now.getTime() - (this as Date).getTime()) / 1000;
    
    //     if (seconds / (24*60*60) >= 1) {
    //         return `${Math.floor(seconds / (24*60*60))}일 전`
    //     } else if(seconds / (60*60) >= 1) {
    //         return `${Math.floor(seconds / (60*60))}시간 전`
    //     } else if(seconds / 60 >= 1) {
    //         return `${Math.floor(seconds / (60))}분 전`
    //     } else {
    //         return `방금 전`
    //     }
    // }
    Date.prototype.diffNow = function() {
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

    String.prototype.reverseSubString = function(start: number, end?: number): string {
        const trimmed = this.trim();
        const realStart = (start && start < 0)? trimmed.length - 2 + start: start;
        const realEnd = (end && end < 0)? trimmed.length - 2 + end: end;

        if(realEnd) {
            return trimmed.substring(realStart, realEnd);
        } else {
            return trimmed.substring(realStart);
        }
    }
    
    String.prototype.string = function(len: number) {
        let s = '', i = 0; 
        while (i++ < len) { 
            s += String(this);
        } 
        return s;
    };
    String.prototype.zf = function(len: number) {
        return "0".string(len - this.length) + this;
    };

    String.normalizeWhitespace = (text: string) => {
        return text.replace(/\n/g, ' ').replace(/ /g, '&nbsp;');
    }

    Number.prototype.validateMinText = function () {
        if (typeof this !== 'number') return '';

        const num = this as number;
        
        if(num < 60) { // 1시간 보다 작으면
            return this + '분';
        } else if (num < 1440) { // 1일 보다 작으면
            const hour = Math.trunc(num / 60);
            return hour + '시간';
        } else {
            const day = Math.trunc(num / 1440);
            return day + '일';
        }
    }

    Number.prototype.tsFormat = function() {
        return new Date((this as number) * 1000).format("yyyy-MM-dd HH:mm:ss");
    }
    Number.prototype.zf = function(len : number) {
        return this.toString().zf(len);
    };
    Number.prototype.toTwoInt = function():string {
        return ((this as number) < 10? '0': '') + this;
    }
    Number.prototype.truncateDecimal = function(unit: number): number {
        const number = Number(this);
        return (Math.round(number * unit) / unit);
    }
    String.prototype.truncateDecimal = function(unit: number): number {
        const number = Number(this);
        return (Math.round(number * unit) / unit);
    }
    
    Object.getParams = function(obj: Record<string, any>): URLSearchParams {
        const params = new URLSearchParams();
        for (let key in obj) {
            params.append(key, obj[key])
        }
    
        return params;
    }
})