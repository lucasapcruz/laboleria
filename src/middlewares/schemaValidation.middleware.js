export function validateSchema(schema) {
  return (req, res, next) => {
    const payload = req.body;

    const { error } = schema.validate(payload, { abortEarly: false });

    if (error) {
      const errors = error.details.map((detail) => detail.message);
      return res.status(400).send(errors);
    }

    next();
  }
}
