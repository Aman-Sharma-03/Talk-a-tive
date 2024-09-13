import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { ChatState } from '../Context/ChatProvider';
import SideDrawer from './../components/misc/SideDrawer';
import MyChats from './../components/MyChats';
import ChatBox from './../components/ChatBox';
import { Box } from '@chakra-ui/react';

const ChatPage = () => {
  const {user} = ChatState();

  return (
    <div style={{ width: "100%", display: "flex", flexDirection: "column" }}>
      {user && <SideDrawer />}
      <Box
        display="flex"
        justifyContent="space-between"
        w="100%"
        height="91.5vh"
        p="10"
      >
        {user && <MyChats />}
        {user && <ChatBox />}
      </Box>
    </div>
  );
}

export default ChatPage