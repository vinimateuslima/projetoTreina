import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Home from './pages/Home.jsx';
import ExibirCurriculo from './pages/ExibirCurriculo/ExibirCurriculo'
import CadastrarCurriculo from './pages/CadastarCurriculo/CadastrarCurriculo.jsx'
import Curriculos from './pages/Curriculos/Curriculos.jsx'

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
        path: "/exibir-curriculo/:id",
        element: <ExibirCurriculo/>
      },

      {
        path: "/cadastrar-curriculo",
        element: <CadastrarCurriculo/>
      },

      {
        path: "/curriculos",
        element: <Curriculos/>
      }
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>
)
