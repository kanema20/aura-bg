import "./globals.css";
import { Inter } from "next/font/google";
import { ConfigProvider, theme } from "antd";
import THEME from "./_theme";

const inter = Inter({ subsets: [ "latin" ] });

export const metadata = {
  title: "AURA MEME",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ConfigProvider
          theme={{ token: THEME }}>
          {children}
        </ConfigProvider>
      </body>
    </html>
  );
}
