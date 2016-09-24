export const getMonthComparisons = (username, month) => {
        return fetch('http://localhost:2249/api/Transactions/GetComparisonWithPreviousMonth?username=' + username)
            .then(response => response.json())
            .then(json => {
                return json;
            });
        };
