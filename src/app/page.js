"use client"; 

import { useState, useEffect } from "react";
import Link from "next/link";
import NavBar from "./components/NavBar";

export default function Home() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        setIsLoggedIn(false);
        window.location.reload();
    };

    return (
        <>
            <NavBar />

            <main className="flex-grow">
                <section className="relative pt-32 pb-20 px-6 flex flex-col items-center text-center overflow-hidden min-h-[calc(100vh-64px)] justify-center">

                    <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-[#5c2c86]/10 rounded-full blur-3xl -z-10 animate-pulse" />
                    <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-[#f28b2d]/10 rounded-full blur-3xl -z-10 animate-pulse delay-700" />

                    <span className="inline-block py-1 px-3 rounded-full bg-[#5c2c86]/10 dark:bg-[#5c2c86]/30 text-[#5c2c86] dark:text-purple-200 text-sm font-semibold mb-6 border border-[#5c2c86]/20">
                        AI 기반 커플 궁합 분석 서비스
                    </span>

                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 max-w-4xl bg-clip-text text-transparent bg-gradient-to-b from-zinc-900 to-zinc-600 dark:from-white dark:to-zinc-400">
                        운명의 상대를 <br className="hidden md:block" />
                        데이터로 확인하세요
                    </h1>
                    <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mb-10 leading-relaxed">
                        딥러닝 기반의 정밀한 사주 분석 엔진이 당신과 파트너의 궁합 점수를 계산합니다.
                        지금 바로 파트너를 초대하고, 둘만의 특별한 <span className="text-[#f28b2d] font-semibold">Soulmatch</span> 리포트를 받아보세요.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                        <Link
                            href="/match"
                            className="h-12 px-8 rounded-full bg-[#f28b2d] hover:scale-105 text-white font-semibold text-lg transition-all shadow-lg shadow-[#f28b2d]/25 flex items-center justify-center"
                        >
                            궁합 분석하기
                        </Link>

                        <Link
                            href="/rankingPage"
                            className="h-12 px-8 rounded-full border border-zinc-200 dark:border-zinc-800 hover:border-[#5c2c86] hover:text-[#5c2c86] bg-white dark:bg-transparent font-medium transition-all flex items-center justify-center"
                        >
                            랭킹 확인
                        </Link>
                    </div>
                </section>
            </main>
        </>
    );
}