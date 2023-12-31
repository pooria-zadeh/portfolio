import { PropsWithChildren, createContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { isLocale, Localization, Locale } from "./types";
// import * as defaultStrings from './locales/en';
import locales from "./locales";
import { GetStaticPropsContext } from "next";
import { ParsedUrlQuery } from "querystring";
import i18n from "./config";
import { useRef } from "react";

/**
 * Language Context
 */

interface ContextProps {
  readonly localization: Localization;
  readonly setLocale: (localization: Localization) => void;
}

export const LanguageContext = createContext<ContextProps>({
  localization: {
    direction: "ltr",
    locale: "en", // default lang
    translations: {
      /*common: defaultStrings.common*/
    }, // default translations TODO: what to do here?
    namespaces: ["common"], // default namespace TODO: could we null this? 'common' might be misleading
  },
  setLocale: () => null,
});

/**
 * Language Context: Provider
 */

export const LanguageProvider = ({
  localization,
  children,
}: PropsWithChildren<{ localization: Localization }>) => {
  const init = useRef(true);

  const [localizationState, setLocalizationState] = useState({
    locale: localization?.locale,
    translations: localization?.translations,
    namespaces: localization?.namespaces,
  });
  const [getStoredLocale, setStoredLocale] = useLocalStorage("locale");

  const { query } = useRouter();

  useEffect(() => {
    if (localizationState.locale !== getStoredLocale) {
      setStoredLocale(localizationState.locale);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localizationState]);

  useEffect(() => {
    if (
      typeof query.lang === "string" &&
      isLocale(query.lang) &&
      (localization?.locale !== query.lang || init.current)
    ) {
      init.current = false;
      setLocalizationState({
        locale: localization?.locale,
        translations: localization?.translations,
        namespaces: localization?.namespaces,
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query.lang, localizationState]);

  return (
    <LanguageContext.Provider
      value={{ localization, setLocale: setLocalizationState }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const getLocalizationProps = (
  ctx: GetStaticPropsContext<ParsedUrlQuery>,
  ...namespaces: Array<string>
) => {
  const lang: Locale = (ctx.params?.lang as Locale) || i18n.defaultLocale;
  const locale = locales[lang];

  const strings = namespaces.reduce(
    (acc, namespace) => ({
      ...acc,
      [namespace]: locale[namespace],
    }),
    {}
  );

  const translations = {
    ...strings,
  };
  return {
    locale: ctx.params?.lang || "en",
    translations,
    namespaces,
  };
};
