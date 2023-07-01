import { useDisclosure } from '@chakra-ui/react';
import React from 'react';
import { GetChatState } from '../../context/ChatProvider';
import Navbar from './Navbar';
import SearchDrawer from './SearchDrawer';

const SideDrawer: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const chatState = GetChatState();
  if (!chatState) {
    return null;
  }
  const { user } = chatState;

  return (
    <>
      {/* Top Menubar */}
      <Navbar user={user} searchBarOnClick={onOpen} />

      {/* Search User */}
      <SearchDrawer onClose={onClose} isOpen={isOpen} />
    </>
  );
};

export default SideDrawer;
