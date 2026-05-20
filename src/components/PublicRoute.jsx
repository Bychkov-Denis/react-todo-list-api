import { Navigate } from 'react-router-dom';
import { getTokenFromLocalStorage } from '../helpers';

const PublicRoute = ({ children }) => {
  const token = getTokenFromLocalStorage();

  if (token) {
    return <Navigate to="/todos" />;
  }

  return children;
};

export default PublicRoute;
