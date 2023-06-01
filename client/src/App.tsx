import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Chats from './pages/ChatsPage';
import Home from './pages/Home';
import { ChatProvider } from './context/ChatProvider';

function App() {
  return (
    <div className='App'>
      <ChatProvider>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/chats' element={<Chats />} />
        </Routes>
      </ChatProvider>
    </div>
  );
}

export default App;
