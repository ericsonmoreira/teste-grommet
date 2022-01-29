import * as yup from 'yup';

const schema = yup.object({
  email: yup
    .string()
    .email('Email inválido')
    .required('Campo de email obrigatório'),
  password: yup.string().required('Campo de senha obrigatório'),
});

export default schema;
