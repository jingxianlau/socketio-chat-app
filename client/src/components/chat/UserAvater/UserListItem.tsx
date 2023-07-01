import React from 'react';
import { User } from '../../../types';
import { Avatar, Box, Text } from '@chakra-ui/react';

interface UserListItemProps {
  user?: User;
  handleFunction?: () => void;
  notFound?: boolean;
}

const UserListItem: React.FC<UserListItemProps> = ({
  user,
  handleFunction,
  notFound
}) => {
  if (!notFound && (!handleFunction || !user)) {
    return null;
  }

  return notFound ? (
    <Box
      bg='#343f54'
      display='flex'
      alignItems='center'
      justifyContent='center'
      height='60px'
      borderRadius='lg'
    >
      <Text>
        <b>User Not Found</b>
      </Text>
    </Box>
  ) : (
    <Box
      onClick={handleFunction}
      cursor='pointer'
      bg='#343f54'
      _hover={{
        background: '#3a465e'
      }}
      display='flex'
      alignItems='center'
      px='3'
      height='60px'
      borderRadius='lg'
    >
      <Avatar
        mr='2'
        size='md'
        cursor='pointer'
        name={user?.name}
        src={user?.pfp}
      />
      <Box>
        <Text>{user?.name}</Text>
        <Text fontSize='xs'>{user?.email}</Text>
      </Box>
    </Box>
  );
};

export default UserListItem;
