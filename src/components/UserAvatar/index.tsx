import { Avatar, AvatarProps } from 'grommet';
import { User } from 'grommet-icons';
import { useFirebaseAuth } from '../../hooks';

export const UserAvatar: React.FC<AvatarProps> = (props) => {
  const { user } = useFirebaseAuth();

  if (user?.photoURL) return <Avatar src={user.photoURL} {...props} />;

  return (
    <Avatar background="dark-2" {...props}>
      <User />
    </Avatar>
  );
};
