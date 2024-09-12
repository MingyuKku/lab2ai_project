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

const getSignOffPopup = (items) => {
  
    return items.map(item => {
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
                // startTimeText: Date.parseUtcText(sign.startTime).format("yyyy-MM-dd HH:mm"),
                // endTimeText: Date.parseUtcText(sign.endTime).addDate('minute', -1).format("yyyy-MM-dd HH:mm"),
                // endEarningTimeText: (sign.endEarningTime !== null) ? Date.parseUtcText(sign.endEarningTime).format('yyyy-MM-dd HH:mm'):null,
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

export default getSignOffPopup;

const getSignOffTime = (sign) => {
  const endTimeText =  Date.parseUtcText(sign.endTime).addDate('minute', -1).format("yyyy-MM-dd HH:mm");
  let endEarningTimeText = null;

  if(sign.evaluateState === 'sell_fail') {
    endEarningTimeText = endTimeText;
  } else if(sign.endEarningTime !== null) {
    endEarningTimeText = Date.parseUtcText(sign.endEarningTime).format("yyyy-MM-dd HH:mm");
  }

  return {
      startTimeText: Date.parseUtcText(sign.startTime).format("yyyy-MM-dd HH:mm"),
      endTimeText,
      endEarningTimeText,
  }
}

export {getSignOffTime};

const newActiveIndex = (items, subSeqId, slideNo) => {
    let activeIndex = 0;
    if(items.length === 3) { // 클릭한 싸인오프 양쪽에 데이터가 있을 때
      activeIndex = 1;
    } else if(items.length === 2) {  //클릭한 싸인오프가 맨처음 또는 맨끝일 때
      let idx = 0;

      if(slideNo !== undefined) {
        idx = items.findIndex(item => item.sign.subSeqId === subSeqId);  
      } else {
        idx = items.findIndex(item => item.sign.slideNo === slideNo); 
      }

      activeIndex = (idx !== -1)? idx: 0;
    } else {
      activeIndex = 0;
    }

    return activeIndex;
}

export {newActiveIndex};