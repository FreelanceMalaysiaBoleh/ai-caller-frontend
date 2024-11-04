import "@/styles/globals.css";
import { ConfigProvider } from "antd";
import type { AppProps } from "next/app";

import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

export default function App({ Component, pageProps }: AppProps) {
  console.log("Api goes here", process.env.NEXT_PUBLIC_BACKEND_URL);
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#849249',
          colorFillSecondary : "#000000",
          colorBgLayout: '#F5F5F5',
          colorBgContainer: 'white',
          colorBgTextActive: '#313B00',
          borderRadius: 4,
        },
      }}
    >
      <DndProvider backend={HTML5Backend}>
      <Component {...pageProps} />
      </DndProvider>
    </ConfigProvider>
  )
}
