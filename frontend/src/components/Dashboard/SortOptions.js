import React from 'react';
import './sortOption.css';


const SortOptions = ({ selectedSort, onSortChange, onApplySort }) => (
    <div className="sort-options-card card p-4 mb-4">
        <h4 className="text-primary">Sort Transactions</h4>
        <div className="mb-3">
            <label htmlFor="sortBy" className="form-label">Sort By</label>
            <select
                id="sortBy"
                className="form-select"
                value={selectedSort}
                onChange={(e) => onSortChange(e.target.value)}
            >
                <option value="amount">Amount</option>
                <option value="dateTime">Date</option>
            </select>
        </div>
        <div className="sort-buttons">
            <button
             type="button"
                onClick={() => onApplySort('asc')}
                className="btn btn-sort btn-primary me-2"
            >
                Ascending
            </button>
            <button
             type="button"
                onClick={() => onApplySort('desc')}
                className="btn btn-sort btn-secondary"
            >
                Descending
            </button>
        </div>
    </div>
);

export default SortOptions;
