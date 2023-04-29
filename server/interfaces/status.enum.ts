export enum Status {
  Waiting = 'waiting',
  DoughChef = 'doughChef',
  ToppingChef = 'toppingChef',
  Oven = 'oven',
  Serving = 'serving',
  Done = 'done'
}

export const StatusLabels = {
  [Status.Waiting]: 'Waiting',
  [Status.DoughChef]: 'Dough Chef',
  [Status.ToppingChef]: 'Topping Chef',
  [Status.Oven]: 'Oven',
  [Status.Serving]: 'Serving',
  [Status.Done]: 'Done'
}