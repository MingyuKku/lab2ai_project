function getStateText(evaluateState, endDate) {
    switch(evaluateState) {
        case 'cut':
        return '실패';
        case 'buy_fail':
        return '진입 실패';
        case 'sell_fail':
        case 'sell_success':
        return '종료';
    }

    if(['buy_wait', 'sell_wait'].includes(evaluateState)
        && new Date() < endDate) 
    {
        return '진행중';
    } else {
        return '평가 대기'
    }
}

function getValidateMinText(validateMin) {
    if(validateMin / 60 < 1) {
        return `${validateMin}분`;
    } else {
        return `${validateMin / 60}시간`;
    }
}

export {getValidateMinText}

function getLocaleString(value, default_value) {
    if(value >= 1) {
        return value.toLocaleString();
    } else if(value === undefined && default_value !== undefined) {
        return default_value;
    } else {
        return value;
    }
}

const DEFAULT_SIGN_ON = {
    buttons: [],
    sign: {
        sequentialId: 0
    }, 
    images: [],
    newslinks: [],
    texts: [],
    activeSignSeqId: null,
    pushStateUrl: null
}

export { DEFAULT_SIGN_ON };

const getSignOn = ({buttons, sign, activeSignSeqId}) => {
    let signOn = {
        ...DEFAULT_SIGN_ON
    };

    if(buttons !== null) { // 싸인 버튼을 통해 이동시는 buttons가 null
        signOn.buttons = buttons.map(button => {
            return {
              ...button,
              'code': button['market'].substr(4)
            }
        });
    }

    const targetEarningRate = (sign.targetPrice/sign.startPrice - 1) * 100;
    signOn.sign = {
        ...sign,
        stateText: getStateText(sign.evaluateState),
        validateMinText: getValidateMinText(sign.validateMin),
        // startTimeText: Date.parseUtcText(sign.startTime).format('yyyy-MM-dd HH:mm'),
        // endTimeText: Date.parseUtcText(sign.endTime).addDate('minute', -1).format('yyyy-MM-dd HH:mm'),
        // createdAtText: Date.parseUtcText(sign.createdAt).diffNow(),
        startPriceText: getLocaleString(sign.startPrice, '?????'),
        targetPriceText: getLocaleString(sign.targetPrice, '?????'),
        cutPriceText: getLocaleString(sign.cutPrice, '?????'),
        targetEarningRate: targetEarningRate,
        targetEarningRateText: (sign.startPrice !== undefined)? targetEarningRate.toFixed(2): '???'
    };

    if(sign.contentText !== undefined && sign.contentText !== null) {
        signOn.texts = sign.contentText.split('\n');
    } else {
        signOn.texts = [];
    }

    if(sign.images !== undefined) { // 블러처리
        signOn.images = sign.images;
        signOn.newslinks = sign.newsLinks;
    }

    signOn.activeSignSeqId = activeSignSeqId;
    
    // if(signOn.buttons.find(button => button.subSeqId === activeSignSeqId) === undefined) {
    //     // alert("존재하지 않는 SIGN입니다.") NEED TO CHANGE
    //     // location.href = `/m/${state.mentor_id}/${buttons[0].subSeqId}`;
    // } else if(activeSignSeqId !== undefined) {
    //     console.log("why?", `/m/${state.mentor_id}/${activeSignSeqId}`);
    //     signOn.pushStateUrl = `/m/${state.mentor_id}/${activeSignSeqId}`;
    // }

    return signOn;
}

export default getSignOn;

const getSignOnTime = ({sign}) => {
    return {
        startTimeText: Date.parseUtcText(sign.startTime).format('yyyy-MM-dd HH:mm'),
        endTimeText: Date.parseUtcText(sign.endTime).addDate('minute', -1).format('yyyy-MM-dd HH:mm'),
        createdAtText: Date.parseUtcText(sign.createdAt).diffNow(),
    }
}

export {getSignOnTime};