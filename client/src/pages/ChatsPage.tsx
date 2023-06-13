import React from 'react';
import { ChatState } from '../context/ChatProvider';
import { Box } from '@chakra-ui/react';
import SideDrawer from '../components/chat/SideDrawer';
import MyChats from '../components/chat/MyChats';
import ChatBox from '../components/chat/ChatBox';

const Chats: React.FC = () => {
  const user = ChatState();

  return (
    user && (
      <div style={{ width: '100%' }}>
        {user && <SideDrawer />}
        <Box
          display='flex'
          justifyContent='space-between'
          w='100%'
          h='91.5vh'
          p='10px'
        >
          {user && <MyChats />}
          {user && <ChatBox />}
        </Box>
      </div>
    )
  );
};

export default Chats;
