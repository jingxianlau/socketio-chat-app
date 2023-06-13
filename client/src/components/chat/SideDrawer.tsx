import {
  Box,
  Button,
  Tooltip,
  Text,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { ChatState, User } from '../../context/ChatProvider';

const SideDrawer: React.FC = () => {
  const user = ChatState() as User;

  const [search, setSearch] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState();

  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  return (
    <>
      <Box
        display='flex'
        justifyContent='space-between'
        alignItems='center'
        w='100%'
        p='5px 10px'
        borderWidth='5px'
      >
        <Tooltip label='Search Users to Chat!' hasArrow placement='bottom'>
          <Button variant='ghost'>
            <span className='material-symbols-outlined'>search</span>
            <Text display={{ base: 'none', md: 'flex' }} px='4'>
              Search User
            </Text>
          </Button>
        </Tooltip>

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
        <Box
          display='flex'
          flexDirection='row'
          justifyContent='center'
          alignItems='center'
          m='1'
        >
          <Menu>
            <MenuButton pr='3'>
              <span className='material-symbols-outlined'>notifications</span>
            </MenuButton>
          </Menu>
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
              <MenuItem>My Profile</MenuItem>
              <MenuDivider />
              <MenuItem>Logout</MenuItem>
            </MenuList>
          </Menu>
        </Box>
        {/* <Drawer isOpen={openSearch} onClose={setOpenSearch(false)}></Drawer> */}
      </Box>
    </>
  );
};

export default SideDrawer;
