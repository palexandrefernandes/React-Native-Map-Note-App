import * as React from 'react';
import * as RNLocalize from "react-native-localize";
import {translations} from './translations'

const DEFAULT_LANGUAGE="en"
export const LanguageContext = React.createContext(translations[DEFAULT_LANGUAGE]);


export function TranslationProvider(props){
    const [currentLanguage, setCurrentLanguage] = React.useState(translations[DEFAULT_LANGUAGE]);

    RNLocalize.addEventListener('change', () => {
        if(RNLocalize.getLocales()[0].languageCode)
            setCurrentLanguage(translations[RNLocalize.getLocales()[0].languageCode]);
        else
            setCurrentLanguage(translations[DEFAULT_LANGUAGE]);
    });

    React.useEffect(() => {
        setCurrentLanguage(translations[RNLocalize.getLocales()[0].languageCode]);
    }, []);

    return (
        <LanguageContext.Provider value={
            {...currentLanguage}
        }>
            {props.children}
        </LanguageContext.Provider>
    );
}