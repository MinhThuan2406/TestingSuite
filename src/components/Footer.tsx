import Link from "next/link";

export default function Footer() {
    return (
        <footer className="flex flex-col gap-1 px-5 py-1 text-center">
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-4">
                {/* <Link
                    href="#"
                    className="text-base font-normal leading-normal text-gray-600 dark:text-[#9cadba] hover:text-primary dark:hover:text-primary transition-colors"
                >
                    Privacy Policy
                </Link>
                <Link
                    href="#"
                    className="text-base font-normal leading-normal text-gray-600 dark:text-[#9cadba] hover:text-primary dark:hover:text-primary transition-colors"
                >
                    Terms of Service
                </Link>
                <Link
                    href="#"
                    className="text-base font-normal leading-normal text-gray-600 dark:text-[#9cadba] hover:text-primary dark:hover:text-primary transition-colors"
                >
                    Support
                </Link> */}
            </div>
            <p className="text-sm font-normal leading-normal text-gray-500 dark:text-[#9cadba]">
                © {new Date().getFullYear()} MinhThuan2406. All rights reserved.
            </p>
        </footer>
    );
}
