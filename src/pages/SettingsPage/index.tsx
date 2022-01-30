import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Spinner } from 'grommet';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { CustonField } from '../../components/CustonField';
import { useFirebaseAuth, useSize } from '../../hooks';
import { DashBoardLayout } from '../../layout/DashBoardLayout';
import schema from './schema';

interface SettingsPageFormData {
  displayName: string;
  photoURL: string;
}

export const SettingsPage: React.FC = () => {
  const { user, updateUser } = useFirebaseAuth();

  const size = useSize();

  const [isLoading, setIsLoading] = useState(false);

  const { control, handleSubmit } = useForm<SettingsPageFormData>({
    defaultValues: {
      displayName: user?.displayName || '',
      photoURL: user?.photoURL || '',
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = async ({ displayName, photoURL }: SettingsPageFormData) => {
    try {
      setIsLoading(true);
      await updateUser(displayName, photoURL);
    } catch (e) {
      if (e instanceof Error) {
        toast.error(e.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DashBoardLayout>
      <Box>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CustonField
            control={control}
            name="displayName"
            label="Nome"
            disabled={isLoading}
          />
          <CustonField
            control={control}
            name="photoURL"
            label="Avatar"
            disabled={isLoading}
          />
          <Button
            label="Salvar"
            type="submit"
            icon={isLoading ? <Spinner size="xsmall" /> : undefined}
            disabled={isLoading}
            style={{ width: '100%' }}
            margin={{ top: 'medium' }}
            size={size}
          />
        </form>
      </Box>
    </DashBoardLayout>
  );
};
