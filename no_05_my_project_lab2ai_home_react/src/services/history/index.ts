import { LocaleTextType } from "@/locales/_type";

export interface HistoryItems {
    date: string;
    history: History[];
}

interface History {
  date: string;
  text: {
      title: string;
      desc?: string[];
  }[];
}

export interface MobileHistory {
  date: string;
  history: {
    date: string;
    history: History[];
  }[];
};

export const groupByDesktopHistory = (text:LocaleTextType | null, locale: string):HistoryItems[] => {
  const getLocale = locale === 'ko' ? 'ko' : 'en';
  const newHistory:HistoryItems[] = [];

  if (text) {

    text.history.forEach((history,idx) => {
      const year = new Date(history.date).getFullYear();

      if (
        year === 2021 ||
        year === 2020 ||
        year === 2019 ||
        year === 2018 ||
        year === 2017
      ) {
        const titleDate = '2021<br/><br/>-<br/><br/>2017';
        insertHistoryItem(titleDate, history, 'year');

      } else {
        const titleDate = year.toString();
        insertHistoryItem(titleDate, history, 'month');
      }

    })
  }


  function insertHistoryItem(titleDate: string, history: History, format: string) {
    const findIndex = newHistory.findIndex(his => his.date === titleDate);

    const copyedItem = {...history};

    if (format === 'year') {
      copyedItem.date = new Intl.DateTimeFormat(getLocale, {
        year: 'numeric',
      }).format(new Date(copyedItem.date))
    }

    if (format === 'month') {
      copyedItem.date = new Intl.DateTimeFormat(getLocale, {
        month: getLocale === 'en' ? 'short' : '2-digit',
      }).format(new Date(copyedItem.date))
    }
    

    if (findIndex > -1) {
      newHistory[findIndex].history = [
        ...newHistory[findIndex].history,
        copyedItem
      ]

    } else {
      newHistory.push({
        date: titleDate,
        history: [copyedItem]
      })
    }
  }

  return newHistory;
}




export const groupByMobileHistory = (text:LocaleTextType | null, locale: string) => {
  const getLocale = locale === 'ko' ? 'ko' : 'en';
  const newHistory:MobileHistory[] = [];

  if (text) {
    text.history.forEach((history,idx) => {
      const year = new Date(history.date).getFullYear();

      if (
        year === 2023 ||
        year === 2022
      ) {
        const titleDate = '2023-2022';
        insertHistoryItem(newHistory, titleDate, history);
      } else {
        const titleDate = '2021-2017';
        insertHistoryItem(newHistory, titleDate, history);
      }
    })
  }


  function insertHistoryItem(items:any[], titleDate: string, history: History, format?: string) {
    const findIndex = items.findIndex(his => his.date === titleDate);

    const copyedItem = {...history};

    if (format) {
      if (format === 'year') {
        copyedItem.date = new Intl.DateTimeFormat(getLocale, {
          year: 'numeric',
        }).format(new Date(copyedItem.date))
      }
  
      if (format === 'month') {
        copyedItem.date = new Intl.DateTimeFormat(getLocale, {
          month: getLocale === 'en' ? 'short' : '2-digit',
        }).format(new Date(copyedItem.date))
      }
    }
    

    if (findIndex > -1) {
      items[findIndex].history = [
        ...items[findIndex].history,
        copyedItem
      ]

    } else {
      items.push({
        date: titleDate,
        history: [copyedItem]
      })
    }
  }

  

  function groupByYear() {
    newHistory.forEach(history => {
      const newHistoryItems:HistoryItems[] = [];

      (history.history as any[]).forEach((inItem) => {
        const year = new Date(inItem.date).getFullYear();
        if (
          year === 2023 ||
          year === 2022
        ) {
          const subTitleDate = year.toString();
          insertHistoryItem(newHistoryItems, subTitleDate, inItem, 'month');

        } else {
          const subTitleDate = '2021-2017';
          insertHistoryItem(newHistoryItems, subTitleDate, inItem, 'year')
        }
      })

      history.history = newHistoryItems;
    })
  }

  groupByYear();

  return newHistory;
}