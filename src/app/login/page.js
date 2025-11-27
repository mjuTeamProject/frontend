import Link from "next/link";
import NavBar from "../components/NavBar";

export default function LoginPage() {
    return (
        <>
            <NavBar>
                <Link
                    href="/signup"
                    className="text-sm font-medium hover:text-[#5c2c86] transition-colors"
                >
                    회원가입
                </Link>
            </NavBar>

            <main className="flex-grow flex items-center justify-center px-6 py-12 relative overflow-hidden">
                {/* Background Decorations */}
                <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-[#5c2c86]/10 rounded-full blur-3xl -z-10 animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-[#f28b2d]/10 rounded-full blur-3xl -z-10 animate-pulse delay-700" />

                <div className="w-full max-w-md bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xl p-8 md:p-10 relative z-10">
                    <div className="text-center mb-8">
                        <h1 className="text-2xl md:text-3xl font-bold mb-2 text-zinc-900 dark:text-white">
                            다시 오셨군요! 👋
                        </h1>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400">
                            서비스 이용을 위해 로그인을 진행해주세요.
                        </p>
                    </div>

                    <form className="space-y-5">
                        <div>
                            <label
                                htmlFor="username"
                                className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5"
                            >
                                아이디
                            </label>
                            <input
                                id="username"
                                type="text"
                                placeholder="아이디를 입력해주세요"
                                className="w-full px-4 py-3 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 focus:outline-none focus:ring-2 focus:ring-[#5c2c86]/20 focus:border-[#5c2c86] transition-all text-sm"
                            />
                        </div>

                        <div>
                            <div className="flex items-center justify-between mb-1.5">
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
                                >
                                    비밀번호
                                </label>
                                <Link
                                    href="/forgot-password"
                                    className="text-xs text-[#5c2c86] hover:underline"
                                >
                                    비밀번호 찾기
                                </Link>
                            </div>
                            <input
                                id="password"
                                type="password"
                                placeholder="비밀번호를 입력해주세요"
                                className="w-full px-4 py-3 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 focus:outline-none focus:ring-2 focus:ring-[#5c2c86]/20 focus:border-[#5c2c86] transition-all text-sm"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-[#5c2c86] hover:bg-[#4a236d] text-white font-bold py-3.5 rounded-lg shadow-md hover:shadow-lg hover:opacity-95 transition-all transform active:scale-[0.98]"
                        >
                            로그인하기
                        </button>
                    </form>

                    <p className="mt-8 text-center text-sm text-zinc-500">
                        아직 계정이 없으신가요?{" "}
                        <Link
                            href="/signup"
                            className="font-bold text-[#5c2c86] hover:text-[#f28b2d] transition-colors"
                        >
                            회원가입 하러가기
                        </Link>
                    </p>
                </div>
            </main>
        </>
    );
}