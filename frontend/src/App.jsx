import { useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import Home from './pages/home.jsx';
import Login from './pages/login.jsx';
import Signup from './pages/signup.jsx';

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>
    </>
  )
}

export default App;
