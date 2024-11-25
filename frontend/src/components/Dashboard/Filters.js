import React, { useState } from 'react';
import './filter.css';

const Filters = ({ filters, onFilterChange, onClearFilter }) => {
    const [selectedFilter, setSelectedFilter] = useState('');
    const [filterValue, setFilterValue] = useState('');

    const handleFilterSelection = (filter) => {
        setSelectedFilter(filter);
        setFilterValue('');
    };

    const handleApplyFilter = () => {
        if (selectedFilter && filterValue !== '') {
            onFilterChange(selectedFilter, filterValue);
        }
    };

    return (
        <div className="filters-card card p-4 mb-4">
            <h4 className="text-primary">Filter By</h4>
            <div className="mb-3">
                <label htmlFor="filterBy" className="form-label">Choose a Filter</label>
                <select
                    id="filterBy"
                    className="form-select"
                    value={selectedFilter}
                    onChange={(e) => handleFilterSelection(e.target.value)}
                >
                    <option value="">Select a filter</option>
                    {Object.keys(filters).map((filterKey) => (
                        <option key={filterKey} value={filterKey}>
                            {filterKey.charAt(0).toUpperCase() + filterKey.slice(1)}
                        </option>
                    ))}
                </select>
            </div>

            {selectedFilter && (
                <div className="mb-3">
                    <label htmlFor="filterValue" className="form-label">
                        Enter {selectedFilter.charAt(0).toUpperCase() + selectedFilter.slice(1)}
                    </label>
                    <input
                        id="filterValue"
                        type="text"
                        className="form-control"
                        value={filterValue}
                        onChange={(e) => setFilterValue(e.target.value)}
                        placeholder={`Enter value for ${selectedFilter}`}
                    />
                </div>
            )}

            {selectedFilter && (
                <div className="d-flex gap-3">
                    <button
                        onClick={handleApplyFilter}
                        className="btn btn-primary"
                        disabled={!filterValue}
                    >
                        Apply Filter
                    </button>
                    <button
                        onClick={() => {
                            setSelectedFilter('');
                            setFilterValue('');
                            onClearFilter();
                        }}
                        className="btn btn-danger"
                    >
                        Clear Filter
                    </button>
                </div>
            )}
        </div>
    );
};

export default Filters;
