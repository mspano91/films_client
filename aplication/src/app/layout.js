import { Roboto } from "next/font/google";
import ReduxProvider from "@/redux/ReduxProvider";
import "./globals.css";
import Nav from "@/components/nav/Nav";

const roboto = Roboto({ weight: ["400"], subsets: ["latin"] });

export const metadata = {
  title: "Stream + ",
  description: "Generated by Mspano",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* <body className={`${roboto.className}`}> */}
      <body className={`${roboto.className} dark:bg-black`}>
        {" "}
        <ReduxProvider>
          <Nav />
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
