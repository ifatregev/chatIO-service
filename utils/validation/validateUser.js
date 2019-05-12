const Joi = require("joi");

module.exports = (user) => {
    const schema = {
        username: Joi.string().min(3).required(),
        name: Joi.string().min(3).required()
    };

    return Joi.validate(user, schema);
};