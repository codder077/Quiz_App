import translations from "../data/translations";

export const translate = (text, targetLang = "hi") => {
    if (targetLang === "hi") {
        return translations[text] || text;
    }
    return text;
};
