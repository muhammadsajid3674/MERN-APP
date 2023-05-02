import { Route, Routes } from 'react-router-dom'
import './App.css'
import ProtectedRoutes from './config/common/Route/ProtectedRoutes'
import { Dashboard, Login, Signup } from './pages'
import { ToastComponent } from './components'

function App() {

  return (
    <>
      <Routes>
        <Route index element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route element={<ProtectedRoutes />}>
          <Route path='/dashboard' element={<Dashboard />} />
        </Route>
        <Route path="*" element={<h1>404 Page not found</h1>} />
      </Routes >
      <ToastComponent />
    </>
  )
}

export default App
