export const getMonthComparisons = (month) => {
        return fetch('http://localhost:2249/api/Transactions/GetComparisonWithPreviousMonth?month=' month)
            .then(response => response.json())
            .then(json => {
                return json;
            });
        };
