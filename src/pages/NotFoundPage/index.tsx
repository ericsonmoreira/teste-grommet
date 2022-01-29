import { Box, Button, Heading } from 'grommet';
import Lottie from 'react-lottie';
import { useNavigate } from 'react-router-dom';
import notFoundLottieAnimation from '../../assets/lotties/notFoundLottie.json';
import { useSize } from '../../hooks';
import { ROUTER_NAMES } from '../../routes/names';

export const NotFoundPage: React.FC = () => {
  const size = useSize();

  const navigate = useNavigate();

  return (
    <Box fill align="center" justify="center">
      <Heading size={size}>Página não encontrada</Heading>
      <Box margin="medium">
        <Lottie
          options={{
            animationData: notFoundLottieAnimation,
            loop: true,
            autoplay: true,
          }}
        />
      </Box>
      <Button
        label="Voltar para Login"
        onClick={() => navigate(ROUTER_NAMES.login)}
      />
    </Box>
  );
};
