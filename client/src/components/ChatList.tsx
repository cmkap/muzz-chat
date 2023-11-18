import {
  HStack,
  Heading,
  List,
  ListItem,
  VStack,
  Button,
  Divider,
} from "@chakra-ui/react";
import { ChatIcon } from "@chakra-ui/icons";
import Profile from "./Profile";
import { useContext } from "react";
import { MatchContext } from "../pages/ChatPage";
import Jane from "../assets/jane.png";
import John from "../assets/john.png";
import OnlineUserContext from "../state-management/contexts/onlineUsersContext";

const ChatList = () => {
  const {  onlineUsers, user } = useContext(OnlineUserContext);

  const updatedUsers = onlineUsers
    .map((u) => ({
      ...u,
      name: u.userId,
      image: u.userId === "jane" ? Jane : John,
    }))
    .filter((u) => u.userId !== user.id);

  return (
    <VStack py="1rem" align="stretch">
      <HStack justify="space-between" w="100%">
        <Heading as="h4" size="md">
          Online Conversations
        </Heading>
        <Button marginRight="2rem">
          <ChatIcon />
        </Button>
      </HStack>
      <Divider />
      <List>
        {updatedUsers.map((match, index) => (
          <ListItem key={index} paddingY="5px">
            <Profile size={"40px"} subTitle={true} match={match} />
          </ListItem>
        ))}
      </List>
    </VStack>
  );
};

export default ChatList;
