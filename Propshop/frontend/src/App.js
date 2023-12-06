import React, { Suspense, lazy } from 'react'
import Loader from './components/Loader';
import PrivateRoute from './config/router/PrivateRoute';
import PublicRoute from './config/router/PublicRoute';


const AuthRouter = lazy(() => import('./config/router/AuthRouter'));
const PropshopApp = lazy(() => import('./Propshop'));

function App() {

  if (!window.localStorage.getItem('access_token')) {
    return (
      <PublicRoute>
        <Suspense fallback={<Loader />}>
          <AuthRouter />
        </Suspense>
      </PublicRoute>
    )
  } else {
    return (
      <PrivateRoute>
        <Suspense fallback={<Loader />}>
          <PrivateRoute>
            <PropshopApp />
          </PrivateRoute>
        </Suspense>
      </PrivateRoute>
    )
  }
}

export default App;
