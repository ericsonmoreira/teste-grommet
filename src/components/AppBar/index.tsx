import { Box, BoxProps, Button, Heading, Text } from 'grommet';
import { Notification } from 'grommet-icons';
import { useFirebaseAuth, useSize } from '../../hooks';
import { UserAvatar } from '../UserAvatar';

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
      fill="horizontal"
      direction="row"
      align="center"
      justify="center"
      background="brand"
      pad={{ left: 'medium', right: 'small', vertical: 'small' }}
      style={{ zIndex: '1' }}
      {...rest}
    >
      <Box direction="row" fill="horizontal" align="center" justify="start">
        <UserAvatar />
        <Text size={size} margin={{ left: size }}>
          {user?.displayName}
        </Text>
      </Box>
      <Box direction="row" fill="horizontal" align="center" justify="center">
        <Heading level="3" margin="none" size={size}>
          Grommet Teste
        </Heading>
      </Box>

      <Box direction="row" fill="horizontal" align="center" justify="end">
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
    </Box>
  );
};
