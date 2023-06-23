import { Button } from '@chakra-ui/button';
import {
  Tooltip,
  Menu,
  MenuButton,
  Avatar,
  MenuList,
  MenuItem,
  MenuDivider,
  Box,
  Text
} from '@chakra-ui/react';
import React, { useState } from 'react';
import ProfileModal from './modals/ProfileModal';
import { useNavigate } from 'react-router-dom';
import { User } from '../../context/ChatProvider';

interface MenubarProps {
  user: User;
  searchBarOnClick: () => void;
}

const Menubar: React.FC<MenubarProps> = ({ user, searchBarOnClick }) => {
  const navigate = useNavigate();

  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  const logoutHandler = () => {
    localStorage.removeItem('userInfo');
    navigate('/');
  };

  return (
    <Box
      display='flex'
      justifyContent='space-between'
      alignItems='center'
      w='100%'
      p='5px 10px'
      borderWidth='5px'
    >
      {/* Top-Left Search Bar */}
      <Tooltip label='Search Users to Chat!' hasArrow placement='bottom'>
        <Button variant='ghost' onClick={searchBarOnClick}>
          <span className='material-symbols-outlined'>search</span>
          <Text display={{ base: 'none', md: 'flex' }} px='4'>
            Search User
          </Text>
        </Button>
      </Tooltip>

      {/* Top-Center Logo */}
      <Box
        display={{ base: 'none', sm: 'flex' }}
        justifyContent='center'
        alignItems='center'
        width='100px'
        pos='fixed'
        left='calc(50% - 50px)'
      >
        <Text
          fontSize='2xl'
          fontFamily='Work sans'
          opacity='30%'
          fontWeight='50'
        >
          WeTalk
        </Text>
      </Box>

      {/* Top-Right */}
      <Box
        display='flex'
        flexDirection='row'
        justifyContent='center'
        alignItems='center'
        m='1'
      >
        {/* Notification Icon */}
        <Menu>
          <MenuButton pr='3'>
            <span className='material-symbols-outlined'>notifications</span>
          </MenuButton>
        </Menu>

        {/* Profile Icon */}
        <Menu
          onOpen={() => setProfileMenuOpen(true)}
          onClose={() => setProfileMenuOpen(false)}
        >
          <MenuButton p='2' as={Button}>
            <Box display='flex' alignItems='center'>
              <Avatar
                size='sm'
                cursor='pointer'
                name={user.name}
                src={user.pfp}
              />
              <Box
                className='material-symbols-outlined'
                transitionDuration='0.3s'
                transform={`rotate(${profileMenuOpen ? '-180deg' : '0deg'})`}
              >
                expand_more
              </Box>
            </Box>
          </MenuButton>
          <MenuList>
            <ProfileModal user={user}>
              <MenuItem>My Profile</MenuItem>
            </ProfileModal>
            <MenuDivider />
            <MenuItem onClick={logoutHandler}>Logout</MenuItem>
          </MenuList>
        </Menu>
      </Box>
    </Box>
  );
};

export default Menubar;
