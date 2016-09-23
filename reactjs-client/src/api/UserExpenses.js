export const getUserExpenses = (user, month, year) => {
        return fetch('http://localhost:2249/api/Transactions/GetForUser?username=' + user + '&month=' + month + '&year=' + year)
            .then(response => response.json())
            .then(json => {
                return json;
            });
        };
