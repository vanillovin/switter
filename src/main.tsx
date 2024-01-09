import React from 'react';
import { Provider as JotaiProvider } from 'jotai';
import ReactDOM from 'react-dom/client';
import { RouteObject, RouterProvider, createBrowserRouter } from 'react-router-dom';

import './styles.css';
import App from './components/App.tsx';
import { ThemeProvider } from './contexts/ThemeProvider.tsx';
import { ModalProvider } from './contexts/ModalContext.tsx';
import DialogDemo from './components/Dialog.tsx';
import Auth from './routes/Auth.tsx';
import Layout from './components/layout.tsx';
import Message from './routes/Message.tsx';
import Profile from './routes/Profile.tsx';
import SweetDetail from './routes/SweetDetail.tsx';

const paths: RouteObject[] = [
  {
    path: '/',
    element: (
      <ModalProvider>
        <DialogDemo />
        <Layout />
      </ModalProvider>
    ),
    children: [
      {
        path: '/',
        element: <App />,
      },
      {
        path: '/sweet/:id',
        element: <SweetDetail />,
      },
      {
        path: '/profile/:id',
        element: <Profile />,
      },
      {
        path: '/msg',
        element: <Message />,
      },
    ],
  },
  {
    path: '/auth',
    element: <Auth />,
  },
];

const router = createBrowserRouter(paths);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <JotaiProvider>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </JotaiProvider>
  </React.StrictMode>
);
