"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import NavBar from "../components/NavBar";
import api from "../lib/api"; // API 모듈 임포트

// Footer 컴포넌트
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
    const certificateRef = useRef(null);

    // --- 상태 관리 ---
    const [scoreData, setScoreData] = useState(null); // API 결과 데이터
    const [animatedScore, setAnimatedScore] = useState(0);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const [showRankModal, setShowRankModal] = useState(false);
    const [showCertModal, setShowCertModal] = useState(false);
    const [rankComment, setRankComment] = useState("");

    // --- 초기 데이터 로드 ---
    useEffect(() => {
        // 1. 로그인 체크
        const token = localStorage.getItem("accessToken");
        if (token) setIsLoggedIn(true);

        // 2. 분석 결과 가져오기
        const savedResult = localStorage.getItem("analysisResult");

        if (savedResult) {
            try {
                const parsedResult = JSON.parse(savedResult);
                setScoreData(parsedResult);
            } catch (e) {
                console.error("데이터 파싱 오류", e);
                router.push("/match");
            }
        } else {
            alert("분석 데이터가 없습니다. 다시 분석해주세요.");
            router.push("/match");
        }
    }, [router]);

    // --- 데이터 가공 ---
    const score = scoreData ? Math.round(scoreData.compatibility_score) : 0;
    const userNames = {
        me: scoreData?.user1_name || "나",
        partner: scoreData?.user2_name || "상대방"
    };
    const interpretation = scoreData?.interpretation || "결과를 불러오는 중입니다...";

    // --- 테마 설정 ---
    const getTheme = (s) => {
        if (s >= 80) return {
            color: "text-[#5c2c86]",
            arrowColor: "border-t-[#5c2c86]",
            gradient: "from-[#5c2c86] via-[#a855f7] to-[#f28b2d]",
            bgStart: "bg-[#5c2c86]",
            bgEnd: "bg-[#f28b2d]",
            icon: "💖",
            message: "천생연분이에요!",
            level: "환상 궁합",
            certBg: "bg-gradient-to-br from-[#5c2c86]/10 to-[#f28b2d]/10"
        };
        if (s >= 60) return {
            color: "text-emerald-600",
            arrowColor: "border-t-emerald-600",
            gradient: "from-emerald-600 via-emerald-400 to-teal-400",
            bgStart: "bg-emerald-500",
            bgEnd: "bg-teal-400",
            icon: "🍀",
            message: "좋은 인연이네요!",
            level: "좋은 궁합",
            certBg: "bg-gradient-to-br from-emerald-500/10 to-teal-400/10"
        };
        if (s >= 40) return {
            color: "text-amber-500",
            arrowColor: "border-t-amber-500",
            gradient: "from-amber-500 via-orange-400 to-yellow-400",
            bgStart: "bg-amber-500",
            bgEnd: "bg-orange-400",
            icon: "🙂",
            message: "노력이 필요해요",
            level: "보통 궁합",
            certBg: "bg-gradient-to-br from-amber-500/10 to-orange-400/10"
        };
        return {
            color: "text-red-500",
            arrowColor: "border-t-red-500",
            gradient: "from-red-600 via-red-500 to-pink-500",
            bgStart: "bg-red-500",
            bgEnd: "bg-pink-500",
            icon: "⚡",
            message: "위험한 관계일수도..",
            level: "주의 필요",
            certBg: "bg-gradient-to-br from-red-500/10 to-pink-500/10"
        };
    };

    const theme = getTheme(score);

    // --- 점수 애니메이션 ---
    useEffect(() => {
        if (!scoreData) return;

        let start = 0;
        const end = score;
        if (start === end) return;

        let timer = setInterval(() => {
            start += 1;
            setAnimatedScore(start);
            if (start >= end) {
                setAnimatedScore(end);
                clearInterval(timer);
            }
        }, 15);

        return () => clearInterval(timer);
    }, [score, scoreData]);

    // --- 랭킹 등록 핸들러 (API 연동) ---
    const handleRankSubmit = async () => {
        if (!rankComment.trim()) {
            alert("한 줄 소개를 입력해주세요!");
            return;
        }

        try {
            // [수정됨] 분석했던 이름 2개도 함께 전송
            const payload = {
                score: scoreData.compatibility_score, // 원본 소수점 점수 전송
                intro_message: rankComment,
                user1_name: scoreData.user1_name || "이름없음",
                user2_name: scoreData.user2_name || "이름없음"
            };

            await api.post("/ranking/register", payload);

            alert("랭킹에 성공적으로 등록되었습니다!");
            setShowRankModal(false);

            // 등록 후 랭킹 페이지로 이동하고 싶다면 주석 해제
            // router.push("/rankingPage");

        } catch (error) {
            console.error("Ranking registration failed:", error);
            const msg = error.response?.data?.detail || "랭킹 등록에 실패했습니다.";
            alert(msg);
        }
    };

    // --- 이미지 저장 핸들러 ---
    const handleDownloadImage = async () => {
        if (!certificateRef.current) return;
        try {
            const html2canvas = (await import('html2canvas')).default;
            const canvas = await html2canvas(certificateRef.current, {
                scale: 2,
                backgroundColor: null,
            });
            const image = canvas.toDataURL("image/png");
            const link = document.createElement("a");
            link.href = image;
            link.download = `Soulmatch_${score}_score.png`;
            link.click();
        } catch (error) {
            console.error("이미지 저장 실패:", error);
            alert("이미지 저장 기능을 사용하려면 html2canvas 라이브러리가 필요합니다.\n(현재 데모 모드)");
        }
    };

    if (!scoreData) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-8 h-8 border-2 border-[#5c2c86] border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-zinc-500 text-sm">결과를 불러오는 중...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans overflow-x-hidden">

            <NavBar />

            <main className="flex-grow flex items-center justify-center px-4 py-12 relative">
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                    <div className={`absolute top-[-10%] left-[-5%] w-[600px] h-[600px] rounded-full blur-[100px] opacity-15 animate-pulse mix-blend-multiply dark:mix-blend-screen ${theme.bgStart}`} />
                    <div className={`absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full blur-[100px] opacity-15 animate-pulse delay-1000 mix-blend-multiply dark:mix-blend-screen ${theme.bgEnd}`} />
                </div>

                <div className="w-full max-w-md z-10">
                    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl shadow-2xl p-8 relative overflow-hidden">

                        <div className="text-center mb-8 relative z-10">
                            <div className="mb-4 transform hover:scale-110 transition-transform duration-300 inline-block cursor-default">
                                <span className="text-8xl filter drop-shadow-sm animate-bounce" style={{ animationDuration: '3s' }}>
                                    {theme.icon}
                                </span>
                            </div>
                            <h2 className={`text-3xl font-black ${theme.color} mb-1 tracking-tight`}>
                                {theme.level}
                            </h2>
                            <p className="text-zinc-500 dark:text-zinc-400 font-medium text-sm">
                                {theme.message}
                            </p>

                            {/* 백엔드 해석 메시지 표시 */}
                            <div className="mt-4 p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl border border-zinc-100 dark:border-zinc-700/50">
                                <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed break-keep">
                                    "{interpretation}"
                                </p>
                            </div>
                        </div>

                        <div className="relative mb-12 px-2 z-10">
                            <div
                                className="absolute -top-12 transition-all duration-300 ease-out flex flex-col items-center transform -translate-x-1/2 z-20"
                                style={{ left: `${animatedScore}%` }}
                            >
                                <span className={`text-3xl font-black ${theme.color} drop-shadow-sm tabular-nums`}>
                                    {animatedScore}
                                </span>
                                <div className={`w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[10px] ${theme.arrowColor}`}></div>
                            </div>

                            <div className="h-4 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden relative shadow-inner">
                                <div className="absolute top-0 bottom-0 left-[40%] w-[2px] bg-white dark:bg-zinc-900 z-10 opacity-70"></div>
                                <div className="absolute top-0 bottom-0 left-[60%] w-[2px] bg-white dark:bg-zinc-900 z-10 opacity-70"></div>
                                <div className="absolute top-0 bottom-0 left-[80%] w-[2px] bg-white dark:bg-zinc-900 z-10 opacity-70"></div>

                                <div
                                    className={`h-full rounded-full bg-gradient-to-r ${theme.gradient} transition-all duration-300 ease-out relative`}
                                    style={{ width: `${animatedScore}%` }}
                                >
                                    <div className="absolute right-0 top-0 bottom-0 w-px bg-white/50 shadow-[0_0_10px_rgba(255,255,255,0.8)]"></div>
                                </div>
                            </div>

                            <div className="flex justify-between text-[10px] text-zinc-400 mt-2 font-medium px-0.5 uppercase tracking-wider">
                                <span>Start</span>
                                <span className="pl-4">40</span>
                                <span className="pl-1">60</span>
                                <span className="pr-1">80</span>
                                <span>Perfect</span>
                            </div>
                        </div>

                        <div className="space-y-3 relative z-10">
                            <button
                                onClick={() => router.push("/match")}
                                className="w-full py-4 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 font-bold hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-all"
                            >
                                다시 분석하기
                            </button>

                            {isLoggedIn ? (
                                <button
                                    onClick={() => setShowRankModal(true)}
                                    className={`w-full py-4 rounded-xl text-white font-bold shadow-lg hover:shadow-xl hover:opacity-95 transition-all transform active:scale-[0.98] bg-gradient-to-r ${theme.gradient}`}
                                >
                                    🏆 명예의 전당 등록하기
                                </button>
                            ) : (
                                <button
                                    onClick={() => {
                                        alert("로그인이 필요한 기능입니다.");
                                        router.push("/login");
                                    }}
                                    className="w-full py-4 rounded-xl border-2 border-dashed border-zinc-300 dark:border-zinc-700 text-zinc-400 font-bold hover:border-[#5c2c86] hover:text-[#5c2c86] transition-all"
                                >
                                    🔒 로그인하고 랭킹 등록하기
                                </button>
                            )}

                            <button
                                onClick={() => setShowCertModal(true)}
                                className="w-full py-3 text-sm text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200 transition-colors flex items-center justify-center gap-2"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                                결과 인증서 저장하기
                            </button>
                        </div>
                    </div>
                </div>
            </main>

            {/* 랭킹 등록 모달 */}
            {showRankModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
                    <div className="bg-white dark:bg-zinc-900 w-full max-w-sm rounded-2xl p-6 shadow-2xl transform transition-all scale-100">
                        <div className="text-center mb-6">
                            <div className="mx-auto w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mb-3 text-2xl">
                                🏆
                            </div>
                            <h3 className="text-lg font-bold text-zinc-900 dark:text-white">랭킹에 점수 등록</h3>
                            <p className="text-sm text-zinc-500 mt-1">우리 커플을 한 줄로 소개해주세요!</p>
                        </div>

                        <input
                            type="text"
                            value={rankComment}
                            onChange={(e) => setRankComment(e.target.value)}
                            placeholder="예) 우리는 떡볶이 킬러 커플!"
                            maxLength={30}
                            className="w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-[#5c2c86] mb-2 text-zinc-900 dark:text-white"
                        />
                        <div className="text-right text-xs text-zinc-400 mb-6">
                            {rankComment.length}/30자
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowRankModal(false)}
                                className="flex-1 py-3 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 font-bold"
                            >
                                취소
                            </button>
                            <button
                                onClick={handleRankSubmit}
                                className={`flex-1 py-3 rounded-xl text-white font-bold bg-gradient-to-r ${theme.gradient}`}
                            >
                                등록하기
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* 인증서 모달 */}
            {showCertModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
                    <div className="flex flex-col items-center w-full max-w-md">
                        <div
                            ref={certificateRef}
                            className={`w-full bg-white relative overflow-hidden rounded-t-2xl p-8 text-center shadow-2xl ${theme.certBg}`}
                        >
                            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-current to-transparent opacity-30 text-zinc-400"></div>
                            <div className="border-4 border-double border-zinc-200 p-6 rounded-xl bg-white/60 backdrop-blur-sm">
                                <div className="text-xs font-bold text-zinc-400 tracking-[0.3em] uppercase mb-4">Official Certificate</div>

                                <h2 className="text-2xl font-serif font-bold text-zinc-800 mb-2">궁합 분석 인증서</h2>
                                <div className="w-16 h-1 bg-zinc-800 mx-auto mb-6 opacity-10"></div>

                                <div className="flex justify-center items-center gap-4 mb-6">
                                    <span className="font-bold text-lg text-zinc-900">{userNames.me}</span>
                                    <span className="text-2xl text-red-500">♥</span>
                                    <span className="font-bold text-lg text-zinc-900">{userNames.partner}</span>
                                </div>

                                <div className="mb-6">
                                    <div className="text-6xl font-black text-zinc-900 mb-2">{score}점</div>
                                    <div className={`text-lg font-bold ${theme.color}`}>{theme.level}</div>
                                </div>

                                <p className="text-sm text-zinc-500 font-serif italic mb-6">
                                    "{interpretation}"
                                </p>

                                <div className="flex justify-between items-end border-t border-zinc-200 pt-4">
                                    <div className="text-left">
                                        <div className="text-[10px] text-zinc-400 uppercase">Date</div>
                                        <div className="text-xs font-bold text-zinc-600">{new Date().toLocaleDateString()}</div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-[10px] text-zinc-400 uppercase">AI Analyzer</div>
                                        <div className="text-xs font-bold text-zinc-600">Soulmatch</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="w-full bg-white dark:bg-zinc-900 rounded-b-2xl p-4 flex gap-3">
                            <button
                                onClick={() => setShowCertModal(false)}
                                className="flex-1 py-3 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 font-bold text-sm"
                            >
                                닫기
                            </button>
                            <button
                                onClick={handleDownloadImage}
                                className="flex-[2] py-3 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-bold text-sm flex items-center justify-center gap-2"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                                이미지로 저장하기
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
}