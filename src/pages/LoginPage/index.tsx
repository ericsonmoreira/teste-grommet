import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Heading, Spinner, Text } from 'grommet';
import { Github, Lock, User } from 'grommet-icons';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { CustonField } from '../../components/CustonField';
import { useFirebaseAuth, useSize } from '../../hooks';
import { BasicLayout } from '../../layout/BasicLayout';
import { ROUTER_NAMES } from '../../routes/names';
import schema from './schema';

interface LoginPageFormData {
  email: string;
  password: string;
}

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const { autenticate, autenticateWithGithub } = useFirebaseAuth();

  const size = useSize();

  const [isLoading, setIsLoading] = useState(false);

  const { control, handleSubmit } = useForm<LoginPageFormData>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = async ({ email, password }: LoginPageFormData) => {
    try {
      setIsLoading(true);
      await autenticate(email, password);
      navigate(ROUTER_NAMES.home);
    } catch (e) {
      if (e instanceof Error) {
        toast.error(e.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoginWithGithub = async () => {
    try {
      setIsLoading(true);
      await autenticateWithGithub();
      navigate(ROUTER_NAMES.home);
    } catch (e) {
      if (e instanceof Error) {
        toast.error(e.message);
      }
      if (e instanceof Error) {
        toast.error(e.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <BasicLayout background="light-5">
      <Box
        width="medium"
        round="small"
        pad="medium"
        elevation="small"
        background="brand"
      >
        <Heading textAlign="center">Login</Heading>
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
          <Button
            label="Entrar"
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
        <Button
          label="Com Github"
          type="submit"
          icon={<Github />}
          disabled={isLoading}
          margin={{ top: 'medium' }}
          size={size}
          onClick={handleLoginWithGithub}
        />
      </Box>
      <Text margin={size}>
        Não tem uma conta, <Link to={ROUTER_NAMES.signUp}>crie uma</Link>.
      </Text>
    </BasicLayout>
  );
};
