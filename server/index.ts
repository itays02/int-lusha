import { Router } from "express";
import { findAllPizzas, addNewPizza } from './controllers/pizza.controller'
import { Topping } from "./interfaces/topping.enum";
export const router = Router();

router.get('/health', (req, res) => {
        res.send('Service is up!');
});

router.get('/pizza', (req, res) => {
        findAllPizzas()
                .then(pizzas => res.send({ data: pizzas }))
                .catch(err => res.status(400).send({ msg: "Error in getting pizza status", err }));
});

router.post('/pizza', (req, res) => {
        const { pizzas } = req.body
        addNewPizza(pizzas)
                .then(() => res.sendStatus(200))
                .catch(err => res.status(400).send({ msg: err.message }));
})

router.get('/toppings', (req, res) => {
        res.send(Object.values(Topping))
});
