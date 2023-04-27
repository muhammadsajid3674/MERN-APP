import { Route, Routes } from 'react-router-dom'
import './App.css'
import { Dashboard, Signup } from './pages'
import Login from './pages/Login'

function App() {

  return (
    <>
      <Routes>
        <Route index element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/dashboard' element={<Dashboard />} />
      </Routes>
    </>
  )
}

export default App
