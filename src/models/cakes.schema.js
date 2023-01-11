import baseJoi from "joi";
import dateExtension from "@joi/date";
const joi = baseJoi.extend(dateExtension);

export const cakesSchema = joi.object({
    name: joi.string().required().min(2),
    price: joi.number().precision(2).required(),
    image: joi.string().uri().required(),
    description: joi.string().required().allow("")
});
