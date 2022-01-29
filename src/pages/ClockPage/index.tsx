import { Box } from 'grommet';
import Lottie from 'react-lottie';
import { DashBoardLayout } from '../../layout/DashBoardLayout';
import clockLottieAnimation from '../../assets/lotties/clockPage.json';

export const ClockPage: React.FC = () => {
  return (
    <DashBoardLayout>
      <Box>
        <Lottie
          options={{
            animationData: clockLottieAnimation,
            loop: true,
            autoplay: true,
          }}
        />
      </Box>
    </DashBoardLayout>
  );
};
