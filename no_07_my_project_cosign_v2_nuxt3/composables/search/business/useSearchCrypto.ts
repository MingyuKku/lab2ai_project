import { ALL_CRYPTO_LIST } from "~/composables/_app/asyncDataFetchKeys";
import type { ClassSearchItem, highlightIndexNumbers } from "../services/_types";

const searchHilightIndexValues: {
    key: keyof ClassSearchItem;
    type: keyof highlightIndexNumbers | null;
}[] = [
    {
        key: 'digitalAssetsKoNameTrim',
        type: 'digitalAssetsKoNameIndex',
    },
    {
        key: 'digitalAssetsCode',
        type: 'digitalAssetsCodeIndex',
    },
    {
        key: 'digitalAssetsEnNameTrim',
        type: null,
    },
]

export const useSearchCrypto = (inputValue: string, updateSearchResultList: (list: ClassSearchItem[]) => void) => {

    const trimValue = inputValue.toUpperCase().replace(/\s/g,''); // 모든 공백을 제거

    const { data: allCryptoList } = useNuxtData<ClassSearchItem[]>(ALL_CRYPTO_LIST);

    if (trimValue.length > 0) {

        allCryptoList.value?.forEach((item) => {
            // 하이라이트 초기화
            item.highlightIndexNumbers.digitalAssetsCodeIndex = [];
            item.highlightIndexNumbers.digitalAssetsKoNameIndex = [];
        })

        highlightMatches();
        // sortSearchCoins(usePiniaCoinSearch().coinList.searchResultCoins);

    } else {
        updateSearchResultList([]);
    }

    
    function highlightMatches() {
        if (!allCryptoList.value) return;

        const escapedWord = trimValue.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // 특수 문자들을 찾아서 각 문자 앞에 백슬래시(\)를 추가. 특수 문자들이 글자 자체로서의 기능을 하게 하려는 것
        const regex = new RegExp(escapedWord, 'i');

        const searchResult = allCryptoList.value.filter((item) => {

            const isSomeMatchSearchHilightIndexValues = () =>
                    searchHilightIndexValues.map(value => value.key).some(key => regex.test(item[key] as string));

            if (isSomeMatchSearchHilightIndexValues()) {
                searchHilightIndexValues.forEach(value => {
                    const highlightIndexNumbers = [];

                    const execArray = regex.exec(item[value.key] as string);

                    if (execArray !== null) {
                        for (let i = 0; i < execArray[0].length; i++) {
                            highlightIndexNumbers.push(execArray['index'] + i);
                        }
                    }
                    
                    if (value.type !== null) item.highlightIndexNumbers[value.type] = highlightIndexNumbers;
                })

                return item;
            }
        })

        updateSearchResultList(searchResult);
    }
}