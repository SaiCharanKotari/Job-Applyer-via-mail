import { useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import Home from './pages/home.jsx';
import Apply from './pages/apply.jsx';
import { Toaster } from 'react-hot-toast';

function App() {

  return (
    <>
      <Toaster />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/apply' element={<Apply />} />
      </Routes>
    </>
  )
}

export default App;
