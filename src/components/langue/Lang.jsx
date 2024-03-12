import React, { ChangeEvent, useState } from "react";
import { useTranslation } from 'react-i18next';
import { Language } from "../enums/Language";

const Lang = () => {
    const { i18n } = useTranslation();
    const [lang, setLang] = useState<Language>(i18n.language);

    const changeLanguage = (event: ChangeEvent<HTMLSelectElement>) => {
        const language = event.target.value;

        switch (language) {
            case "EN":
                setLang(Language.EN); // Utilisation de l'énumération
                i18n.changeLanguage("en");
                break;
            case "FR":
            default:
                setLang(Language.FR); // Utilisation de l'énumération
                i18n.changeLanguage("fr");
                break;
        }
    };

    return (
        <div>
            <div>
                <select value={lang} name="language" onChange={changeLanguage}>
                    <option value={Language.FR}>FR</option> {/* Utilisation de l'énumération */}
                    <option value={Language.EN}>EN</option> {/* Utilisation de l'énumération */}
                </select>
            </div>
        </div>
    );
};

export default Lang;
