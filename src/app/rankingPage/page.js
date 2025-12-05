"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import NavBar from "../components/NavBar";
import api from "../lib/api";

const GoldMedal = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10 text-yellow-400 drop-shadow-md filter">
        <path fillRule="evenodd" d="M5.166 2.621v.858c-1.035.148-2.059.33-3.071.543a.75.75 0 00-.584.859 6.753 6.753 0 006.138 5.6 6.73 6.73 0 002.743 1.346A6.707 6.707 0 019.279 15H8.54c-1.036 0-1.875.84-1.875 1.875V19.5h-.75a2.25 2.25 0 00-2.25 2.25c0 .414.336.75.75.75h15a.75.75 0 00.75-.75 2.25 2.25 0 00-2.25-2.25h-.75v-2.625c0-1.036-.84-1.875-1.875-1.875h-.739a6.706 6.706 0 01-1.112-3.173 6.73 6.73 0 002.743-1.347 6.753 6.753 0 006.139-5.6.75.75 0 00-.585-.858 47.077 47.077 0 00-3.07-.543V2.62a.75.75 0 00-.658-.744 49.22 49.22 0 00-6.093-.377c-2.063 0-4.096.128-6.093.377a.75.75 0 00-.657.744zm0 2.629c0 1.196.312 2.32.857 3.294A5.266 5.266 0 013.16 5.337a45.6 45.6 0 012.006-.343v.256zm13.5 0v-.256c.674.1 1.343.214 2.006.343a5.265 5.265 0 01-2.863 3.207 6.72 6.72 0 00.857-3.294z" clipRule="evenodd" />
    </svg>
);

const SilverMedal = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10 text-slate-300 drop-shadow-md filter">
        <path fillRule="evenodd" d="M5.166 2.621v.858c-1.035.148-2.059.33-3.071.543a.75.75 0 00-.584.859 6.753 6.753 0 006.138 5.6 6.73 6.73 0 002.743 1.346A6.707 6.707 0 019.279 15H8.54c-1.036 0-1.875.84-1.875 1.875V19.5h-.75a2.25 2.25 0 00-2.25 2.25c0 .414.336.75.75.75h15a.75.75 0 00.75-.75 2.25 2.25 0 00-2.25-2.25h-.75v-2.625c0-1.036-.84-1.875-1.875-1.875h-.739a6.706 6.706 0 01-1.112-3.173 6.73 6.73 0 002.743-1.347 6.753 6.753 0 006.139-5.6.75.75 0 00-.585-.858 47.077 47.077 0 00-3.07-.543V2.62a.75.75 0 00-.658-.744 49.22 49.22 0 00-6.093-.377c-2.063 0-4.096.128-6.093.377a.75.75 0 00-.657.744zm0 2.629c0 1.196.312 2.32.857 3.294A5.266 5.266 0 013.16 5.337a45.6 45.6 0 012.006-.343v.256zm13.5 0v-.256c.674.1 1.343.214 2.006.343a5.265 5.265 0 01-2.863 3.207 6.72 6.72 0 00.857-3.294z" clipRule="evenodd" />
    </svg>
);

const BronzeMedal = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10 text-amber-600 drop-shadow-md filter">
        <path fillRule="evenodd" d="M5.166 2.621v.858c-1.035.148-2.059.33-3.071.543a.75.75 0 00-.584.859 6.753 6.753 0 006.138 5.6 6.73 6.73 0 002.743 1.346A6.707 6.707 0 019.279 15H8.54c-1.036 0-1.875.84-1.875 1.875V19.5h-.75a2.25 2.25 0 00-2.25 2.25c0 .414.336.75.75.75h15a.75.75 0 00.75-.75 2.25 2.25 0 00-2.25-2.25h-.75v-2.625c0-1.036-.84-1.875-1.875-1.875h-.739a6.706 6.706 0 01-1.112-3.173 6.73 6.73 0 002.743-1.347 6.753 6.753 0 006.139-5.6.75.75 0 00-.585-.858 47.077 47.077 0 00-3.07-.543V2.62a.75.75 0 00-.658-.744 49.22 49.22 0 00-6.093-.377c-2.063 0-4.096.128-6.093.377a.75.75 0 00-.657.744zm0 2.629c0 1.196.312 2.32.857 3.294A5.266 5.266 0 013.16 5.337a45.6 45.6 0 012.006-.343v.256zm13.5 0v-.256c.674.1 1.343.214 2.006.343a5.265 5.265 0 01-2.863 3.207 6.72 6.72 0 00.857-3.294z" clipRule="evenodd" />
    </svg>
);

