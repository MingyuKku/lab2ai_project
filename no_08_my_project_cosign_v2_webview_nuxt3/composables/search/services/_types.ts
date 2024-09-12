// export interface SearchItem {
//     cryptoCurrencyId: number;
//     cryptoFullCode: string;
//     digitalAssetsCode: string;
//     digitalAssetsEnName: string;
//     digitalAssetsId: number;
//     digitalAssetsKoName: string;
// }

import type { TradeExchangeType } from "~/composables/home/service/_types";

export interface SearchItem {
    cryptoFullCode: string;
    cryptoId: number;
    cryptoStatus: string;
    digitalAssets: {
        digitalAssetsCode: string;
        digitalAssetsDisplayEnName: string;
        digitalAssetsDisplayKrName: string;
        digitalAssetsId: number;
        digitalAssetsStatus: string;
        imageUrl: string;
    };
    exchange: {
        exchangeId: number;
        exchangeName: TradeExchangeType;
    };
    market: {
        marketId: number;
        marketName: string;
    };
}

export interface highlightIndexNumbers {
    digitalAssetsKoNameIndex: number[];
    digitalAssetsCodeIndex: number[];
}

export class ClassSearchItem {
    cryptoFullCode: string;
    cryptoId: number;
    cryptoStatus: string;
    digitalAssetsCode: string;
    digitalAssetsDisplayEnName: string;
    digitalAssetsDisplayKrName: string;
    digitalAssetsId: number;
    digitalAssetsStatus: string;
    imageUrl: string;
    exchange: {
        exchangeId: number;
        exchangeName: TradeExchangeType;
    };
    market: {
        marketId: number;
        marketName: string;
    };

    digitalAssetsCodeSplit: string[];
    digitalAssetsEnNameTrim: string;
    digitalAssetsKoNameTrim: string;
    digitalAssetsKoNameSplit: string[];
    highlightIndexNumbers: highlightIndexNumbers;
    constructor(res: SearchItem) {
        this.cryptoFullCode = res.cryptoFullCode;
        this.cryptoId = res.cryptoId;
        this.cryptoStatus = res.cryptoStatus;
        this.digitalAssetsCode = res.digitalAssets.digitalAssetsCode;
        this.digitalAssetsDisplayEnName = res.digitalAssets.digitalAssetsDisplayEnName;
        this.digitalAssetsDisplayKrName = res.digitalAssets.digitalAssetsDisplayKrName;
        this.digitalAssetsId = res.digitalAssets.digitalAssetsId;
        this.digitalAssetsStatus = res.digitalAssets.digitalAssetsStatus;
        this.imageUrl = res.digitalAssets.imageUrl;
        this.exchange = res.exchange;
        this.market = res.market;
        this.digitalAssetsCodeSplit = res.digitalAssets.digitalAssetsCode.split('');
        this.digitalAssetsEnNameTrim = res.digitalAssets.digitalAssetsDisplayEnName.replace(/\s/g,'');
        this.digitalAssetsKoNameTrim = res.digitalAssets.digitalAssetsDisplayKrName.replace(/\s/g,'');
        this.digitalAssetsKoNameSplit = res.digitalAssets.digitalAssetsDisplayKrName.split('');
        this.highlightIndexNumbers = {
            digitalAssetsKoNameIndex: [],
            digitalAssetsCodeIndex: [],
        }
    }
}




export interface Ticker {
    acc_trade_price: number;
    acc_trade_price_24h: number;
    acc_trade_volume: number;
    change: 'EVEN' | 'RISE' | 'FALL';
    change_price: number;
    change_rate: number;
    high_price: number;
    highest_52_week_date: string;
    highest_52_week_price: number;
    low_price: number;
    lowest_52_week_date: string;
    lowest_52_week_price: number;
    market: string;
    opening_price: number;
    prev_closing_price: number;
    signed_change_price: number;
    signed_change_rate: number;
    timestamp: number;
    trade_date: string;
    trade_date_kst: string;
    trade_price: number;
    trade_time: string;
    trade_time_kst: string;
    trade_timestamp: number;
    trade_volume: number;
  }
  
  export class TickerClass {
    change_price: number;
    signed_change_rate: number;
    signed_change_rate_fixed: number;
    cryptoFullCode: string;
    digitalAssetsCode: string;
    trade_price: number;
    trade_price_Text: string;
  
    constructor (res:Ticker, numFormat: (value: string | number) => string) {
      this.change_price = res.change_price;
      this.signed_change_rate = res.signed_change_rate;
      this.signed_change_rate_fixed = parseFloat((res.signed_change_rate * 100).toFixed(2)) || 0;
      this.cryptoFullCode = res.market;
      this.digitalAssetsCode = res.market.replace(/KRW-/g,'')
      this.trade_price = res.trade_price;
      this.trade_price_Text = numFormat(res.trade_price);
    }
  }