import mongoose from 'mongoose';
import { Status } from "../interfaces/status.enum";
import { Topping } from "../interfaces/topping.enum";

const Schema = mongoose.Schema

const PizzaSchema = new Schema({
    toppings: { type: [String], enum: Object.values(Topping) },
    status: { type: String, enum: Object.values(Status), default: Status.Waiting },
    createdAt: { type: Date, default: Date.now }
});

const PizzaModel = mongoose.model('Pizza', PizzaSchema);

export default PizzaModel;
