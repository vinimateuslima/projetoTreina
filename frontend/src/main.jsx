import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Home from './pages/Home.jsx';
import ExibirCurriculo from './pages/ExibirCurriculo/ExibirCurriculo'
import CadastrarCurriculo from './pages/CadastarCurriculo/CadastrarCurriculo.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/ExibirCurriculo/:id",
        element: <ExibirCurriculo/>
      },

      {
        path: "/CadastrarCurriculo",
        element: <CadastrarCurriculo/>
      }
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>
)
