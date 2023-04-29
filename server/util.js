import { Status } from "./interfaces/status.enum";

export const STAGE_ORDER = [Status.Waiting, Status.DoughChef, Status.ToppingChef, Status.Oven, Status.Serving, Status.Done]

export const STAGE_EFFORT = {
	[Status.DoughChef]: { max: 2, time: 7 },
	[Status.ToppingChef]: { max: 6, time: 4 },
	[Status.Oven]: { max: 1, time: 10 },
	[Status.Serving]: { max: 2, time: 5 }
}