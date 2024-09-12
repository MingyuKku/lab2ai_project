const {body} = document;
const signHistoryPopupStore = {
    namespaced: true,
    state: {
        subSeqId: null,
        isShow: false,
        swipeItems: [],
    },
    getters: {
        signSeqId: state => {
            return state.subSeqId;
        },
        isShow: state => {
            return state.isShow;
        },
        swipeItems: state => {
            return state.swipeItems;
        }
    },
    mutations: {
        showHistoryPopup(state, {subSeqId}) {
            state.subSeqId = parseInt(subSeqId);
            state.isShow = true;
            body.style.overflow = 'hidden';
        },
        closeHistoryPopup(state) {
            state.subSeqId = null;
            state.isShow = false;
            body.style.overflow = 'visible';
        },
        setSwipeItems(state, items) {
        // setSwipeItems(state, value) { //추가한 내용
            function makePriceText(price) {
              if(price >= 1) {
                return price.toLocaleString();
              } else {
                return price;
              }
            }
      
            function evaluateStateText(state) {
              switch(state) {
                case 'cut':
                  return '실패';
                case 'buy_fail':
                  return '진입 실패';
                case 'sell_fail':
                case 'sell_success':
                  return '종료';
                case 'buy_wait':
                case 'sell_wait':
                  return '평가 대기중';
              }
      
              return null;
            }

            function getEarningColor(sign, minusColor, zeroColor, plusColor) {
              if(sign.earningRate < 0) return minusColor;
              else if(sign.earningRate === 0 || sign.earningRate === null) return zeroColor;
              else return plusColor;
            }

            
            state.swipeItems = items.map(item => {
            // state.swipeItems = value.items.map(item => {  //추가한 내용
                const sign = item.sign;
                return {
                  ...item,
                  sign: {
                    ...item.sign,
                    startPriceText: makePriceText(sign.startPrice),
                    targetPriceText: makePriceText(sign.targetPrice),
                    cutPriceText: makePriceText(sign.cutPrice),
                    minPriceText: makePriceText(sign.minPrice),
                    maxPriceText: makePriceText(sign.maxPrice),
                    endPriceText: makePriceText(sign.endPrice),
                    earningRateText: (sign.earningRate !== null)? sign.earningRate.toFixed(2): null,
                    evaluateStateText: evaluateStateText(sign.evaluateState), 
                    startTimeText: new Date(sign.startTime).format("yyyy-MM-dd HH:mm"),
                    endTimeText: new Date(sign.endTime).addDate('minute', -1).format("yyyy-MM-dd HH:mm"),
                    endEarningTimeText: (sign.endEarningTime !== null) ? new Date(sign.endEarningTime).format('yyyy-MM-dd HH:mm'):null,
                    state : {
                      buy_success: ['sell_success', 'sell_fail', 'cut'].includes(sign.evaluateState),
                      target_success: ['sell_success'].includes(sign.evaluateState),
                      earning_success: sign.earningRate > 0
                    },
                    valueBgColor: getEarningColor(sign, '32,88,234', '153,153,153', '245,59,87'),
                  },
                }
            });
        }
    },
    actions: {
        showHistoryPopup({commit}, value) {
            commit('showHistoryPopup', value);
        },
        closeHistoryPopup({commit}) {
            commit('closeHistoryPopup');
        },
        setSwipeItems({commit}, items) {
            commit('setSwipeItems', items);
        }
    }
}

export default signHistoryPopupStore;