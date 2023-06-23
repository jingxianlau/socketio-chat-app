import { Skeleton, Stack } from '@chakra-ui/react';

const ChatLoading = () => {
  return (
    <Stack>
      <Skeleton height='60px' mb='1' borderRadius='lg' />
      <Skeleton height='60px' mb='1' borderRadius='lg' />
      <Skeleton height='60px' mb='1' borderRadius='lg' />
      <Skeleton height='60px' mb='1' borderRadius='lg' />
      <Skeleton height='60px' mb='1' borderRadius='lg' />
      <Skeleton height='60px' mb='1' borderRadius='lg' />
      <Skeleton height='60px' mb='1' borderRadius='lg' />
      <Skeleton height='60px' mb='1' borderRadius='lg' />
    </Stack>
  );
};

export default ChatLoading;
