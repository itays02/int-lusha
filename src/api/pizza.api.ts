import axios, * as others from 'axios';

export const getToppingsList = () => axios.get(`/toppings`)
    .then(function (response) {
        return response.data;
    }).catch(function (error) {
        console.log(error);
        return { error, message: 'failed to get toppings' }
    })

export const getPizzaStatus = () => axios.get(`/pizza`)
    .then(function (response) {
        return response.data;
    }).catch(function (error) {
        console.log(error);
        return { error, message: 'failed to get pizza status' }
    })

export const addPizzas = pizzas => axios.post('/pizza', { pizzas })
    .then(function (response) {
        return response.data;
    }).catch(function (error) {
        console.log(error);
        return { error, message: 'failed to add pizzas' }
    })
