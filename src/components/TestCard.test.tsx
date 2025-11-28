import { render, screen, fireEvent } from "@testing-library/react";
import TestCard from "./TestCard";
import { MdDesktopWindows } from "react-icons/md";

describe("TestCard", () => {
    it("renders title and description correctly", () => {
        const title = "Display Test";
        const description = "Check for dead pixels";
        render(
            <TestCard
                title={title}
                description={description}
                icon={<MdDesktopWindows data-testid="icon" />}
            />
        );

        expect(screen.getByText(title)).toBeInTheDocument();
        expect(screen.getByText(description)).toBeInTheDocument();
        expect(screen.getByTestId("icon")).toBeInTheDocument();
    });

    it("calls onClick when button is clicked", () => {
        const handleClick = jest.fn();
        render(
            <TestCard
                title="Test"
                description="Desc"
                icon={<MdDesktopWindows />}
                onClick={handleClick}
            />
        );

        fireEvent.click(screen.getByText("Start Test"));
        expect(handleClick).toHaveBeenCalledTimes(1);
    });
});
