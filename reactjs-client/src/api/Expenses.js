export const getExpenses = (user, cat, month, year) => {
        return fetch('http://localhost:2249/api/Categories/GetForUser?username=' + user + '&categoryTitle=' + cat + '&month=' + month + '&year=' + year)
            .then(response => response.json())
            .then(json => {
                return json;
            });
        };
