import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Chats from './pages/ChatsPage';
import Home from './pages/Home';

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/chats' element={<Chats />} />
      </Routes>
    </div>
  );
}

export default App;
