import { Avatar, Box, BoxProps, Button, Heading } from 'grommet';
import { Notification } from 'grommet-icons';
import { useSize } from '../../hooks';
import { useAuth } from '../../hooks/useAuth';

export interface AppBarProps extends BoxProps {
  onClickRigthButton(): void;
}

export const AppBar: React.FC<AppBarProps> = (props) => {
  const { onClickRigthButton, ...rest } = props;

  const size = useSize();

  const { avatar } = useAuth();

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
      <Avatar background="dark-2">{avatar}</Avatar>
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
