import pick from 'lodash.pick'
import { IPizzaDTO } from "../interfaces/pizza-input.interface";
import PizzaModel from "../models/pizza.model";
import ProccessPizzaUseCase from '../use-cases/process-pizza.use-case'
import { Status, StatusLabels } from '../interfaces/status.enum';
const proccessPizzaUseCase = new ProccessPizzaUseCase()

export const findAllPizzas = async () => {
  const pizzasStatus = await PizzaModel.find({}).sort({ createdAt: -1 }) || []

  return pizzasStatus.map(pizza => {
    const id = pizza._id;
    const status = StatusLabels[pizza.status] || StatusLabels[Status.Waiting]
    return {
      ...pick(pizza, ['toppings', 'createdAt']),
      id, status
    }
  })
}

export const addNewPizza = async (pizzaDtos: IPizzaDTO[]) => {
  try {
    const pizzasFromDB = await PizzaModel.insertMany(pizzaDtos)
    const mappedPizzas = pizzasFromDB.map(pizza => pick(pizza, ['id', 'toppings', 'createdAt', 'status']))
    proccessPizzaUseCase.addNewPizza(mappedPizzas)

  } catch (err) {
    console.log('error in creating new user', err)
    throw new Error('error in creating new user')
  }
}