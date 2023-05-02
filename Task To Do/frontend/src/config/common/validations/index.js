import * as Yup from 'yup'

const yupValidations = {
    loginSchema: Yup.object({
        emailAddress: Yup.string().email().required(),
        password: Yup.string().required().max(16).min(6)
    }),
    signupSchema: Yup.object({
        userName: Yup.string().required(),
        emailAddress: Yup.string().email().required(),
        password: Yup.string().required().max(16).min(6)
    }),
}

export default yupValidations;