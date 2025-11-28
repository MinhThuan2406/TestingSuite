"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MdVideocam, MdGamepad, MdUsb } from "react-icons/md";

export default function PeripheralsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    const navItems = [
        {
            name: "Webcam Test",
            href: "/tests/peripherals/webcam",
            icon: <MdVideocam />,
        },
        {
            name: "Gamepad Test",
            href: "/tests/peripherals/gamepad",
            icon: <MdGamepad />,
        },
    ];

    return (
        <div className="relative flex h-auto min-h-screen w-full flex-col bg-background text-foreground">
            <div className="flex h-full min-h-screen grow">
                {/* SideNavBar */}
                <aside className="hidden lg:flex w-72 flex-col justify-between border-r border-slate-200/10 bg-background-light p-4 dark:bg-background-dark/50">
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-3 p-2">
                            <div className="flex items-center justify-center rounded-full bg-primary/10 size-10 text-primary">
                                <MdUsb size={24} />
                            </div>
                            <div className="flex flex-col">
                                <h1 className="text-slate-900 dark:text-white text-base font-medium leading-normal">
                                    Peripherals
                                </h1>
                                <p className="text-slate-500 dark:text-slate-400 text-sm font-normal leading-normal">
                                    Device Testing
                                </p>
                            </div>
                        </div>
                        <nav className="flex flex-col gap-1">
                            {navItems.map((item) => {
                                const isActive = pathname === item.href;
                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors group ${isActive
                                            ? "bg-primary/20 text-primary"
                                            : "hover:bg-slate-200/60 dark:hover:bg-slate-800/60 text-slate-500 dark:text-slate-400"
                                            }`}
                                    >
                                        <span
                                            className={`text-xl ${isActive
                                                ? "text-primary"
                                                : "text-slate-500 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white"
                                                }`}
                                        >
                                            {item.icon}
                                        </span>
                                        <p
                                            className={`text-sm font-medium leading-normal ${isActive
                                                ? "text-primary"
                                                : "text-slate-500 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white"
                                                }`}
                                        >
                                            {item.name}
                                        </p>
                                    </Link>
                                );
                            })}
                        </nav>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 overflow-y-auto">{children}</main>
            </div>
        </div>
    );
}
