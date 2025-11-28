import { render, screen } from "@testing-library/react";
import Home from "./page";

// Mock child components
jest.mock("@/components/TestCard", () => {
    return function MockTestCard({ title }: { title: string }) {
        return <div data-testid="test-card">{title}</div>;
    };
});

jest.mock("@/components/TopNavBar", () => {
    return function MockTopNavBar() {
        return <div data-testid="top-nav-bar" />;
    };
});

jest.mock("@/components/Footer", () => {
    return function MockFooter() {
        return <div data-testid="footer" />;
    };
});

// Mock icons
jest.mock("react-icons/md", () => ({
    MdDesktopWindows: () => <div />,
    MdSpeakerGroup: () => <div />,
    MdKeyboard: () => <div />,
    MdMouse: () => <div />,
    MdUsb: () => <div />,
    MdMemory: () => <div />,
}));

// Mock useRouter
const mockPush = jest.fn();
jest.mock("next/navigation", () => ({
    useRouter: () => ({
        push: mockPush,
    }),
}));

describe("Home Page", () => {
    beforeEach(() => {
        mockPush.mockClear();
    });

    it("renders the hero section", () => {
        render(<Home />);
        expect(
            screen.getByText("Test Your Hardware. Instantly.")
        ).toBeInTheDocument();
    });

    it("renders all test cards", () => {
        render(<Home />);
        const testCards = screen.getAllByTestId("test-card");
        expect(testCards).toHaveLength(6);
    });
});
