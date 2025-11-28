"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MdDashboard } from "react-icons/md";

export default function TopNavBar() {
    const pathname = usePathname();
    const isHomePage = pathname === "/";

    return (
        <header className="flex items-center justify-between whitespace-nowrap border-b border-gray-200 dark:border-b-[#283239] px-4 sm:px-10 py-3">
            <Link href="/" className="flex items-center gap-4">
                <div className="size-6 text-primary">
                    <svg
                        fill="currentColor"
                        viewBox="0 0 48 48"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M42.4379 44C42.4379 44 36.0744 33.9038 41.1692 24C46.8624 12.9336 42.2078 4 42.2078 4L7.01134 4C7.01134 4 11.6577 12.932 5.96912 23.9969C0.876273 33.9029 7.27094 44 7.27094 44L42.4379 44Z"></path>
                    </svg>
                </div>
                <h2 className="text-lg font-bold leading-tight tracking-[-0.015em] text-gray-900 dark:text-white">
                    HardwareTest Pro
                </h2>
            </Link>
            <nav className="flex items-center gap-4 sm:gap-8">
                {!isHomePage ? (
                    <Link
                        href="/"
                        className="flex items-center gap-2 text-sm font-medium leading-normal text-primary hover:text-primary/80 transition-colors"
                    >
                        <MdDashboard className="text-lg" />
                        <span className="hidden sm:inline">Return to Dashboard</span>
                    </Link>
                ) : (
                    <div className="hidden sm:flex items-center gap-9">
                        <Link
                            href="#"
                            className="text-sm font-medium leading-normal text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors"
                        >
                            Tests
                        </Link>
                        <Link
                            href="#"
                            className="text-sm font-medium leading-normal text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors"
                        >
                            About
                        </Link>
                        <Link
                            href="#"
                            className="text-sm font-medium leading-normal text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors"
                        >
                            Support
                        </Link>
                    </div>
                )}
            </nav>
        </header>
    );
}
