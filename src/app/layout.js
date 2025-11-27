import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "./components/Footer";

export const metadata = {
    title: "Soulmatch",
    description: "AI 기반 커플 궁합 분석 서비스",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
        <body className="min-h-screen flex flex-col bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100 font-sans selection:bg-[#5c2c86] selection:text-white">
        {children}
        <Footer />
        </body>
        </html>
    );
}