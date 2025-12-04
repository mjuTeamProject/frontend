"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NavBar({ children }) {
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [mounted, setMounted] = useState(false); // 하이드레이션 불일치 방지용

    // 초기 마운트 시 로그인 상태 확인
    useEffect(() => {
        setMounted(true);
        const token = localStorage.getItem("accessToken");
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);

    // 로그아웃 처리
    const handleLogout = () => {
        // 토큰 삭제
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");

        // 상태 업데이트
        setIsLoggedIn(false);

        // 홈으로 이동 및 새로고침 (상태 초기화 확실하게 하기 위해)
        alert("로그아웃 되었습니다.");
        window.location.href = "/";
    };

    return (
        <nav className="w-full border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md sticky top-0 z-50">
            <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
                {/* 로고 영역 */}
                <Link href="/" className="flex items-center gap-1">
                    <Image
                        src="/logo.png"
                        alt="Soulmatch Logo"
                        width={32}
                        height={32}
                        className="object-contain"
                    />
                    <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#5c2c86] to-[#f28b2d]">
                        Soulmatch
                    </span>
                </Link>

                {/* 우측 메뉴 영역 */}
                <div className="flex items-center gap-4">
                    {/* 페이지별 커스텀 버튼이 필요할 때 children으로 받음 (예: 랭킹 확인 등) */}
                    {children}

                    {/* 로그인 상태에 따른 공통 버튼 */}
                    {mounted && (isLoggedIn ? (
                        <>
                            <Link
                                href="/profile"
                                className="hidden sm:inline-block text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-[#5c2c86] transition-colors"
                            >
                                마이페이지
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="text-sm font-medium px-4 py-2 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 hover:bg-zinc-200 transition-colors"
                            >
                                로그아웃
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                href="/login"
                                className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-[#5c2c86] transition-colors"
                            >
                                로그인
                            </Link>
                            <Link
                                href="/signup"
                                className="bg-[#5c2c86] hover:opacity-90 text-white px-4 py-2 rounded-full text-sm font-medium transition-all shadow-md hover:shadow-lg"
                            >
                                시작하기
                            </Link>
                        </>
                    ))}
                </div>
            </div>
        </nav>
    );
}