import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import { Layout } from './components/Layout'
import { Home } from './pages/Home'
import { ArticleList } from './pages/ArticleList'
import { ArticleDetail } from './pages/ArticleDetail'
import { About } from './pages/About'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "articles",
        element: <ArticleList />,
      },
      {
        path: "articles/:category/:slug",
        element: <ArticleDetail />,
      },
      {
        path: "about",
        element: <About />,
      }
    ]
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
