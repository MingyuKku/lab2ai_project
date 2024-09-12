import React, { useCallback } from "react";
import { useLocaleContext } from "@/components/context/LocaleJson";
import { StyledMobileHistory } from "@/styled/mainContent/mobile/MainContentStyled";
import { MobileHistory, groupByMobileHistory } from "@/services/history";
import { useGetLocale } from "@/hooks/useGetLocale";

const History = () => {

  const { text } = useLocaleContext();
  const locale = useGetLocale();

  const [ tabIndex, setTabIndex ] = React.useState<number>(0);
  const [ mobileHistory, setMobileHistory ] = React.useState<MobileHistory[]>([]);

  React.useEffect(() => {
    setMobileHistory(groupByMobileHistory(text, locale))
  }, [])

  const onClickTab = useCallback((idx:number) => {
    setTabIndex(idx);
  }, [])

  return (
    <StyledMobileHistory>
      <div className="section-title">
        <h1>History</h1>
      </div>
      <div className="history-tab">
        <ul>
          { mobileHistory.map((tab,idx) => (
            <li key={ idx } onClick={ () => onClickTab(idx) } className={ tabIndex === idx ? 'active':'' }>
              <h2>{ tab.date }</h2>
              <span className="tab-line"></span>
            </li>
          )) }
        </ul>
      </div>
      <div className="contents">
        {
          mobileHistory.length > 0 && mobileHistory[tabIndex].history.map((list,idx) => (
            <div key={ `${idx}-history` } className="list-wrap">
              <h3>{ list.date }</h3>
              <ul>
                {
                  list.history.map((cont,i) => (
                    <li key={ `${i}-sub` }>
                      <div className="date">{ cont.date }</div>
                      <div className="text-content">
                        {
                          cont.text.map((text,i) => (
                            <div key={ i } className="text">
                              <h4>{ text.title }</h4>
                              { text.desc && text.desc.map((p,j) => ( <p key={ j }>{ p }</p> )) }
                            </div>
                          ))
                        }
                      </div>
                    </li>
                  ))
                }
              </ul>
            </div>
          ))
        }
      </div>
    </StyledMobileHistory>
  )
}

export default History;