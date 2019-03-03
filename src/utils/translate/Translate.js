/**
 * Created by smalkov on 04.09.2018.
 */

// react - redux
import React from "react";
/*constants*/
import { TranslateInterface_Ru } from "../../constants/language/InterfaceBuilder_Ru"
import { TranslateInterface_En } from "../../constants/language/InterfaceBuilder_En"
import { TranslateInterface_De } from "../../constants/language/InterfaceBuilder_De"

export const TranslateInterface = language => {
    let languageInterface = '';
    switch (language) {
        case 'ru': {
            languageInterface = TranslateInterface_Ru;
            break;
        }
        case 'en': {
            languageInterface = TranslateInterface_En;
            break;
        }
        case 'de': {
            languageInterface = TranslateInterface_De;
            break;
        }
        default: {
            languageInterface = TranslateInterface_Ru;
            break;
        }
    }
    return (languageInterface)
};