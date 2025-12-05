import Link from "next/link";
import Image from "next/image";

export default function Footer() {
    return (
        <footer className="bg-white dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800 pt-16 pb-8 mt-auto">
            <div className="max-w-6xl mx-auto px-6">

                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">

                    <div className="md:col-span-4 space-y-4">
                        <Link href="/" className="flex items-center gap-2 mb-2">
                            <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#5c2c86] to-[#f28b2d]">
                                Soulmatch
                            </span>
                        </Link>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                            AI 기술과 명리학 데이터를 결합하여<br />
                            당신의 운명적인 상대를 분석해드립니다.<br />
                            새로운 차원의 데이팅 경험을 시작해보세요.
                        </p>
                    </div>

                    <div className="hidden md:block md:col-span-2"></div>

                    <div className="md:col-span-6 grid grid-cols-2 sm:grid-cols-3 gap-8">

                        <div>
                            <h4 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-4">Service</h4>
                            <ul className="space-y-3 text-sm text-zinc-500 dark:text-zinc-400">
                                <li>
                                    <Link href="/match" className="hover:text-[#5c2c86] dark:hover:text-[#f28b2d] transition-colors">궁합 분석</Link>
                                </li>
                                <li>
                                    <Link href="/rankingPage" className="hover:text-[#5c2c86] dark:hover:text-[#f28b2d] transition-colors">랭킹 확인</Link>
                                </li>
                                <li>
                                    <Link href="/login" className="hover:text-[#5c2c86] dark:hover:text-[#f28b2d] transition-colors">로그인</Link>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-4">Team Mate</h4>
                            <ul className="space-y-3 text-sm text-zinc-500 dark:text-zinc-400">
                                <li>명지대학교 컴퓨터공학과</li>
                                <li>팀프로젝트1 (7조)</li>
                                <li className="pt-2">
                                    <span className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Advisor</span><br/>
                                    한승철 교수님
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-4">Stack</h4>
                            <ul className="space-y-3 text-sm text-zinc-500 dark:text-zinc-400">
                                <li>Next.js / React</li>
                                <li>FastAPI / Python</li>
                                <li>TensorFlow</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="border-t border-zinc-200 dark:border-zinc-800 my-8"></div>

                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-zinc-400">
                        © 2025 Soulmatch Project. Myongji Univ. All rights reserved.
                    </p>

                    <div className="flex items-center gap-6">
                        <Link href="#" className="text-xs text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors">
                            개인정보처리방침
                        </Link>
                        <Link href="#" className="text-xs text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors">
                            이용약관
                        </Link>
                        <a
                            href="https://github.com/mjuTeamProject"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-zinc-400 hover:text-[#5c2c86] transition-colors"
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}