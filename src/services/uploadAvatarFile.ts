import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '../firebase';

export const uploadAvatarFile = async (file: File | null) => {
  if (!file) return;

  const sotrageRef = ref(storage, `avatars/${file.name}`);

  await uploadBytes(sotrageRef, file);

  const downloadURL = await getDownloadURL(sotrageRef);

  return downloadURL;
};
