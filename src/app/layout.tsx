import type { Metadata,Viewport } from "next";import "./globals.css";import{KioskProvider}from"@/components/KioskProvider";
export const metadata:Metadata={title:"Дигитално училиште — Орце Николов",description:"Интерактивен училишен информативен систем за СУГС Гимназија „Орце Николов“.",manifest:"/manifest.webmanifest"};
export const viewport:Viewport={width:"device-width",initialScale:1,maximumScale:1,userScalable:false,themeColor:"#071c2c"};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="mk"><body><KioskProvider>{children}</KioskProvider></body></html>}
