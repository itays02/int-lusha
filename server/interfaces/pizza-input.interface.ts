import { Status } from "./status.enum";
import { Topping } from "./topping.enum";


export interface IPizzaDTO {
  toppings: Topping[]
}

export interface IPizza {
  id: string,
  toppings: Topping[],
  status: Status,
  createdAt: Date
}