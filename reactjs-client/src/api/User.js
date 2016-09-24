export const getSpecificUser = (user) => {
        return fetch('http://localhost:2249/api/User/GetSpecificUser?username=' + user )
            .then(response => response.json())
            .then(json => {
                return json;
        });
    };
