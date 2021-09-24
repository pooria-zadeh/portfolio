import React from "react";
import { AppProps } from "next/app";
import { Router } from "next/router";
import NProgress from "nprogress";
import { SWRConfig } from "swr";

import AppThemeProvider from "src/theme/ThemeProvider";

import "../public/css/global.css";
import "nprogress/nprogress.css";

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function MyApp({ Component, pageProps }: AppProps) {
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles?.parentElement?.removeChild(jssStyles);
    }
  }, []);

  return (
    <SWRConfig
      value={{
        errorRetryCount: 0,
        // onError: onSWRError,
        // onErrorRetry: onSWRErrorRetry,
        revalidateOnFocus: false,
        revalidateOnMount: true,
      }}
    >
      <AppThemeProvider>
        <Component {...pageProps} />
      </AppThemeProvider>
    </SWRConfig>
  );
}

export default MyApp;
