import { Box, BoxProps, Button, Collapsible, Layer } from 'grommet';
import { FormClose } from 'grommet-icons';
import { useState } from 'react';
import { AppBar } from '../../components/AppBar';
import { CustonSidebar } from '../../components/CustonSidebar';
import { useSize } from '../../hooks';

export const DashBoardLayout: React.FC<BoxProps> = (props) => {
  const { children, ...rest } = props;

  const size = useSize();

  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <Box fill>
      <AppBar onClickRigthButton={() => setShowSidebar((old) => !old)} />
      <Box
        direction="row"
        flex
        overflow={{ horizontal: 'hidden', vertical: 'auto' }}
      >
        {size !== 'small' && <CustonSidebar />}
        <Box flex pad="medium" {...rest}>
          {children}
        </Box>
        {!showSidebar || size !== 'small' ? (
          <Collapsible direction="horizontal" open={showSidebar}>
            <Box
              flex
              width="small"
              background="light-2"
              elevation="small"
              align="center"
              justify="center"
            >
              Barra Lateral
            </Box>
          </Collapsible>
        ) : (
          <Layer onEsc={() => setShowSidebar(false)}>
            <Box
              background="light-2"
              tag="header"
              justify="end"
              align="center"
              direction="row"
            >
              <Button
                icon={<FormClose />}
                onClick={() => setShowSidebar(false)}
              />
            </Box>
            <Box fill background="light-2" align="center" justify="center">
              Modal
            </Box>
          </Layer>
        )}
      </Box>
    </Box>
  );
};
