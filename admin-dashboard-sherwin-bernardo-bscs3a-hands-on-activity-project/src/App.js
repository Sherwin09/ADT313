import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import Login from './pages/Public/Login/Login';
import Register from './pages/Public/Register/Register'; // Import the Register component
import Dashboard from './pages/Main/Dashboard/Dashboard';
import Main from './pages/Main/Main';
import "./App.css";
import Movie from './pages/Main/Movie/Movie';
import Lists from './pages/Main/Movie/Lists/Lists';
import Form from './pages/Main/Movie/Form/Form';



const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/register', 
    element: <Register />,
  },
  {
    path: '/main',
    element: <Main />,
    children: [
   //Temporarily disabled the dashboard route
      // {
      //   path: '/main/dashboard',
      //   element: <Dashboard />,
      // },
      {
        path: '/main/movies',
        element: <Movie />,
        children: [
          {
            path: '/main/movies',
            element: <Lists />,
          },
          {
            path: '/main/movies/form/:movieId?',
            element: <Form />,
          },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <div className='App'>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
/*
1 using react hooks, get the latest value of form fields and pass it as payload to api 
2 create the update function of movie
3 implement pagination in search movie using the "total_pages" from tmdb api response
4 add error handler for search , save ,delete
5 redirect to'/main/movies' after saving the movie*/