import * as yup from 'yup';

const schema = yup.object({
  email: yup
    .string()
    .email('Email inválido')
    .required('Campo de email obrigatório'),
  password: yup
    .string()
    .required('Campo de senha obrigatório')
    .min(6, 'Mínimo 6 caracteres'),
  passwordConfirmation: yup
    .string()
    .required('Campo de email obrigatório')
    .min(6, 'Mínimo 6 caracteres')
    .oneOf([yup.ref('password'), null], 'Senhas precisar ser iguais'),
});

export default schema;
