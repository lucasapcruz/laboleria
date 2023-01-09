export function validateSchema(schema) {
  return (req, res, next) => {
    const payload = req.body;

    const { error } = schema.validate(payload, { abortEarly: true });

    if(error){
      const errorMessages = error.details.map((detail) => detail.message);
      if(errorMessages[0].includes("image")){
        return res.status(422).send(errorMessages);
      }else{
        return res.status(400).send(errorMessages);
      }
    }
    
    next();
  }
}
