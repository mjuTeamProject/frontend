import Image from "next/image";
import Link from "next/link";

export default function NavBar({ children }) {
    return (
        <nav className="w-full border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md sticky top-0 z-50">
            <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
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
                <div className="flex items-center gap-4">
                    {children}
                </div>
            </div>
        </nav>
    );
}