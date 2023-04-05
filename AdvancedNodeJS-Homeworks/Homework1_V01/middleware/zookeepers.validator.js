import joi from 'joi'

const zookeeperSchema = joi.object({
  name: joi.string().required(),
  age: joi.number().min(18).max(45).required(),
  location: joi.string().required(),
  isActive: joi.boolean().required(),
})

const zookeeperValidator = (req, res, next) => {
  const zookeeper = req.body
  const validate = zookeeperSchema.validate(zookeeper)

  if (validate?.error) {
    res.status(400).send(validate?.error?.details[0]?.message)
  } else {
    next()
  }
}

export default zookeeperValidator
