import type { RecentStorageCrypto, SearchCryptoStorageItem } from "./_types";

export const searchCryptoStorageName: string = 'COSIGN-SEARCH-CRYPTO-ITEMS';

export const useLocalStorage = () => {

    const recentSearchCryptoList = ref<SearchCryptoStorageItem[]>([]);

    const storageLoad = (): SearchCryptoStorageItem[] => {
        if (!window) return [];
        
        const getStorage = localStorage.getItem(searchCryptoStorageName);
        const parseStorage: SearchCryptoStorageItem[] = JSON.parse(getStorage!) ?? [];
        
        recentSearchCryptoList.value = parseStorage;
        return parseStorage;
    }


    const storageAdd = (item: SearchCryptoStorageItem) => {
        const getStorage = localStorage.getItem(searchCryptoStorageName);

        if (getStorage === null) {
            // 처음 저장이라면
            let pushItems = [];
        
            pushItems.push(item);
            localStorage.setItem(searchCryptoStorageName, JSON.stringify(pushItems)) // 배열을 문자형태로 변경해 스토리지에 저장

        } else {
            // 저장된 키워드가 있다면

            let parseStorage: SearchCryptoStorageItem[] = JSON.parse(getStorage);  // 문자형태로 저장된 값을 배열로 풀어준다

            const duplicateItemIndex = parseStorage.findIndex(storageItem => storageItem.cryptoCurrencyId === item.cryptoCurrencyId);

            // 기존에 저장된 중복 코인을 제거
            if (duplicateItemIndex > -1) parseStorage.splice(duplicateItemIndex, 1);
            parseStorage.unshift(item);

            // 최대 10개 까지만 저장
            if (parseStorage.length > 10) parseStorage.pop();

            // 다시 JSON으로 변경해 저장한다
            localStorage.setItem(searchCryptoStorageName, JSON.stringify(parseStorage));
        }
    }


    const storageDelete = (index: number) => {
        const getStorage = localStorage.getItem(searchCryptoStorageName);
        console.log('히힛', getStorage)
        if (getStorage === null) return;

        let parseStorage: SearchCryptoStorageItem[] = JSON.parse(getStorage);  // 문자형태로 저장된 값을 배열로 풀어준다
        parseStorage.splice(index,1); // 클릭한 인덱스의 코인을 제거한다
        
        localStorage.setItem(searchCryptoStorageName, JSON.stringify(parseStorage));
        storageLoad();
    }

    const storageRemove = () => {
        // 모달 관련 로직이 있어야 함

        localStorage.removeItem(searchCryptoStorageName);  // search에서 넘겨 받은 키
    }


    return {
        recentSearchCryptoList,
        storageLoad,
        storageAdd,
        storageDelete,
        storageRemove,
    }
}