import { Box } from 'grommet';
import Lottie from 'react-lottie';
import { DashBoardLayout } from '../../layout/DashBoardLayout';
import dashboardLottieAnimation from '../../assets/lotties/dashboard.json';

export const DashboardPage: React.FC = () => {
  return (
    <DashBoardLayout>
      <Box>
        <Lottie
          options={{
            animationData: dashboardLottieAnimation,
            loop: false,
            autoplay: true,
          }}
        />
      </Box>
    </DashBoardLayout>
  );
};
