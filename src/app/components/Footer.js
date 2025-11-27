export default function Footer() {
    return (
        <footer className="bg-zinc-50 dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800 pt-16 pb-8 mt-auto">
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
                            <li>Frontend: React Native</li>
                            <li>Backend: Python, Django/FastAPI</li>
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
    );
}