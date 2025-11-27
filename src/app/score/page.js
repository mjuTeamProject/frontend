"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import NavBar from "../components/NavBar"; // 앞서 만든 컴포넌트 경로 확인 필요

// Footer 컴포넌트 (페이지 내 포함 요청에 따라 직접 삽입)
const Footer = () => (
    <footer className="bg-zinc-50 dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800 pt-16 pb-8 mt-auto">
        <div className="max-w-6xl mx-auto px-6">
            <div className="text-center">
                <p className="text-xs text-zinc-400">
                    © 2025 Soulmatch Project Team. All rights reserved.
                </p>
            </div>
        </div>
    </footer>
);

export default function ScorePage() {
    const router = useRouter();
    const [animatedScore, setAnimatedScore] = useState(0);

    // 실제 점수 데이터 (나중에 API에서 받아와야 함)
    const score = 35;

    // 점수별 테마 설정 (Tailwind 클래스 조합)
    const getTheme = (s) => {
        if (s >= 80) return {
            color: "text-[#5c2c86]",
            gradient: "from-[#5c2c86] to-[#f28b2d]",
            bgStart: "bg-[#5c2c86]",
            bgEnd: "bg-[#f28b2d]",
            ringColor: "#5c2c86",
            badgeBg: "bg-[#5c2c86]/10",
            badgeText: "text-[#5c2c86]",
            icon: "💖",
            message: "천생연분이에요!"
        };
        if (s >= 60) return {
            color: "text-emerald-600",
            gradient: "from-emerald-500 to-teal-400",
            bgStart: "bg-emerald-500",
            bgEnd: "bg-teal-400",
            ringColor: "#10b981", // emerald-500
            badgeBg: "bg-emerald-500/10",
            badgeText: "text-emerald-600",
            icon: "🍀",
            message: "좋은 인연이네요!"
        };
        if (s >= 40) return {
            color: "text-amber-500",
            gradient: "from-amber-500 to-orange-400",
            bgStart: "bg-amber-500",
            bgEnd: "bg-orange-400",
            ringColor: "#f59e0b", // amber-500
            badgeBg: "bg-amber-500/10",
            badgeText: "text-amber-600",
            icon: "🙂",
            message: "노력이 필요해요"
        };
        return {
            color: "text-red-500",
            gradient: "from-red-500 to-pink-500",
            bgStart: "bg-red-500",
            bgEnd: "bg-pink-500",
            ringColor: "#ef4444", // red-500
            badgeBg: "bg-red-500/10",
            badgeText: "text-red-500",
            icon: "⚡",
            message: "위험한 관계일수도.."
        };
    };

    const getLevel = (s) => {
        if (s >= 80) return "환상 궁합";
        if (s >= 60) return "좋은 궁합";
        if (s >= 40) return "보통 궁합";
        return "주의 필요";
    };

    const getKeywords = (s) => {
        if (s >= 80) return "설렘 · 케미 · 성숙";
        if (s >= 60) return "신뢰 · 편안함";
        if (s >= 40) return "노력 · 이해";
        return "대화 · 조율 필요";
    };

    const getDateIdea = (s) => {
        if (s >= 80) return "감성 카페 · 드라이브";
        if (s >= 60) return "맛집 탐방 · 영화";
        if (s >= 40) return "산책 · 브런치 카페";
        return "차 한잔하며 진지한 대화";
    };

    const theme = getTheme(score);
    const level = getLevel(score);
    const keywords = getKeywords(score);
    const dateIdea = getDateIdea(score);

    // 점수 카운트 업 애니메이션
    useEffect(() => {
        let start = 0;
        const end = score;
        if (start === end) return;

        let timer = setInterval(() => {
            start += 1;
            setAnimatedScore(start);
            if (start === end) clearInterval(timer);
        }, 20); // 속도 조절

        return () => clearInterval(timer);
    }, [score]);

    // SVG 원형 그래프 계산
    const radius = 80;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (animatedScore / 100) * circumference;

    return (
        <div className="min-h-screen flex flex-col bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans selection:bg-[#5c2c86] selection:text-white overflow-x-hidden">
            <NavBar>
                <Link href="/login" className="text-sm font-medium hover:text-[#5c2c86] transition-colors">
                    로그인
                </Link>
            </NavBar>

            <main className="flex-grow flex items-center justify-center px-4 py-12 relative">
                {/* Background Decorations (디자인 통일) */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                    <div className={`absolute top-[-10%] left-[-5%] w-[600px] h-[600px] rounded-full blur-[100px] opacity-20 animate-pulse mix-blend-multiply dark:mix-blend-screen ${theme.bgStart}`} />
                    <div className={`absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full blur-[100px] opacity-20 animate-pulse delay-1000 mix-blend-multiply dark:mix-blend-screen ${theme.bgEnd}`} />
                </div>

                <div className="w-full max-w-md z-10">
                    {/* Score Card */}
                    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl shadow-2xl p-8 relative overflow-hidden">

                        {/* Header */}
                        <div className="flex justify-between items-center mb-8 relative z-10">
                            <h2 className="text-xl font-bold text-zinc-800 dark:text-zinc-100">궁합 분석 결과</h2>
                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${theme.badgeBg} ${theme.badgeText} border border-current/10`}>
                                {level}
                            </span>
                        </div>

                        {/* Score Circle Section */}
                        <div className="flex flex-col items-center justify-center mb-8 relative z-10">
                            <div className="relative w-52 h-52">
                                {/* Background Circle */}
                                <svg className="w-full h-full transform -rotate-90">
                                    <circle
                                        cx="104"
                                        cy="104"
                                        r={radius}
                                        stroke="currentColor"
                                        strokeWidth="12"
                                        fill="transparent"
                                        className="text-zinc-100 dark:text-zinc-800"
                                    />
                                    {/* Progress Circle */}
                                    <circle
                                        cx="104"
                                        cy="104"
                                        r={radius}
                                        stroke={theme.ringColor}
                                        strokeWidth="12"
                                        fill="transparent"
                                        strokeDasharray={circumference}
                                        strokeDashoffset={strokeDashoffset}
                                        strokeLinecap="round"
                                        className="transition-all duration-300 ease-out drop-shadow-lg"
                                    />
                                </svg>

                                {/* Inner Text */}
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <span className="text-4xl font-black text-zinc-900 dark:text-white tracking-tighter">
                                        {animatedScore}
                                        <span className="text-lg font-medium text-zinc-400 ml-0.5">점</span>
                                    </span>
                                    <span className={`text-sm font-bold mt-1 ${theme.color}`}>
                                        {theme.message}
                                    </span>
                                </div>

                                {/* Decor Icon */}
                                <div className="absolute -top-2 -right-2 text-4xl animate-bounce" style={{ animationDuration: '3s' }}>
                                    {theme.icon}
                                </div>
                            </div>
                        </div>

                        {/* Detail Info Grid */}
                        <div className="grid gap-3 mb-8 relative z-10">
                            <div className="bg-zinc-50 dark:bg-zinc-950/50 rounded-2xl p-4 border border-zinc-100 dark:border-zinc-800/50">
                                <div className="flex items-center gap-2 mb-1">
                                    <svg className="w-4 h-4 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                    </svg>
                                    <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">오늘의 키워드</span>
                                </div>
                                <p className="text-zinc-700 dark:text-zinc-300 font-medium pl-6">{keywords}</p>
                            </div>

                            <div className="bg-zinc-50 dark:bg-zinc-950/50 rounded-2xl p-4 border border-zinc-100 dark:border-zinc-800/50">
                                <div className="flex items-center gap-2 mb-1">
                                    <svg className="w-4 h-4 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">추천 데이트</span>
                                </div>
                                <p className="text-zinc-700 dark:text-zinc-300 font-medium pl-6">{dateIdea}</p>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="space-y-3 relative z-10">
                            <button
                                onClick={() => router.push("/match")}
                                className={`w-full py-3.5 rounded-xl text-white font-bold shadow-lg hover:shadow-xl hover:opacity-95 transition-all transform active:scale-[0.98] bg-gradient-to-r ${theme.gradient}`}
                            >
                                다시 계산하기
                            </button>

                            <button
                                onClick={() => router.push("/")}
                                className="w-full py-3.5 rounded-xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-200 font-bold hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-all"
                            >
                                메인으로 이동
                            </button>

                            <button
                                onClick={() => alert("공유 기능은 준비중입니다!")}
                                className="w-full py-2 rounded-xl text-sm text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 font-medium transition-colors flex items-center justify-center gap-1"
                            >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                                </svg>
                                결과 공유하기
                            </button>
                        </div>

                    </div>

                    {/* Footer Info */}
                    <div className="mt-6 text-center px-4">
                        <p className="text-xs text-zinc-400 leading-relaxed">
                            이 점수는 딥러닝 AI 모델이 두 사람의 사주 데이터를 분석하여 예측한 결과입니다. 재미로만 즐겨주세요!
                        </p>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}