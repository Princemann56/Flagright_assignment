import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SortOptions from "../SortOptions";

describe("SortOptions Component", () => {
    const mockOnSortChange = jest.fn();
    const mockOnApplySort = jest.fn();

    it("changes sort options", () => {
        render(
            <SortOptions
                selectedSort="amount"
                onSortChange={mockOnSortChange}
                onApplySort={mockOnApplySort}
            />
        );

        fireEvent.change(screen.getByLabelText("Sort By"), {
            target: { value: "dateTime" },
        });
        expect(mockOnSortChange).toHaveBeenCalledWith("dateTime");
    });

    it("applies ascending and descending sort", () => {
        render(
            <SortOptions
                selectedSort="amount"
                onSortChange={mockOnSortChange}
                onApplySort={mockOnApplySort}
            />
        );

        fireEvent.click(screen.getByText("Ascending"));
        expect(mockOnApplySort).toHaveBeenCalledWith("asc");

        fireEvent.click(screen.getByText("Descending"));
        expect(mockOnApplySort).toHaveBeenCalledWith("desc");
    });
});
