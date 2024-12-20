import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import MovieDetailsPage from './components/MovieDetailsPage';
import FavoritesPage from './components/FavoritePage';
import LoginButton from './components/Login';
import { useAuth0 } from '@auth0/auth0-react';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const App = () => {

  const { isAuthenticated } = useAuth0();

  return (
    <div className="p-3 m-auto text-center bg-black text-white">
      <h1 className='font-bold text-3xl p-2 font-serif text-purple-600'>
        <Link to="/">React Movies</Link>
      </h1>
      <Routes>
        <>
          <Route path="/" element={isAuthenticated ? <HomePage /> : <LoginButton />} />
          <Route path="/movie/:id" element={<MovieDetailsPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
        </>
      </Routes>
      <ToastContainer />
    </div>
  );
};

export default App;
