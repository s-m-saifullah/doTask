import "./globals.css";
import { Nunito } from "@next/font/google";
import Header from "./Header";

const nunito = Nunito({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.jsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body className={nunito.className}>
        <Header />
        {children}
      </body>
    </html>
  );
}
