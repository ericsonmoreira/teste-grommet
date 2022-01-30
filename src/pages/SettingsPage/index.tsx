import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Spinner } from 'grommet';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { CustonField } from '../../components/CustonField';
import { CustonFileInput } from '../../components/CustonFileInput';
import { auth } from '../../firebase';
import { useFirebaseAuth, useSize } from '../../hooks';
import { DashBoardLayout } from '../../layout/DashBoardLayout';
import { uploadAvatarFile } from '../../services/uploadAvatarFile';
import schema from './schema';

interface SettingsPageFormData {
  displayName: string;
}

export const SettingsPage: React.FC = () => {
  const { user, updateUser } = useFirebaseAuth();

  const size = useSize();

  const [isLoading, setIsLoading] = useState(false);

  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  const { control, handleSubmit } = useForm<SettingsPageFormData>({
    defaultValues: {
      displayName: user?.displayName || '',
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = async ({ displayName }: SettingsPageFormData) => {
    try {
      setIsLoading(true);

      if (avatarFile) {
        const urlFile = await uploadAvatarFile(avatarFile);
        await updateUser(displayName, urlFile as string);
        console.log(urlFile);
      } else {
        await updateUser(displayName, auth.currentUser?.photoURL || undefined);
      }
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
          <CustonFileInput
            label="Avatar"
            name="avatarFile"
            id="avatarFile"
            setFile={setAvatarFile}
          />
          <Button
            label="Salvar"
            type="submit"
            icon={isLoading ? <Spinner size="xsmall" /> : undefined}
            disabled={isLoading}
            margin={{ top: 'medium' }}
            size={size}
          />
        </form>
      </Box>
    </DashBoardLayout>
  );
};
