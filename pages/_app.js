import { NextUIProvider } from "@nextui-org/react";
import { I18NProvider } from "context/i18n";

function MyApp({ Component, pageProps }) {
  return (
    <NextUIProvider>
      <I18NProvider>
        <Component {...pageProps} />
      </I18NProvider>
    </NextUIProvider>
  );
}

export default MyApp;
