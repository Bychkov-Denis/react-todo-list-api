import { LogoutOutlined } from '@ant-design/icons';
import { Button, Flex, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import { deleteTokenFromLocalStorage } from '../helpers';

const { Title } = Typography;

const Header = () => {
  const navigate = useNavigate();

  const logout = () => {
    deleteTokenFromLocalStorage();
    navigate('/auth');
  };

  return (
    <Flex
      justify="space-between"
      align="center"
      style={{ marginBottom: '24px' }}
    >
      <Title level={1} style={{ margin: 0 }}>
        To-Do List
      </Title>
      <Button danger icon={<LogoutOutlined />} onClick={logout}>
        Выйти
      </Button>
    </Flex>
  );
};

export default Header;
