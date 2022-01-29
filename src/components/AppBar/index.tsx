import { Avatar, Box, BoxProps, Button, Heading } from 'grommet';
import { Notification, User } from 'grommet-icons';
import { useFirebaseAuth, useSize } from '../../hooks';

export interface AppBarProps extends BoxProps {
  onClickRigthButton(): void;
}

export const AppBar: React.FC<AppBarProps> = (props) => {
  const { onClickRigthButton, ...rest } = props;

  const size = useSize();

  const { user } = useFirebaseAuth();

  return (
    <Box
      tag="header"
      direction="row"
      align="center"
      justify="between"
      background="brand"
      pad={{ left: 'medium', right: 'small', vertical: 'small' }}
      style={{ zIndex: '1' }}
      {...rest}
    >
      {user?.photoURL ? (
        <Avatar src={user.photoURL} />
      ) : (
        <Avatar background="dark-2">
          <User />
        </Avatar>
      )}

      <Heading level="3" margin="none" size={size}>
        Grommet Teste
      </Heading>
      <Button
        badge={{
          background: 'accent-1',
          value: 10,
          max: 99,
        }}
        icon={<Notification />}
        onClick={() => onClickRigthButton()}
      />
    </Box>
  );
};