export default function RankingPage() {
    const [rankings, setRankings] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchRankings = async () => {
            try {
                const response = await api.get('/ranking/daily');

                if (response.data && response.data.rankings) {
                    const mappedData = response.data.rankings.map((item) => ({
                        id: item.id,
                        user1: item.user1_name, 
                        user2: item.user2_name, 
                        score: Math.round(item.score),
                        comment: item.intro_message || "사랑 가득!",
                        date: new Date(item.created_at).toLocaleDateString()
                    }));
                    setRankings(mappedData);
                } else {
                    console.warn("API returned no data");
                    setRankings([]);
                }

            } catch (error) {
                console.error("Fetching rankings failed:", error);
                setRankings([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchRankings();
    }, []);

    const renderRankBadge = (rank) => {
        switch (rank) {
            case 0: return <GoldMedal />;
            case 1: return <SilverMedal />;
            case 2: return <BronzeMedal />;
            default:
                return (
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-500 font-bold text-sm border border-zinc-200 dark:border-zinc-700">
                        {rank + 1}
                    </div>
                );
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans selection:bg-[#5c2c86] selection:text-white">
            <NavBar />

            <main className="flex-grow flex items-center justify-center px-4 py-12 relative overflow-hidden">
                <div className="w-full max-w-3xl z-10">

                    <div className="text-center mb-10">
                        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm text-xs font-semibold text-zinc-500 mb-4">
                            <span className="w-2 h-2 rounded-full bg-[#f28b2d] animate-pulse"></span>
                            Hall of Fame
                        </span>
                        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-3 text-zinc-900 dark:text-white">
                            Soulmatch <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5c2c86] to-[#f28b2d]">명예의 전당</span>
                        </h1>
                        <p className="text-zinc-500 dark:text-zinc-400">
                            최고의 케미를 보여준 커플들을 확인해보세요!
                        </p>
                    </div>

                    <div className="bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl border border-zinc-200/60 dark:border-zinc-800/60 rounded-3xl shadow-2xl overflow-hidden">

                        <div className="hidden sm:flex items-center justify-between px-6 py-4 bg-zinc-50/50 dark:bg-zinc-950/30 border-b border-zinc-200/50 dark:border-zinc-800/50 text-xs font-bold text-zinc-400 uppercase tracking-wider">
                            <div className="pl-4">Rank & Couple</div>
                            <div className="pr-4">Compatibility Score</div>
                        </div>

                        <div className="divide-y divide-zinc-100 dark:divide-zinc-800/50">
                            {isLoading ? (
                                <div className="p-10 text-center text-zinc-500">데이터를 불러오는 중입니다...</div>
                            ) : rankings.length === 0 ? (
                                <div className="p-10 text-center text-zinc-500">등록된 랭킹 데이터가 없습니다.<br/>첫 번째 주인공이 되어보세요!</div>
                            ) : (
                                rankings.map((item, index) => (
                                    <div
                                        key={item.id}
                                        className={`group flex items-center justify-between p-5 sm:px-6 transition-all hover:bg-white/60 dark:hover:bg-zinc-800/60
                                        ${index < 3 ? 'bg-gradient-to-r from-[#5c2c86]/[0.03] to-[#f28b2d]/[0.03]' : ''}`}
                                    >
                                        <div className="flex items-center gap-4 sm:gap-6">
                                            <div className={`flex-shrink-0 transition-transform duration-300 ${index < 3 ? 'group-hover:scale-110' : ''}`}>
                                                {renderRankBadge(index)}
                                            </div>

                                            <div className="flex flex-col">
                                                <div className="font-bold text-base sm:text-lg text-zinc-800 dark:text-zinc-200 flex items-center gap-2">
                                                    <span>{item.user1}</span>
                                                    <span className="text-[#f28b2d] text-xs">♥</span>
                                                    <span>{item.user2}</span>
                                                </div>
                                                <div className="flex items-center gap-3 mt-1">
                                                    <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-500">
                                                        {item.comment}
                                                    </span>
                                                    <span className="text-[10px] text-zinc-400 hidden sm:inline">{item.date}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-4">
                                            <div className="hidden sm:block w-32 h-2 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                                                <div
                                                    className={`h-full rounded-full ${index < 3 ? 'bg-gradient-to-r from-[#5c2c86] to-[#f28b2d]' : 'bg-zinc-300 dark:bg-zinc-700'}`}
                                                    style={{ width: `${item.score}%` }}
                                                ></div>
                                            </div>

                                            <div className="text-right min-w-[60px]">
                                                <span className={`block text-2xl font-black leading-none ${index < 3 ? 'text-transparent bg-clip-text bg-gradient-to-r from-[#5c2c86] to-[#f28b2d]' : 'text-zinc-400'}`}>
                                                    {item.score}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        <div className="p-4 border-t border-zinc-200/50 dark:border-zinc-800/50 text-center bg-zinc-50/30 dark:bg-zinc-950/30">
                            <button className="text-sm font-bold text-zinc-500 hover:text-[#5c2c86] transition-colors py-2 px-6 rounded-full hover:bg-white dark:hover:bg-zinc-800 shadow-sm border border-transparent hover:border-zinc-200 dark:hover:border-zinc-700">
                                전체 순위 보기 +
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}