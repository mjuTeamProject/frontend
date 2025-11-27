"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import NavBar from "../components/NavBar";

export default function SignupPage() {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [myBirth, setMyBirth] = useState("");
    const [partnerBirth, setPartnerBirth] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSignup = (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        // 유효성 검사
        if (!email || !password || !myBirth || !partnerBirth) {
            setError("모든 정보를 입력해주세요.");
            setIsLoading(false);
            return;
        }
        if (password.length < 6) {
            setError("비밀번호는 최소 6자 이상이어야 합니다.");
            setIsLoading(false);
            return;
        }

        // 시뮬레이션
        setTimeout(() => {
            setIsLoading(false);
            alert("회원가입이 완료되었습니다! 🎉");
            router.push("/score");
        }, 1500);
    };

    return (
        <div className="min-h-screen flex flex-col bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100 font-sans selection:bg-[#5c2c86] selection:text-white">
            {/* Navigation Bar */}
            <NavBar>
                <div className="flex items-center gap-4">
                    <span className="text-sm text-zinc-500 hidden sm:inline">이미 계정이 있으신가요?</span>
                    <Link
                        href="/login"
                        className="text-sm font-medium text-[#5c2c86] hover:text-[#f28b2d] transition-colors"
                    >
                        로그인
                    </Link>
                </div>
            </NavBar>

            {/* Main Content */}
            <main className="flex-grow flex items-center justify-center px-6 py-12 relative overflow-hidden">
                {/* Background Decorations (통일된 배경 효과) */}
                <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-[#5c2c86]/10 rounded-full blur-3xl -z-10 animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-[#f28b2d]/10 rounded-full blur-3xl -z-10 animate-pulse delay-700" />

                <div className="w-full max-w-md bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xl p-8 md:p-10 relative z-10">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-2xl md:text-3xl font-bold mb-2 text-zinc-900 dark:text-white">
                            계정 만들기
                        </h1>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400">
                            Soulmatch에서 당신의 인연을 분석해보세요.
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSignup} className="space-y-5">

                        {/* Email Input */}
                        <div>
                            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                                이메일
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="name@example.com"
                                className="w-full px-4 py-3 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 focus:outline-none focus:ring-2 focus:ring-[#5c2c86]/20 focus:border-[#5c2c86] transition-all text-sm placeholder:text-zinc-400"
                            />
                        </div>

                        {/* Password Input */}
                        <div>
                            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                                비밀번호
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="6자 이상 입력해주세요"
                                className="w-full px-4 py-3 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 focus:outline-none focus:ring-2 focus:ring-[#5c2c86]/20 focus:border-[#5c2c86] transition-all text-sm placeholder:text-zinc-400"
                            />
                        </div>

                        {/* Birth Inputs Group */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                                    내 생일
                                </label>
                                <input
                                    type="date"
                                    value={myBirth}
                                    onChange={(e) => setMyBirth(e.target.value)}
                                    className="w-full px-3 py-3 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 focus:outline-none focus:ring-2 focus:ring-[#5c2c86]/20 focus:border-[#5c2c86] transition-all text-sm text-zinc-600 dark:text-zinc-300"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                                    상대 생일
                                </label>
                                <input
                                    type="date"
                                    value={partnerBirth}
                                    onChange={(e) => setPartnerBirth(e.target.value)}
                                    className="w-full px-3 py-3 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 focus:outline-none focus:ring-2 focus:ring-[#5c2c86]/20 focus:border-[#5c2c86] transition-all text-sm text-zinc-600 dark:text-zinc-300"
                                />
                            </div>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 flex items-center gap-2 text-sm text-red-600 dark:text-red-400 animate-pulse">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 shrink-0">
                                    <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
                                </svg>
                                {error}
                            </div>
                        )}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full mt-4 bg-gradient-to-r from-[#5c2c86] to-[#f28b2d] hover:opacity-90 text-white font-bold py-3.5 rounded-lg shadow-md hover:shadow-lg transition-all transform active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2"
                        >
                            {isLoading ? (
                                <>
                                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                                    처리중...
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
        </div>
    );
}