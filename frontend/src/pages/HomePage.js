import React, { useEffect, useState } from "react";
import SignUp from "../components/Authentication/SignUp";
import Login from "../components/Authentication/Login";
import { Container, Box, Text, Tabs, Tab, TabList, TabPanel, TabPanels } from "@chakra-ui/react";
import { Navigate } from "react-router-dom";

const HomePage = () => {

  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    if(user){
      setRedirect(true);
    }
  }, []);
  if(redirect){
    return <Navigate to="/chats"/>
  }
  return (
    <Container maxW="xl" centerContent>
      <Box
        d="flex"
        justifyContent="center"
        p={3}
        bg={"white"}
        w="100%"
        m="40px 0 15px 0"
        borderRadius="lg"
        borderWidth="1px"
        textAlign="center"
      >
        <Text fontSize="4xl" fontFamily="Work sans" color="black">
          Talk-a-Tive
        </Text>
      </Box>
      <Box bg="white" w="100%" p={4} borderRadius="lg" borderWidth="1px">
        <Tabs variant="soft-rounded">
          <TabList mb="1em">
            <Tab width="50%">Login</Tab>
            <Tab width="50%">Sign Up</Tab>
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

export default HomePage;
