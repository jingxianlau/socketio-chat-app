import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  Input,
  Box,
  useToast,
  Spinner,
  Stack
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { GetChatState } from '../../context/ChatProvider';
import ChatLoading from './misc/ChatLoading';
import UserListItem from './UserAvater/UserListItem';
import { Chat, User } from '../../types';

interface SearchDrawerProps {
  onClose: () => void;
  isOpen: boolean;
}

const SearchDrawer: React.FC<SearchDrawerProps> = ({ onClose, isOpen }) => {
  const toast = useToast();

  const [search, setSearch] = useState('');
  const [searchResult, setSearchResult] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);

  const chatState = GetChatState();
  if (!chatState) {
    return null;
  }
  const { user, setSelectedChat, setChats, chats } = chatState;

  const handleSearch = async (search: string) => {
    if (!search) {
      setSearchResult([]);
      return;
    }

    try {
      setLoading(true);

      const data = await fetch(
        `http://localhost:4000/api/user?search=${search}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.token}`
          }
        }
      );

      const result = await data.json();

      setTimeout(() => {
        setLoading(false);
        setSearchResult(result);
      }, 100);
    } catch (error) {
      console.log(error);
    }
  };

  const accessChat = async (id: string) => {
    try {
      setLoadingChat(true);

      const res = await fetch('http://localhost:4000/api/chat/access', {
        method: 'POST',
        body: JSON.stringify({ id }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`
        }
      });

      const json = await res.json();

      if (!res.ok) {
        toast({
          title: 'An error has occured',
          status: 'error',
          description: json.err
        });
      }
      const chat = json as Chat;

      // select chat
      setSelectedChat(chat);

      // add chat to chats (if not in there)
      if (!chats.find(c => c._id === chat._id)) setChats([chat, ...chats]);

      // close
      setLoadingChat(false);
      onClose();
    } catch (err) {
      toast({
        title: 'An unknown error has occured',
        status: 'error',
        description: err
      });
    }
  };

  return (
    <Drawer placement='left' onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader borderBottomWidth='1px'>Search Users</DrawerHeader>
        <DrawerBody mt='2'>
          {/* Search Input */}
          <Box display='flex' pb='4'>
            <Input
              placeholder='Search by Name or Email'
              mr={2}
              value={search}
              onChange={e => {
                const val = e.target.value;
                setSearch(val);
                handleSearch(val);
              }}
            />
          </Box>

          {/* Search Results */}
          {loading ? (
            // Loading Skeletons
            <ChatLoading />
          ) : searchResult.length > 0 ? (
            // Map Results
            <Stack gap={2}>
              {searchResult.map(user => (
                <UserListItem
                  user={user}
                  key={user._id}
                  handleFunction={() => accessChat(user._id)}
                />
              ))}
            </Stack>
          ) : (
            // No User Found
            search !== '' && <UserListItem notFound />
          )}
          {loadingChat && <Spinner display='flex' margin='auto' />}
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default SearchDrawer;
