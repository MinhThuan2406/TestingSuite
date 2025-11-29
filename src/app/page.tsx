"use client";


import Footer from "@/components/Footer";
import TestCard from "@/components/TestCard";
import { useRouter } from "next/navigation";
import {
  MdDesktopWindows,
  MdSpeakerGroup,
  MdKeyboard,
  MdMouse,
  MdVideocam,
  MdMemory,
} from "react-icons/md";
import { useLanguage } from "@/providers/Providers";

export default function Home() {
  const router = useRouter();
  const { t } = useLanguage();

  const tests = [
    {
      title: t.dashboard.cards.display.title,
      description: t.dashboard.cards.display.description,
      icon: <MdDesktopWindows />,
      path: "/tests/display/brightness",
    },
    {
      title: t.dashboard.cards.audio.title,
      description: t.dashboard.cards.audio.description,
      icon: <MdSpeakerGroup />,
      path: "/tests/audio",
    },
    {
      title: t.dashboard.cards.keyboard.title,
      description: t.dashboard.cards.keyboard.description,
      icon: <MdKeyboard />,
      path: "/tests/keyboard",
    },
    {
      title: t.dashboard.cards.mouse.title,
      description: t.dashboard.cards.mouse.description,
      icon: <MdMouse />,
      path: "/tests/mouse",
    },
    {
      title: t.dashboard.cards.webcam.title,
      description: t.dashboard.cards.webcam.description,
      icon: <MdVideocam />,
      path: "/tests/webcam",
    },
    {
      title: t.dashboard.cards.gamepad.title,
      description: t.dashboard.cards.gamepad.description,
      icon: <MdGamepadIcon />, // Helper component below
      path: "/tests/gamepad",
    },
    {
      title: t.dashboard.cards.performance.title,
      description: t.dashboard.cards.performance.description,
      icon: <MdMemory />,
      path: "/tests/performance",
    },
  ];

  const handleTestClick = (path: string | null) => {
    if (path) {
      router.push(path);
    } else {
      alert("This test is coming soon!");
    }
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-background text-foreground group/design-root">
      <div className="layout-container flex h-full grow flex-col">
        <div className="flex flex-1 justify-center py-1">
          <div className="layout-content-container flex flex-col w-full max-w-5xl px-4">


            <main className="flex-grow">
              {/* Hero Section */}
              <div className="py-2 sm:py-3 mb-16 sm:mb-20 text-center">
                <div className="flex flex-col gap-1">
                  <h1 className="text-4xl font-black leading-tight tracking-tighter sm:text-5xl text-gray-900 dark:text-white">
                    {t.dashboard.heroTitle}
                  </h1>
                  <h2 className="text-base font-normal leading-normal sm:text-lg text-gray-600 dark:text-[#9cadba]">
                    {t.dashboard.heroSubtitle}
                  </h2>
                </div>
              </div>

              {/* Test Grid */}
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 px-4 pb-12 justify-items-center">
                {tests.map((test, index) => (
                  <TestCard
                    key={index}
                    title={test.title}
                    description={test.description}
                    icon={test.icon}
                    onClick={() => handleTestClick(test.path)}
                    startTestLabel={t.common.startTest}
                  />
                ))}
              </div>
            </main>

            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper to avoid import conflict or just use MdUsb if preferred, but Gamepad icon is better
import { MdGamepad } from "react-icons/md";
function MdGamepadIcon() {
  return <MdGamepad />;
}
