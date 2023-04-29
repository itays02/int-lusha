import { IPizza } from "../interfaces/pizza-input.interface";
import { Status } from "../interfaces/status.enum";
import PizzaModel from "../models/pizza.model";
import { STAGE_EFFORT, STAGE_ORDER } from "../util";

export default class ProccessPizzaUseCase {

  waitingPizzas = []
  pizzasLimit = {
    [Status.DoughChef]: { max: STAGE_EFFORT.doughChef.max, count: 0 },
    [Status.ToppingChef]: { max: STAGE_EFFORT.toppingChef.max, count: 0 },
    [Status.Oven]: { max: STAGE_EFFORT.oven.max, count: 0 },
    [Status.Serving]: { max: STAGE_EFFORT.serving.max, count: 0 }

  }

  addNewPizza(mappedPizzas: IPizza[]) {
    this.waitingPizzas.push(...mappedPizzas)
    this.handlePizzas()
  }

  async handlePizzas() {
    const pizza = this.waitingPizzas.shift()
    if (pizza) {
      const pizzaLimit = this.pizzasLimit[pizza.status]
      if (pizzaLimit) {
        this.pizzasLimit[pizza.status].count += 1;
        if (pizzaLimit.count + 1 < pizzaLimit.max) {
          this.handlePizzas()
        }
      }
      const timeout = (STAGE_EFFORT[pizza.status]?.time || 0) * 1000
      setTimeout(async () => {
        await this.updatePizzaStatus(pizza)
        this.handlePizzas()
      }, timeout)

    }
  }

  async updatePizzaStatus(pizza: IPizza) {
    const nextStepIndex = STAGE_ORDER.findIndex(status => status === pizza.status) + 1
    if (nextStepIndex < STAGE_ORDER.length) {
      pizza.status = STAGE_ORDER[nextStepIndex]
      await PizzaModel.findByIdAndUpdate(pizza.id, { status: pizza.status })
      if (this.pizzasLimit[pizza.status]) {
        this.pizzasLimit[pizza.status].count -= 1;
      }
      if (pizza.status !== Status.Done) {

        this.waitingPizzas.unshift(pizza)
      }
    }
  }
}