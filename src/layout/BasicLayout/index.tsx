import { Box, BoxProps } from 'grommet';

export const BasicLayout: React.FC<BoxProps> = (props) => {
  const { children, ...rest } = props;
  return (
    <Box fill justify="center" align="center" {...rest}>
      {children}
    </Box>
  );
};
