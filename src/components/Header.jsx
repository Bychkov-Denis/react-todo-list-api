import { Typography } from 'antd';

const { Title } = Typography;

const Header = () => {
  return (
    <>
      <Title className="text-center" level={1}>
        To-Do List
      </Title>
    </>
  );
};

export default Header;
