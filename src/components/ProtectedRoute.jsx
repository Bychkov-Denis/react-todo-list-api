import { Navigate } from 'react-router-dom';
import { getTokenFromLocalStorage } from '../helpers';

const ProtectedRoute = ({ children }) => {
  const token = getTokenFromLocalStorage();

  if (!token) {
    return <Navigate to="/registration" />;
  }

  return children;
};

export default ProtectedRoute;
