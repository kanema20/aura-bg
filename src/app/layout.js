import { Archivo } from "next/font/google";
import { ConfigProvider, theme } from "antd";
import THEME from "./_theme";
import "./globals.css";

const archivo = Archivo({ subsets: [ "latin" ] });

export const metadata = {
  title: "AURA MEME",
  description: ""
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={archivo.className}>
        {children}
      </body>
    </html>
  );
}
