import React from "react";
import { useLocaleContext } from "@/components/context/LocaleJson";
import { StyledMainContent, StyledHistory } from "@/styled/mainContent/MainContentStyled";
import { groupByDesktopHistory, HistoryItems } from "@/services/history";
import { useGetLocale } from "@/hooks/useGetLocale";

const History = () => {

  const { text } = useLocaleContext();
  const locale = useGetLocale();

  const [ desktopHistory, setDesktopHistory ] = React.useState<HistoryItems[]>([]);

  React.useEffect(() => {
    setDesktopHistory(groupByDesktopHistory(text, locale))
  }, [])

  
  return (
    <StyledMainContent className="history-section-page">
      <StyledHistory>
        <div className="inner-container">
          <div className="section-title">
            <h1>History</h1>
          </div>
          <div className="history-list">
            {
              desktopHistory.map((history,idx) => (
                <div key={ idx } className="history">
                  <div dangerouslySetInnerHTML={{__html: history.date}} className="year"></div>
                  <ul className="content-list">
                    {
                      history.history.map((list) => (
                        <li key={ list.date }>
                          <div className="date">{ list.date }</div>
                          <div className="text-content-wrap">
                            {
                              list.text.map((text,i) => (
                                <div key={ i } className="text-content">
                                  <p className={text.desc ? 'hover' : ''}>{ text.title }</p>
                                  { 
                                    text.desc && (
                                      <div className="hover-desc">
                                        <span className="inner">{ text.desc }</span>
                                      </div>
                                    )
                                  }
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
        </div>
      </StyledHistory>
    </StyledMainContent>
  )
}

export default History;