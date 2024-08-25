import "./globals.css";
import { Box } from "@mui/material";
import Navbar from "../components/Navbar/Navbar";
import { Overpass_Mono } from "next/font/google";

const overpass = Overpass_Mono({ subsets: ['cyrillic'], weight: ['400'] });

export const metadata = {
  title: "Sales Transcript AI",
  description: "AI-powered sales transcript analysis tool",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={overpass.className}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
