import { Grid, GridItem, Show, Tabs, TabList, Tab } from "@chakra-ui/react";
import Profile from "../components/Profile";
import ChatList from "../components/ChatList";
import Chat from "../components/Chat";

import useSocketSetup from "../hooks/useSocketSetup";
import { useLocation } from "react-router-dom";

import OnlineUserContext from "../state-management/contexts/onlineUsersContext";
import MessagesProvider from "../state-management/MessagesProvider";
import useMessages from "../hooks/useMessages";
import { userProfiles } from "../utils/userProfiles";

function ChatPage() {
  const { dispatch } = useMessages();
  const location = useLocation();

  const { user, userProfile, profileImage } = userProfiles(location);
  const { onlineUsers } = useSocketSetup(user, dispatch);

  const match = onlineUsers.find((u) => u.id !== user.id);
  const profileMatch = { ...match, image: profileImage };

  return (
    <MessagesProvider>
      <OnlineUserContext.Provider
        value={{
          onlineUsers,
          user,
        }}
      >
        <Grid
          templateAreas={{
            base: `"user user" "tab tab" "main main"`,
            lg: ` "user profile" "chat main"`,
          }}
          templateColumns={{
            base: "1fr",
            lg: "350px 1fr",
          }}
        >
          <GridItem area="user" borderWidth="1px" borderRadius="lg" p={"10px"}>
            <Profile match={userProfile} />
          </GridItem>
          <Show below="lg">
            <GridItem area="tab">
              <Tabs isFitted>
                <TabList mb="1em">
                  <Tab>Chat</Tab>
                  <Tab>Profile</Tab>
                </TabList>
              </Tabs>
            </GridItem>
          </Show>

          <Show above="lg">
            <GridItem
              area="chat"
              paddingX="5px"
              borderWidth="1px"
              borderRadius="lg"
            >
              <ChatList />
            </GridItem>

            <GridItem
              area="profile"
              borderWidth="1px"
              borderRadius="lg"
              p={"10px"}
            >
              <Profile match={profileMatch} />
            </GridItem>
          </Show>

          <GridItem area="main" borderWidth="1px" borderRadius="lg">
            <Chat />
          </GridItem>
        </Grid>
      </OnlineUserContext.Provider>
    </MessagesProvider>
  );
}

export default ChatPage;
