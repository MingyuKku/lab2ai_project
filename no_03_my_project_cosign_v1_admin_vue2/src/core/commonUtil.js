
Object.defineProperty(Object.prototype, 'getParam', {
  value: function() {
      const params = new URLSearchParams();
      for(var i in this) {
          params.append(i, this[i]);
      }
      return params;
  }
})


String.signStateText = function(evaluateState, endDate) {
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

Number.validTime = function(min) {
  const hour = min / 60;
  if(hour >= 1) return `${hour}시간`;
  else {
    return `${min}분`;
  }
}


