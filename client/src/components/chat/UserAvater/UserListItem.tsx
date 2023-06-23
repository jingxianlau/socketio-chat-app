import React from 'react';
import { User } from '../../../context/ChatProvider';
import { Avatar, Box, Text } from '@chakra-ui/react';

interface UserListItemProps {
  user: User;
  handleFunction: () => void;
}

const UserListItem: React.FC<UserListItemProps> = ({
  user,
  handleFunction
}) => {
  return (
    <Box
      onClick={handleFunction}
      cursor='pointer'
      bg='#343f54'
      color='white'
      _hover={{
        background: '#3a465e'
      }}
      w='100%'
      display='flex'
      alignItems='center'
      px='3'
      py='2'
      mb='2'
      height='60px'
      borderRadius='lg'
    >
      <Avatar
        mr='2'
        size='md'
        cursor='pointer'
        name={user.name}
        src={user.pfp}
      />
      <Box>
        <Text>{user.name}</Text>
        <Text fontSize='xs'>{user.email}</Text>
      </Box>
    </Box>
  );
};

export default UserListItem;
