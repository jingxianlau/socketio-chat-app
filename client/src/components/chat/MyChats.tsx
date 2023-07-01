import React, { useEffect } from 'react';
import { GetChatState } from '../../context/ChatProvider';
import { Chat } from '../../types';
import { Box, Button, Stack, useToast, Text } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import ChatLoading from './misc/ChatLoading';
import { getSender } from '../../utils/getSender';

const MyChats: React.FC = () => {
  const toast = useToast();
  const state = GetChatState();

  useEffect(() => {
    // verify state
    if (!state) {
      return;
    }
    const { user, setChats } = state;

    // fetch
    const fetchChats = async () => {
      try {
        const res = await fetch('http://localhost:4000/api/chat/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.token}`
          }
        });
        const json = await res.json();

        // errors
        if (!res.ok) {
          toast({
            title: 'An Error has Occured',
            status: 'error',
            description: json.err
          });
          return;
        }

        const chatsData = json as Chat[];

        // successfully fetched chats
        setChats(chatsData);
      } catch (err) {
        toast({
          title: 'An Unknown Error has Occured',
          status: 'error',
          description: err
        });
      }
    };

    // fetch chats
    fetchChats();
  }, []);

  if (!state) {
    return null;
  }
  const { user, selectedChat, setSelectedChat, chats, setChats } = state;

  console.log(chats[0]);

  return (
    <Box
      display={{ base: selectedChat ? 'none' : 'flex', md: 'flex' }}
      flexDir='column'
      alignItems='center'
      p={3}
      m={2}
      bg='#202736'
      w={{ base: '100%', md: '31%' }}
      borderRadius='10px'
    >
      {/* Header */}
      <Box
        pb={3}
        px={3}
        fontSize={{ base: '28px', md: '30px' }}
        fontFamily='Work sans'
        display='flex'
        w='100%'
        justifyContent='space-between'
        alignItems='center'
      >
        My Chats
        <Button
          display='flex'
          fontSize={{ base: '17px', md: '10px', lg: '17px' }}
          backgroundColor='#262e41'
          _hover={{
            backgroundColor: '#2b3448'
          }}
          _active={{
            backgroundColor: '#323c53'
          }}
          rightIcon={<AddIcon />}
        >
          New Group Chat
        </Button>
      </Box>

      {/* Body */}
      <Box
        display='flex'
        flexDir='column'
        p={4}
        bg='#242c3d'
        w='100%'
        h='100%'
        borderRadius='10px'
        overflowY='hidden'
      >
        {/* Chats List */}
        {chats ? (
          <Stack gap={2} overflowY='scroll'>
            {chats.map(chat => (
              // Chat
              <Box
                onClick={() => setSelectedChat(chat)}
                cursor='pointer'
                bg={selectedChat === chat ? '#465879' : '#323c53'}
                _hover={
                  selectedChat !== chat
                    ? { backgroundColor: '#36415a' }
                    : { backgroundColor: '#465879' }
                }
                color='white'
                px={6}
                height='60px'
                borderRadius='8px'
                display='flex'
                alignItems='center'
                transition='background-color 250ms ease-in-out'
                key={chat._id}
              >
                {/* Chat Name */}
                <Text fontSize={20}>
                  {!chat.isGroupChat
                    ? getSender(user, chat.users)
                    : chat.chatName}
                </Text>
              </Box>
            ))}
          </Stack>
        ) : (
          <ChatLoading />
        )}
      </Box>
    </Box>
  );
};

export default MyChats;
