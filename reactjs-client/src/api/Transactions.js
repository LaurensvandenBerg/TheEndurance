export const getTransactions = () => {
        return fetch("http://localhost:2249/api/transactions")
            .then(response => response.json())
            .then(json => {
                return json;
        });
    };