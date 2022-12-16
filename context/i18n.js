import { createContext, useCallback, useContext } from "react";
import { useRouter } from "next/router";
import es from "../translations/es.json";
import en from "../translations/en.json";

const I18NContext = createContext();
const languages = { es, en };

export function I18NProvider({ children }) {
  const { locale } = useRouter();

  const translate = useCallback(
    (key, options = { count: 0 }, ...args) => {
      const { count } = options;

      let valueKey = languages[locale][key];
      const translationPluralSingular = valueKey.split("||||");

      let translation = "";
      if (count <= 1) translation = translationPluralSingular[0];
      else translation = translationPluralSingular[1];

      if (args.length === 0) return translation;

      args.forEach((value, index) => {
        translation = translation.replace(`\${${index}}`, value);
      });
      return translation;
    },
    [locale]
  );
  return (
    <I18NContext.Provider value={{ translate }}>
      {children}
    </I18NContext.Provider>
  );
}

export function useI18N() {
  const context = useContext(I18NContext);
  if (context === undefined) {
    throw new Error("useI18N muest be used within a I18NProvider");
  }

  return context;
}
