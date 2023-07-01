import { Skeleton, Stack } from '@chakra-ui/react';

const ChatLoading = () => {
  return (
    <Stack gap={2}>
      <Skeleton height='60px' borderRadius='lg' />
      <Skeleton height='60px' borderRadius='lg' />
      <Skeleton height='60px' borderRadius='lg' />
      <Skeleton height='60px' borderRadius='lg' />
      <Skeleton height='60px' borderRadius='lg' />
      <Skeleton height='60px' borderRadius='lg' />
      <Skeleton height='60px' borderRadius='lg' />
      <Skeleton height='60px' borderRadius='lg' />
    </Stack>
  );
};

export default ChatLoading;
