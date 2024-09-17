import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import SignIn from './components/SignIn.jsx';
import SignUp from './components/SignUp.jsx';
import Home from './components/Home.jsx';
import Profile from './components/Profile.jsx';
import PrivateRoute from './context/Auth/PrivateRoute.jsx';
import UserContextProvider from './context/userDetail/UserContextProvider'
import AuthProvider from './context/Auth/AuthContextProvider';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route path='' element={<Home />} />
      <Route path='/signup' element={<SignUp />} />
      <Route path='/signin' element={<SignIn />} />
      <Route
        path='/profile'
        element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>

        } />
    </Route>

  )
)





createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <UserContextProvider>
        <RouterProvider router={router} />
      </UserContextProvider>
    </AuthProvider>
  </StrictMode>,
)
