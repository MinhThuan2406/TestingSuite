import { render, screen } from "@testing-library/react";
import TopNavBar from "./TopNavBar";

describe("TopNavBar", () => {
    it("renders the logo and title", () => {
        render(<TopNavBar />);
        expect(screen.getByText("HardwareTest Pro")).toBeInTheDocument();
    });

    it("renders navigation links", () => {
        render(<TopNavBar />);
        expect(screen.getByText("Tests")).toBeInTheDocument();
        expect(screen.getByText("About")).toBeInTheDocument();
        expect(screen.getByText("Support")).toBeInTheDocument();
    });
});
