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
import Signin from './components/Signin.jsx';
import SignUp from './components/SignUp.jsx';
import Home from './components/Home.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route path='' element={<Home/>} />
      <Route path='/signup' element={<SignUp/>} />
      <Route path='/signin' element={<Signin/>} />
    </Route>
  
  )
)





createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
