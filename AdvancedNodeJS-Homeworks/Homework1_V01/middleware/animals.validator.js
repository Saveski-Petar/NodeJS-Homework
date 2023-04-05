import joi from 'joi'

const animalSchema = joi.object({
  name: joi.string().required(),
  type: joi.string().required().min(2),
  age: joi.number().required().min(1),
  location: joi.string().required(),
  gender: joi.string().required().min(4).max(6),
  characteristics: {
    food: joi.array().items(joi.string()).required(),
    colour: joi.string().required(),
    isDangerous: joi.boolean().required(),
    weight: joi.number().required().min(1),
    enclosure: joi.string().required(),
  },
})

const animalValidator = (req, res, next) => {
  const animal = req.body
  const validate = animalSchema.validate(animal)

  if (validate?.error) {
    res.status(400).send(validate?.error?.details[0]?.message)
  } else {
    next()
  }
}

export default animalValidator
