"use client";

import { useState } from "react";
import Link from "next/link";
import NavBar from "../components/NavBar";

// 1. 아이콘 수정: 뒤에 보이던 희미한 원(path opacity=0.1) 제거
const MarsIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={className}>
        {/* 화살표 */}
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5L21 3" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 3h5v5" />
        {/* 원 */}
        <circle cx="10" cy="14" r="5" />
    </svg>
);

const VenusIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={className}>
        {/* 십자가 */}
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v6" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19h6" />
        {/* 원 */}
        <circle cx="12" cy="10" r="5" />
    </svg>
);

export default function MatchPage() {
    const [formData, setFormData] = useState({
        p1: { name: "", gender: 1, year: "2000", month: "1", day: "1" },
        p2: { name: "", gender: 0, year: "2000", month: "1", day: "1" },
    });

    const [isLoading, setIsLoading] = useState(false);
    const [focusedSection, setFocusedSection] = useState(0);

    const years = Array.from({ length: 50 }, (_, i) => 2025 - i);
    const months = Array.from({ length: 12 }, (_, i) => i + 1);
    const days = Array.from({ length: 31 }, (_, i) => i + 1);

    const handleChange = (person, field, value) => {
        setFormData((prev) => ({
            ...prev,
            [person]: { ...prev[person], [field]: value },
        }));
    };

    const handleFocus = (sectionIndex) => {
        setFocusedSection(sectionIndex);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const payload = {
            person1: {
                gender: formData.p1.gender,
                birth: {
                    year: parseInt(formData.p1.year),
                    month: parseInt(formData.p1.month),
                    day: parseInt(formData.p1.day),
                }
            },
            person2: {
                gender: formData.p2.gender,
                birth: {
                    year: parseInt(formData.p2.year),
                    month: parseInt(formData.p2.month),
                    day: parseInt(formData.p2.day),
                }
            }
        };

        console.log("API Payload:", payload);

        setTimeout(() => {
            setIsLoading(false);
            alert("분석 완료! 결과 페이지로 이동합니다.");
        }, 2000);
    };

    return (
        <div className="min-h-screen flex flex-col bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans selection:bg-[#5c2c86] selection:text-white overflow-x-hidden">
            <NavBar>
                <Link href="/login" className="text-sm font-medium hover:text-[#5c2c86] transition-colors">
                    로그인
                </Link>
            </NavBar>

            <main className="flex-grow flex items-center justify-center px-4 py-12 relative">
                {/* Background */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                    <div className="absolute top-[-10%] left-[-5%] w-[600px] h-[600px] bg-[#5c2c86]/20 rounded-full blur-[100px] animate-pulse mix-blend-multiply dark:mix-blend-screen" />
                    <div className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] bg-[#f28b2d]/20 rounded-full blur-[100px] animate-pulse delay-1000 mix-blend-multiply dark:mix-blend-screen" />
                </div>

                <div className="w-full max-w-6xl z-10">
                    <div className="text-center mb-10">
                        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm text-xs font-semibold text-zinc-500 mb-4">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                            AI 분석 엔진 활성화
                        </span>
                        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-3">
                            두 사람의 <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5c2c86] to-[#f28b2d]">운명을 확인하세요</span>
                        </h1>
                        <p className="text-zinc-500 dark:text-zinc-400 max-w-lg mx-auto">
                            사주 데이터를 기반으로 한 정밀 분석 알고리즘이<br className="md:hidden"/> 당신의 궁합 점수를 계산합니다.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col lg:flex-row items-stretch gap-6 lg:gap-0 relative">

                            {/* --- Person 1 Card --- */}
                            <div
                                className={`flex-1 flex flex-col bg-white dark:bg-zinc-900 rounded-3xl border transition-all duration-300 relative z-10 overflow-hidden
                                ${focusedSection === 0
                                    ? "border-[#5c2c86] shadow-[0_0_40px_-10px_rgba(92,44,134,0.3)] ring-1 ring-[#5c2c86]/20 scale-[1.01]"
                                    : "border-zinc-200 dark:border-zinc-800 shadow-xl opacity-90 grayscale-[0.3] hover:grayscale-0 hover:opacity-100"}`}
                                onClick={() => handleFocus(0)}
                            >
                                <div className="h-1.5 w-full bg-gradient-to-r from-[#5c2c86] to-[#9d4edd]"></div>

                                <div className="p-6 md:p-8 flex-1 flex flex-col">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-10 h-10 rounded-xl bg-[#5c2c86]/10 flex items-center justify-center text-[#5c2c86] font-bold text-lg">1</div>
                                        <div>
                                            <h3 className="font-bold text-lg">나 (본인)</h3>
                                            <p className="text-xs text-zinc-500">분석의 기준이 되는 사람</p>
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        {/* Name (한국어로 변경) */}
                                        <div>
                                            <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2 block">이름</label>
                                            <input
                                                type="text"
                                                placeholder="이름을 입력하세요"
                                                className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-[#5c2c86] transition-all font-medium"
                                                value={formData.p1.name}
                                                onChange={(e) => handleChange("p1", "name", e.target.value)}
                                                onFocus={() => handleFocus(0)}
                                            />
                                        </div>

                                        {/* Gender (한국어로 변경) */}
                                        <div>
                                            <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2 block">성별</label>
                                            <div className="grid grid-cols-2 gap-3">
                                                <button
                                                    type="button"
                                                    onClick={() => { handleChange("p1", "gender", 1); handleFocus(0); }}
                                                    className={`flex flex-col items-center justify-center gap-2 py-4 rounded-xl border transition-all duration-200 ${formData.p1.gender === 1 ? 'bg-[#5c2c86] border-[#5c2c86] text-white shadow-lg shadow-[#5c2c86]/25' : 'bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-zinc-400 hover:bg-zinc-50'}`}
                                                >
                                                    <MarsIcon className="w-6 h-6" />
                                                    <span className="text-xs font-bold">남자</span>
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => { handleChange("p1", "gender", 0); handleFocus(0); }}
                                                    className={`flex flex-col items-center justify-center gap-2 py-4 rounded-xl border transition-all duration-200 ${formData.p1.gender === 0 ? 'bg-[#5c2c86] border-[#5c2c86] text-white shadow-lg shadow-[#5c2c86]/25' : 'bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-zinc-400 hover:bg-zinc-50'}`}
                                                >
                                                    <VenusIcon className="w-6 h-6" />
                                                    <span className="text-xs font-bold">여자</span>
                                                </button>
                                            </div>
                                        </div>

                                        {/* Date (한국어로 변경) */}
                                        <div>
                                            <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2 block">생년월일</label>
                                            <div className="flex gap-2">
                                                <select
                                                    className="flex-1 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 py-3.5 focus:outline-none focus:ring-2 focus:ring-[#5c2c86] text-sm font-medium appearance-none cursor-pointer"
                                                    value={formData.p1.year}
                                                    onChange={(e) => handleChange("p1", "year", e.target.value)}
                                                    onFocus={() => handleFocus(0)}
                                                >
                                                    {years.map((y) => <option key={y} value={y}>{y}년</option>)}
                                                </select>
                                                <select
                                                    className="w-24 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 py-3.5 focus:outline-none focus:ring-2 focus:ring-[#5c2c86] text-sm font-medium appearance-none cursor-pointer text-center"
                                                    value={formData.p1.month}
                                                    onChange={(e) => handleChange("p1", "month", e.target.value)}
                                                    onFocus={() => handleFocus(0)}
                                                >
                                                    {months.map((m) => <option key={m} value={m}>{m}월</option>)}
                                                </select>
                                                <select
                                                    className="w-24 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 py-3.5 focus:outline-none focus:ring-2 focus:ring-[#5c2c86] text-sm font-medium appearance-none cursor-pointer text-center"
                                                    value={formData.p1.day}
                                                    onChange={(e) => handleChange("p1", "day", e.target.value)}
                                                    onFocus={() => handleFocus(0)}
                                                >
                                                    {days.map((d) => <option key={d} value={d}>{d}일</option>)}
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* --- Connector (Desktop) --- */}
                            <div className="hidden lg:flex flex-col items-center justify-center px-4 relative z-20">
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-full h-px bg-zinc-200 dark:bg-zinc-800 border-t border-dashed border-zinc-300 dark:border-zinc-700"></div>
                                </div>
                                <div className="w-14 h-14 rounded-full bg-white dark:bg-zinc-900 border-4 border-zinc-100 dark:border-zinc-800 shadow-xl flex items-center justify-center z-10">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-red-500">
                                        <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                                    </svg>
                                </div>
                            </div>

                            {/* --- Connector (Mobile) --- */}
                            <div className="lg:hidden flex items-center justify-center py-2 relative z-20">
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="h-full w-px bg-zinc-200 dark:bg-zinc-800 border-l border-dashed border-zinc-300 dark:border-zinc-700"></div>
                                </div>
                                <div className="w-12 h-12 rounded-full bg-white dark:bg-zinc-900 border-4 border-zinc-100 dark:border-zinc-800 shadow-lg flex items-center justify-center z-10">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-red-500">
                                        <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                                    </svg>
                                </div>
                            </div>


                            {/* --- Person 2 Card --- */}
                            <div
                                className={`flex-1 flex flex-col bg-white dark:bg-zinc-900 rounded-3xl border transition-all duration-300 relative z-10 overflow-hidden
                                ${focusedSection === 1
                                    ? "border-[#f28b2d] shadow-[0_0_40px_-10px_rgba(242,139,45,0.3)] ring-1 ring-[#f28b2d]/20 scale-[1.01]"
                                    : "border-zinc-200 dark:border-zinc-800 shadow-xl opacity-90 grayscale-[0.3] hover:grayscale-0 hover:opacity-100"}`}
                                onClick={() => handleFocus(1)}
                            >
                                <div className="h-1.5 w-full bg-gradient-to-r from-[#f28b2d] to-[#ffb74d]"></div>

                                <div className="p-6 md:p-8 flex-1 flex flex-col">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-10 h-10 rounded-xl bg-[#f28b2d]/10 flex items-center justify-center text-[#f28b2d] font-bold text-lg">2</div>
                                        <div>
                                            <h3 className="font-bold text-lg">상대방</h3>
                                            <p className="text-xs text-zinc-500">궁합을 확인할 대상</p>
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        {/* Name (한국어로 변경) */}
                                        <div>
                                            <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2 block">이름</label>
                                            <input
                                                type="text"
                                                placeholder="상대방의 이름을 입력하세요"
                                                className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-[#f28b2d] transition-all font-medium"
                                                value={formData.p2.name}
                                                onChange={(e) => handleChange("p2", "name", e.target.value)}
                                                onFocus={() => handleFocus(1)}
                                            />
                                        </div>

                                        {/* Gender (한국어로 변경) */}
                                        <div>
                                            <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2 block">성별</label>
                                            <div className="grid grid-cols-2 gap-3">
                                                <button
                                                    type="button"
                                                    onClick={() => { handleChange("p2", "gender", 1); handleFocus(1); }}
                                                    className={`flex flex-col items-center justify-center gap-2 py-4 rounded-xl border transition-all duration-200 ${formData.p2.gender === 1 ? 'bg-[#f28b2d] border-[#f28b2d] text-white shadow-lg shadow-[#f28b2d]/25' : 'bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-zinc-400 hover:bg-zinc-50'}`}
                                                >
                                                    <MarsIcon className="w-6 h-6" />
                                                    <span className="text-xs font-bold">남자</span>
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => { handleChange("p2", "gender", 0); handleFocus(1); }}
                                                    className={`flex flex-col items-center justify-center gap-2 py-4 rounded-xl border transition-all duration-200 ${formData.p2.gender === 0 ? 'bg-[#f28b2d] border-[#f28b2d] text-white shadow-lg shadow-[#f28b2d]/25' : 'bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-zinc-400 hover:bg-zinc-50'}`}
                                                >
                                                    <VenusIcon className="w-6 h-6" />
                                                    <span className="text-xs font-bold">여자</span>
                                                </button>
                                            </div>
                                        </div>

                                        {/* Date (한국어로 변경) */}
                                        <div>
                                            <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2 block">생년월일</label>
                                            <div className="flex gap-2">
                                                <select
                                                    className="flex-1 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 py-3.5 focus:outline-none focus:ring-2 focus:ring-[#f28b2d] text-sm font-medium appearance-none cursor-pointer"
                                                    value={formData.p2.year}
                                                    onChange={(e) => handleChange("p2", "year", e.target.value)}
                                                    onFocus={() => handleFocus(1)}
                                                >
                                                    {years.map((y) => <option key={y} value={y}>{y}년</option>)}
                                                </select>
                                                <select
                                                    className="w-24 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 py-3.5 focus:outline-none focus:ring-2 focus:ring-[#f28b2d] text-sm font-medium appearance-none cursor-pointer text-center"
                                                    value={formData.p2.month}
                                                    onChange={(e) => handleChange("p2", "month", e.target.value)}
                                                    onFocus={() => handleFocus(1)}
                                                >
                                                    {months.map((m) => <option key={m} value={m}>{m}월</option>)}
                                                </select>
                                                <select
                                                    className="w-24 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 py-3.5 focus:outline-none focus:ring-2 focus:ring-[#f28b2d] text-sm font-medium appearance-none cursor-pointer text-center"
                                                    value={formData.p2.day}
                                                    onChange={(e) => handleChange("p2", "day", e.target.value)}
                                                    onFocus={() => handleFocus(1)}
                                                >
                                                    {days.map((d) => <option key={d} value={d}>{d}일</option>)}
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Submit Action */}
                        <div className="mt-12 text-center max-w-2xl mx-auto">
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="group relative w-full overflow-hidden rounded-2xl bg-[#18181b] dark:bg-white p-4 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-[#5c2c86] to-[#f28b2d] opacity-90 transition-opacity group-hover:opacity-100" />
                                <div className="relative flex items-center justify-center gap-3 text-lg font-bold text-white">
                                    {isLoading ? (
                                        <>
                                            <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                                            <span>운명의 데이터를 분석중입니다...</span>
                                        </>
                                    ) : (
                                        <>
                                            <span>궁합 결과 확인하기</span>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 group-hover:translate-x-1 transition-transform">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                            </svg>
                                        </>
                                    )}
                                </div>
                            </button>
                            <p className="mt-4 text-xs text-zinc-400">
                                개인정보는 저장되지 않으며, 분석 후 즉시 파기됩니다.
                            </p>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
}