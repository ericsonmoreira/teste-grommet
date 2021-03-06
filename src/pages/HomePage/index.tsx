import Lottie from 'react-lottie';
import homePageLottieAnimation from '../../assets/lotties/homePage.json';
import { DashBoardLayout } from '../../layout/DashBoardLayout';

export const HomePage: React.FC = () => {
  return (
    <DashBoardLayout>
      <Lottie
        options={{
          animationData: homePageLottieAnimation,
          loop: false,
          autoplay: true,
        }}
      />
    </DashBoardLayout>
  );
};
