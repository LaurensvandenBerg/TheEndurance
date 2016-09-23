export const getExpenses = (c) => {
        return fetch('http://localhost:2249/api/Categories?categoryTitle=' + c)
            .then(response => response.json())
            .then(json => {
                return json;
            });
        };
