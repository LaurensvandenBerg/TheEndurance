export const getUsers = () => {
        return fetch("http://localhost:2249/api/User")
            .then(response => response.json())
            .then(json => {
                return json;
        });
    };
