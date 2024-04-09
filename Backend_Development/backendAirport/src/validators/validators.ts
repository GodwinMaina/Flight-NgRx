import Joi, { ref } from 'joi'

export const bookingSchema= Joi.object({
    Name:Joi.string().required(),
    Email:Joi.string().required().email().messages({
        'string.empty':' Please add an Email',
        'string.email':'Not a Valid Email'
    }),
    Destination:Joi.string().required(),
    TravelDate:Joi.string().required()
})


export const RegistrationSchema= Joi.object({
     Name:Joi.string().required(),
     Email:Joi.string().required().email().messages({
        'string.empty':' Please add an Email',
        'string.email':'Not a Valid Email'
    }),
    Password:Joi.string().required(),
    ConfirmPassword:Joi.equal(ref('Password'))
})

export const LoginSchema= Joi.object({
     Email:Joi.string().required().email().messages({
        'string.empty':' Please add an Email',
        'string.email':'Not a Valid Email'
    }),
    Password:Joi.string().required(),

})