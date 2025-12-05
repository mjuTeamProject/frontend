"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import NavBar from "../components/NavBar";
import api from "../lib/api"; 

export default function SignupPage() {
    const router = useRouter();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [nickname, setNickname] = useState(""); 
    const [email, setEmail] = useState(""); 

    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSignup = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        if (!username || !password || !nickname) {
            setError("아이디, 비밀번호, 닉네임을 모두 입력해주세요.");
            setIsLoading(false);
            return;
        }
        if (password.length < 8) {
            setError("비밀번호는 최소 8자 이상이어야 합니다. (대소문자/숫자 포함 권장)");
            setIsLoading(false);
            return;
        }

        try {
            await api.post("/auth/register", {
                username,
                password,
                nickname,
                email: email || undefined, 
            });

            alert("회원가입이 완료되었습니다! 🎉\n로그인 페이지로 이동합니다.");
            router.push("/login");

        } catch (err) {
            console.error(err);
            const msg = err.response?.data?.detail || "회원가입 중 오류가 발생했습니다.";
            setError(msg);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100 font-sans selection:bg-[#5c2c86] selection:text-white">
            <NavBar />

            <main className="flex-grow flex items-center justify-center px-6 py-12 relative overflow-hidden">
                <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-[#5c2c86]/10 rounded-full blur-3xl -z-10 animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-[#f28b2d]/10 rounded-full blur-3xl -z-10 animate-pulse delay-700" />

                <div className="w-full max-w-md bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xl p-8 md:p-10 relative z-10">
                    <div className="text-center mb-8">
                        <h1 className="text-2xl md:text-3xl font-bold mb-2 text-zinc-900 dark:text-white">
                            계정 만들기
                        </h1>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400">
                            Soulmatch 서비스 이용을 위한 ID를 생성합니다.
                        </p>
                    </div>

                    <form onSubmit={handleSignup} className="space-y-5">

                        <div>
                            <label
                                htmlFor="username"
                                className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5"
                            >
                                아이디 <span className="text-red-500">*</span>
                            </label>
                            <input
                                id="username"
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="사용할 아이디를 입력하세요"
                                className="w-full px-4 py-3 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 focus:outline-none focus:ring-2 focus:ring-[#5c2c86]/20 focus:border-[#5c2c86] transition-all text-sm placeholder:text-zinc-400"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="nickname"
                                className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5"
                            >
                                닉네임 <span className="text-red-500">*</span>
                            </label>
                            <input
                                id="nickname"
                                type="text"
                                value={nickname}
                                onChange={(e) => setNickname(e.target.value)}
                                placeholder="서비스에서 사용할 닉네임"
                                className="w-full px-4 py-3 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 focus:outline-none focus:ring-2 focus:ring-[#5c2c86]/20 focus:border-[#5c2c86] transition-all text-sm placeholder:text-zinc-400"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5"
                            >
                                이메일 (선택)
                            </label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="example@soulmatch.com"
                                className="w-full px-4 py-3 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 focus:outline-none focus:ring-2 focus:ring-[#5c2c86]/20 focus:border-[#5c2c86] transition-all text-sm placeholder:text-zinc-400"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5"
                            >
                                비밀번호 <span className="text-red-500">*</span>
                            </label>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="비밀번호를 입력하세요 (8자 이상)"
                                className="w-full px-4 py-3 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 focus:outline-none focus:ring-2 focus:ring-[#5c2c86]/20 focus:border-[#5c2c86] transition-all text-sm placeholder:text-zinc-400"
                            />
                        </div>

                        {error && (
                            <div className="p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 flex items-center gap-2 text-sm text-red-600 dark:text-red-400 animate-pulse">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 shrink-0">
                                    <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
                                </svg>
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full mt-4 bg-gradient-to-r from-[#5c2c86] to-[#f28b2d] hover:opacity-90 text-white font-bold py-3.5 rounded-lg shadow-md hover:shadow-lg transition-all transform active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2"
                        >
                            {isLoading ? (
                                <>
                                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                                    가입 처리중...
                                </>
                            ) : (
                                "회원가입 완료"
                            )}
                        </button>
                    </form>

                    <p className="text-center text-xs text-zinc-400 mt-6">
                        가입 시 Soulmatch의 <Link href="#" className="underline hover:text-[#5c2c86]">이용약관</Link> 및 <Link href="#" className="underline hover:text-[#5c2c86]">개인정보처리방침</Link>에 동의하게 됩니다.
                    </p>
                </div>
            </main>

            <footer className="bg-zinc-50 dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800 pt-16 pb-8">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
                        <div>
                            <h4 className="font-bold text-lg mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#5c2c86] to-[#f28b2d]">
                                Soulmatch
                            </h4>
                            <p className="text-sm text-zinc-500 leading-relaxed">
                                명지대학교 팀프로젝트1 결과물입니다.<br />
                                AI 기술을 활용하여 새로운 데이팅 경험을 제공합니다.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-bold text-sm mb-4 uppercase tracking-wider text-zinc-900 dark:text-zinc-100">Project Info</h4>
                            <ul className="space-y-2 text-sm text-zinc-500">
                                <li>2025학년도 2학기 상세설계보고서</li>
                                <li>지도교수: 한승철 교수님</li>
                                <li>소속: 명지대학교 컴퓨터공학과</li>
                                <li>버전: v3.0</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold text-sm mb-4 uppercase tracking-wider text-zinc-900 dark:text-zinc-100">Team</h4>
                            <ul className="space-y-2 text-sm text-zinc-500">
                                <li>설계팀: mate (7조)</li>
                                <li>Frontend: React Native / Next.js</li>
                                <li>Backend: Python, FastAPI</li>
                            </ul>
                        </div>
                    </div>
                    <div className="text-center border-t border-zinc-200 dark:border-zinc-800 pt-8">
                        <p className="text-xs text-zinc-400">
                            © 2025 Soulmatch Project Team. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}