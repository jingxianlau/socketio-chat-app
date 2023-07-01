import React from 'react';

import { Box } from '@chakra-ui/react';
import SideDrawer from '../components/chat/Menu';
import MyChats from '../components/chat/MyChats';
import ChatBox from '../components/chat/ChatBox';
import { GetChatState } from '../context/ChatProvider';

const Chats: React.FC = () => {
  const user = GetChatState();

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
