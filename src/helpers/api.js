const axios = require('axios');

module.exports = {
    isEmailExists: email => axios.get(`/user/validate?email=${email}`)
        .then(response => response.data)
        .catch(function (error) {
            console.log(error);
            return { error, message: 'failed to verify email' }
        }),
    getUsers: (start) => axios.get(`/user?start=${start}`)
        .then(function (response) {
            return response.data;
        }).catch(function (error) {
            console.log(error);
            return { error, message: 'failed to get users' }
        }),
    createUser: (user) => axios.post('/user', user)
        .then(function (response) {
            return response.data;
        }).catch(function (error) {
            console.log(error);
            return { error, message: 'failed to create a user' }
        }),
};
