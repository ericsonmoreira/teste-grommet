import * as yup from 'yup';

const schema = yup.object({
  displayName: yup.string().required('Campo de nome obrigatório'),
  photoURL: yup.string(),
});

export default schema;
