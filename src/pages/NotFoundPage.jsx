import { Button, Flex, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import Container from '../components/Container';

const NotFoundPage = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <Container width="300">
      <Flex vertical align="center">
        <Typography.Paragraph strong style={{ fontSize: 30 }}>
          404 NOT FOUND
        </Typography.Paragraph>
        <Button type="primary" onClick={goBack}>
          Вернуться назад
        </Button>
      </Flex>
    </Container>
  );
};

export default NotFoundPage;
