import baseJoi from "joi";
import dateExtension from "@joi/date";
const joi = baseJoi.extend(dateExtension);

export const ordersSchema = joi.object({
    clientId: joi.number().integer().required().min(1),
    cakeId: joi.number().integer().required().min(1),
    quantity: joi.number().integer().required().min(1).max(4),
    totalPrice: joi.number().precision(2).required()
});
