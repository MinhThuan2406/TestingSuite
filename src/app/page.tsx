"use client";


import Footer from "@/components/Footer";
import TestCard from "@/components/TestCard";
import { useRouter } from "next/navigation";
import {
  MdDesktopWindows,
  MdSpeakerGroup,
  MdKeyboard,
  MdMouse,
  MdUsb,
  MdMemory,
} from "react-icons/md";

export default function Home() {
  const router = useRouter();

  const tests = [
    {
      title: "Display Test",
      description: "Check for dead pixels, color accuracy, and screen bleed.",
      icon: <MdDesktopWindows />,
      path: "/tests/display/dead-pixels", // Defaulting to dead pixels as entry or we could create a landing
    },
    {
      title: "Speaker & Audio Test",
      description:
        "Test stereo channels, frequency response, and microphone input.",
      icon: <MdSpeakerGroup />,
      path: "/tests/audio",
    },
    {
      title: "Keyboard Test",
      description: "Verify key presses, ghosting, and rollover functionality.",
      icon: <MdKeyboard />,
      path: "/tests/keyboard",
    },
    {
      title: "Mouse Test",
      description: "Test clicks, scrolling, DPI, and polling rate.",
      icon: <MdMouse />,
      path: "/tests/mouse",
    },
    {
      title: "External Peripherals",
      description: "A general test for webcam and other connected USB devices.",
      icon: <MdUsb />,
      path: null,
    },
    {
      title: "CPU & RAM Test",
      description: "A simple stress test to check basic performance metrics.",
      icon: <MdMemory />,
      path: null,
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
        <div className="flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col w-full max-w-5xl px-4">


            <main className="flex-grow">
              {/* Hero Section */}
              <div className="py-16 sm:py-24 text-center">
                <div className="flex flex-col gap-4">
                  <h1 className="text-4xl font-black leading-tight tracking-tighter sm:text-5xl text-gray-900 dark:text-white">
                    Test Your Hardware. Instantly.
                  </h1>
                  <h2 className="text-base font-normal leading-normal sm:text-lg text-gray-600 dark:text-[#9cadba]">
                    A suite of free, browser-based tools to check your PC and
                    laptop components.
                  </h2>
                </div>
              </div>

              {/* Test Grid */}
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 p-4">
                {tests.map((test, index) => (
                  <TestCard
                    key={index}
                    title={test.title}
                    description={test.description}
                    icon={test.icon}
                    onClick={() => handleTestClick(test.path)}
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
