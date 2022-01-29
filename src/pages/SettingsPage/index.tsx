import { Box } from 'grommet';
import Lottie from 'react-lottie';
import { DashBoardLayout } from '../../layout/DashBoardLayout';
import settingsLottieAnimation from '../../assets/lotties/settingsPage.json';

export const SettingsPage: React.FC = () => {
  return (
    <DashBoardLayout>
      <Box>
        <Lottie
          options={{
            animationData: settingsLottieAnimation,
            loop: false,
            autoplay: true,
          }}
        />
      </Box>
    </DashBoardLayout>
  );
};
