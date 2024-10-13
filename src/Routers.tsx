import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Layout from './pages/_layout.tsx'
import MainPage from './pages/MainPage.tsx'
import MyPage from './pages/MyPage.tsx'
import Login from './pages/Login.tsx'
import Register from './pages/Register.tsx'
import Editor from './pages/Editor.tsx'
import Book from './pages/Book.tsx'
import Article from './pages/Article.tsx'
import RequestLogin from './pages/RequestLogin.tsx'

export default function Routers() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        { path: '/', element: <MainPage /> },
        { path: '/mypage', element: <MyPage /> },
        { path: '/book/:bookSlug', element: <Book /> },
        { path: '/login', element: <Login /> },
        { path: '/register', element: <Register /> },
        { path: '/editor', element: <Editor /> },
        { path: '/article/:articleSlug', element: <Article /> },
        { path: '/requestLogin', element: <RequestLogin /> },
      ],
    },
    {
      path: '*',
      element: (
        <h3>
          <b>NOT FOUND PAGE</b>
        </h3>
      ),
    },
  ])
  return <RouterProvider router={router} />
}
