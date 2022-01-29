import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Heading, Spinner, Text } from 'grommet';
import { Lock, User } from 'grommet-icons';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { CustonField } from '../../components/CustonField';
import { useFirebaseAuth, useSize } from '../../hooks';
import { BasicLayout } from '../../layout/BasicLayout';
import { ROUTER_NAMES } from '../../routes/names';
import schema from './schema';

interface SignUpPageFormData {
  email: string;
  password: string;
  passwordConfirmation: string;
}
  
export const SignUpPage: React.FC = () => {
  const navigate = useNavigate();

  const { signUp } = useFirebaseAuth();

  const size = useSize();

  const [isLoading, setIsLoading] = useState(false);

  const { control, handleSubmit } = useForm<SignUpPageFormData>({
    defaultValues: {
      email: '',
      password: '',
      passwordConfirmation: '',
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = async ({ email, password }: SignUpPageFormData) => {
    try {
      setIsLoading(true);
      await signUp(email, password);
      navigate(ROUTER_NAMES.home);
      toast.success('Usuário criado com sucesso');
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <BasicLayout background="light-5">
      <Box
        width="medium"
        round="medium"
        pad="medium"
        elevation="small"
        background="brand"
      >
        <Heading textAlign="center">Cadastro</Heading>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CustonField
            control={control}
            name="email"
            label="Email"
            placeholder="emal@email.com"
            icon={<User />}
            disabled={isLoading}
          />
          <CustonField
            control={control}
            name="password"
            label="Senha"
            type="password"
            placeholder="******"
            icon={<Lock />}
            disabled={isLoading}
          />
          <CustonField
            control={control}
            name="passwordConfirmation"
            label="Confirmar senha Senha"
            type="password"
            placeholder="******"
            icon={<Lock />}
            disabled={isLoading}
          />
          <Button
            label="Confirmar"
            type="submit"
            icon={
              isLoading ? <Spinner size="xsmall" color="accent-1" /> : undefined
            }
            disabled={isLoading}
            style={{ width: '100%' }}
            margin={{ top: 'medium' }}
            size={size}
          />
        </form>
      </Box>
      <Text margin={size}>
        Voltar para <Link to={ROUTER_NAMES.login}>login</Link>.
      </Text>
    </BasicLayout>
  );
};
