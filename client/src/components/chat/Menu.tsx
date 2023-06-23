import { useDisclosure } from '@chakra-ui/react';
import React from 'react';
import { ChatState, User } from '../../context/ChatProvider';
import Navbar from './Navbar';
import SearchDrawer from './SearchDrawer';

const SideDrawer: React.FC = () => {
  const user = ChatState() as User;
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      {/* Top Menubar */}
      <Navbar user={user} searchBarOnClick={onOpen} />

      {/* Search User */}
      <SearchDrawer user={user} onClose={onClose} isOpen={isOpen} />
    </>
  );
};

export default SideDrawer;
