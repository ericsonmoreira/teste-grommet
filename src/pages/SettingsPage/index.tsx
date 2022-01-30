import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, FileInput, Spinner } from 'grommet';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { CustonField } from '../../components/CustonField';
import { useFirebaseAuth, useSize } from '../../hooks';
import { DashBoardLayout } from '../../layout/DashBoardLayout';
import { uploadAvatarFile } from '../../services/uploadAvatarFile';
import schema from './schema';

interface SettingsPageFormData {
  displayName: string;
  photoURL: string;
}

export const SettingsPage: React.FC = () => {
  const { user, updateUser } = useFirebaseAuth();

  const size = useSize();

  const [isLoading, setIsLoading] = useState(false);

  const [avatarFile, setAvatarFile] = useState<File | null>(null);

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

      if (avatarFile) {
        const urlFile = await uploadAvatarFile(avatarFile);
        await updateUser(displayName, urlFile as string);
        console.log(urlFile);
      } else {
        await updateUser(displayName, photoURL);
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
          <CustonField
            control={control}
            name="photoURL"
            label="Avatar"
            disabled={isLoading}
          />
          <FileInput
            name="avatarFile"
            id="avatarFile"
            multiple={false}
            onChange={(e) => {
              if (e.target.files) {
                setAvatarFile(e.target.files[0]);
              } else {
                setAvatarFile(null);
              }
            }}
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
