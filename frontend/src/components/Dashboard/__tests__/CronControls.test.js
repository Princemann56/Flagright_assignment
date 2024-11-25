import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CronControls from "../CronControls";

describe("CronControls Component", () => {
    const mockOnStart = jest.fn();
    const mockOnStop = jest.fn();

    it("calls onStart when Start Cron Job is clicked", () => {
        render(
            <CronControls
                isRunning={false}
                onStart={mockOnStart}
                onStop={mockOnStop}
            />
        );

        const startButton = screen.getByText("Start Cron Job");
        fireEvent.click(startButton);

        expect(mockOnStart).toHaveBeenCalled();
    });

    it("calls onStop when Stop Cron Job is clicked", () => {
        render(
            <CronControls
                isRunning={true}
                onStart={mockOnStart}
                onStop={mockOnStop}
            />
        );

        const stopButton = screen.getByText("Stop Cron Job");
        fireEvent.click(stopButton);

        expect(mockOnStop).toHaveBeenCalled();
    });
});
