import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import type { RootState } from '../store';
import type { ReactNode, FC} from 'react';

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute: FC<PrivateRouteProps> = ({ children }) => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

export default PrivateRoute;