import {
  Box,
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text
} from '@chakra-ui/react';
import React from 'react';
import Login from 'src/components/auth/Login';
import SignUp from 'src/components/auth/SignUp';

const Home: React.FC = () => {
  return (
    <Container>
      <Box
        display='flex'
        justifyContent='center'
        p={2}
        w='100%'
        m='30px 0 15px 0'
        borderRadius='lg'
        borderWidth='1px'
      >
        <Text fontWeight={'bold'} fontSize={'xx-large'}>
          WeTalk
        </Text>
      </Box>
      <Box w='100%' p={4} borderRadius='lg' borderWidth='1px'>
        <Tabs variant='soft-rounded' colorScheme='teal'>
          <TabList display='flex' justifyContent='space-evenly'>
            <Tab width='100%' mr='3'>
              Login
            </Tab>
            <Tab width='100%'>Sign Up</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <SignUp />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};

export default Home;
