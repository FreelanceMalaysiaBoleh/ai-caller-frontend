import "@/styles/globals.css";
import "@/styles/fonts.css";
import { ConfigProvider } from "antd";
import type { AppProps } from "next/app";

import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#2C2C2C',
          colorFillSecondary : "#000000",
          colorBgLayout: '#2C2C2C',
          colorBgContainer: '#2C2C2C',
          colorBgTextActive: '#2C2C2C',
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
