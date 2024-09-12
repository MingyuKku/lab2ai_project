import { useEffect, useState } from "react"


const useResizeObserver = ():number => {

  const [ browserWidth, setBrowserWidth ] = useState<number>(0);
  
  useEffect(() => {
    const observer = new ResizeObserver((entries:ResizeObserverEntry[]) => {
      entries.forEach((entry) => {
        setBrowserWidth(entry.contentRect.width)
      })
    })
    
    observer.observe(document.documentElement);

    return (() => observer.disconnect());
  }, [])

  return browserWidth;
}

export default useResizeObserver;