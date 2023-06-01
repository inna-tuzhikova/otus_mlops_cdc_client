import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import ImagePrediction from './ImagePrediction';

const Content = () => {
  return (
    <main>
      <Box
        sx={{
          bgcolor: 'background.paper',
          pt: 8,
          pb: 6,
        }}>
        <Container maxWidth='sm'>
          <ImagePrediction />
        </Container>
      </Box>
    </main>
  );
};

export default Content;
