import { PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';

import { authService } from '../services/firebase/firebaseConfig';

export default function ProtectedRoute({ children }: PropsWithChildren) {
  const user = authService.currentUser;
  console.log(user);
  if (user === null) {
    return <Navigate to="/auth" />;
  }
  return children;
}
