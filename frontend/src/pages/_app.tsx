import { store } from "@store/index";
import "antd/dist/reset.css";
import "@styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { ConfigProvider } from "antd";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ConfigProvider
      theme={{
        components: {},
        token: {
          colorPrimary: "#5370c6",
          fontFamily: "Roboto",
          colorText: "#6a7192",
          borderRadius: 5,
        },
      }}
    >
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </ConfigProvider>
  );
}
