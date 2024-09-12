import React from 'react'
import { Cookies } from 'react-cookie';
import { LocaleTextType } from '@/locales/_type';

interface LocaleContextType {
    text: LocaleTextType | null
}

const LocaleContext = React.createContext<LocaleContextType>({
    text: null
});

const LocaleJson = ({ children }:React.PropsWithChildren) => {
    const cookies = new Cookies();
    
    const [ state, setState ] = React.useState<LocaleTextType | null>(null);

    React.useEffect(() => {
        async function setLocaleJson() {
            const locale = cookies.get('lab2ai-locale');
            const module = await import(`../../locales/${locale ?? 'ko'}.json`)
            
            setState(module);
        }

        setLocaleJson();
    }, [])


    return (
        <LocaleContext.Provider value={{
            text: state,
        }}>
            { children }
        </LocaleContext.Provider>
    )
}

export default LocaleJson;

export const useLocaleContext = () => {
    return React.useContext(LocaleContext);
}