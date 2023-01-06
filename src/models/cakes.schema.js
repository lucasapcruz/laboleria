import baseJoi from "joi";
import dateExtension from "@joi/date";
const joi = baseJoi.extend(dateExtension);

export const cakesSchema = joi.object({
    name: joi.string().required().min(2)
});
