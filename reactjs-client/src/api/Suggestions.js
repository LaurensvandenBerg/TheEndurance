export const getSuggestionsFor = (user) => {
        return fetch('http://localhost:2249/api/Suggestions/GetForUser?username=' + user )
            .then(response => response.json())
            .then(json => {
                return json;
            });
        };
