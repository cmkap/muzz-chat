import React, { useEffect, useRef } from "react";
import { VStack, TabPanel, TabPanels, Tabs, Text } from "@chakra-ui/react";
import moment from "moment";

import ChatBox from "./ChatBox";
import useMessagesStore from "../state-management/messages/store";
import useAuthStore from "../state-management/auth/store";
import useOnlineUsersStore from "../state-management/onlineUsers/store";

const Chat = () => {
  const { onlineUsers } = useOnlineUsersStore();
  const { user } = useAuthStore();
  const { messages } = useMessagesStore();

  const bottomDiv = useRef<HTMLDivElement | null>(null);


  useEffect(() => {
    bottomDiv.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const formatMessageDate = (timestamp: number) => {
    const messageTime = moment(timestamp);
    const now = moment();
    const diffInHours = now.diff(messageTime, "hours");

    if (diffInHours >= 1) {
      // Show date and time if more than 1 hour
      return `${moment().calendar()}`;
    } else {
      // Don't show if within 1 hour
      return;
    }
  };

  return onlineUsers.length > 1 ? (
    <VStack as={Tabs} h="70vh" justify="end">
      <TabPanels overflowY="scroll">
        {onlineUsers.map((match) => (
          <VStack
            flexDir="column-reverse"
            as={TabPanel}
            key={match.id}
            w="100%"
          >
            <div ref={bottomDiv} />
            {/* 1rem auto 0 0 !important */}
            {messages.map((m, index) => (
              <React.Fragment key={`${index++}`}>
                <Text
                  m={
                    m.from === user?.id
                      ? "1rem 0 0 auto !important"
                      : "1rem auto 0 0 !important"
                  }
                  fontSize="lg"
                  color="gray.800"
                  bg={m.from === user?.id ? "red.300" : "gray.100"}
                  borderRadius="10px"
                  p="0.5rem 1rem"
                  maxWidth="50%"
                >
                  {m.content}
                </Text>
                <Text fontSize="small">{formatMessageDate(m.timeStamp)} </Text>
              </React.Fragment>
            ))}
            <Text fontSize="xx-large" as="b">
              You matched{" "}
              <span role="img" aria-label="balloon">
                🎈
              </span>
            </Text>
            <Text fontSize="small">{moment().calendar()} </Text>
          </VStack>
        ))}
      </TabPanels>
      <ChatBox />
    </VStack>
  ) : (
    <VStack
      as={Tabs}
      justify="center"
      pt="10rem"
      w="100%"
      textAlign="center"
      fontSize="large"
    >
      <TabPanels h="70vh">
        <Text>No matches :(online. add a match to start chatting </Text>
      </TabPanels>
    </VStack>
  );
};

export default Chat;
