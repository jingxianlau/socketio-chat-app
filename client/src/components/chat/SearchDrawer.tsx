import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  Input,
  Box
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { User } from '../../context/ChatProvider';
import ChatLoading from './misc/ChatLoading';
import UserListItem from './UserAvater/UserListItem';

interface SearchDrawerProps {
  user: User;
  onClose: () => void;
  isOpen: boolean;
}

const SearchDrawer: React.FC<SearchDrawerProps> = ({
  user,
  onClose,
  isOpen
}) => {
  const [search, setSearch] = useState('');
  const [searchResult, setSearchResult] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState();

  const handleSearch = async (search: string) => {
    if (!search) return;

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

  const accessChat = (userId: string) => {};

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
            <ChatLoading />
          ) : (
            searchResult.map(user => (
              <UserListItem
                user={user}
                key={user._id}
                handleFunction={() => accessChat(user._id)}
              />
            ))
          )}
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default SearchDrawer;
