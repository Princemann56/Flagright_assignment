import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Filters from "../Filters";

describe("Filters Component", () => {
    const mockFilters = {
        userID: "",
        description: "",
        tags: "",
        dateFrom: "",
        dateTo: "",
    };
    const mockOnFilterChange = jest.fn();
    const mockOnClearFilter = jest.fn();

    it("handles filter changes and applies filter", () => {
        render(
            <Filters
                filters={mockFilters}
                onFilterChange={mockOnFilterChange}
                onClearFilter={mockOnClearFilter}
            />
        );

        // Simulate selecting a filter and entering a value
        fireEvent.change(screen.getByLabelText("Choose a Filter"), {
            target: { value: "description" },
        });
        fireEvent.change(
            screen.getByPlaceholderText("Enter value for description"),
            { target: { value: "Test Description" } }
        );
        fireEvent.click(screen.getByText("Apply Filter"));

        // Verify the onFilterChange handler was called with correct arguments
        expect(mockOnFilterChange).toHaveBeenCalledWith(
            "description",
            "Test Description"
        );
    });

    it("clears filters when Clear Filter is clicked", () => {
        render(
            <Filters
                filters={mockFilters}
                onFilterChange={mockOnFilterChange}
                onClearFilter={mockOnClearFilter}
            />
        );

        // Simulate selecting a filter
        fireEvent.change(screen.getByLabelText("Choose a Filter"), {
            target: { value: "description" },
        });

        // Locate and click the "Clear Filter" button
        const clearButton = screen.getByRole("button", { name: /Clear Filter/i });
        fireEvent.click(clearButton);

        // Verify the onClearFilter handler was called
        expect(mockOnClearFilter).toHaveBeenCalled();
    });
});
