import { Button, HStack, Input } from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";
import { useContext,  } from "react";
import * as Yup from "yup";
import socket from "../socket";
import OnlineUserContext from "../state-management/contexts/onlineUsersContext";
import useMessages from "../hooks/useMessages";




const ChatBox = () => {
  const { user } = useContext(OnlineUserContext);
  const { dispatch } = useMessages()

  const receiver = user.id !== "john" ? "john" : "jane";

  return (
    <Formik
      initialValues={{ message: "" }}
      validationSchema={Yup.object({
        message: Yup.string().min(1).max(255),
      })}
      onSubmit={(values, actions) => {
        const message = {
          to: receiver,
          from: user.id,
          content: values.message,
          timeStamp: Date.now(),
        };

        socket.emit("sendMessage", { ...message, recipientId: receiver });
        dispatch({type: "ADD", message})

        actions.resetForm();
      }}
    >
      <HStack as={Form} w="100%" pb="1rem" px="1rem">
        <Input
          as={Field}
          name="message"
          placeholder="Type message here..."
          size="lg"
          autoComplete="off"
        />
        <Button type="submit" size="lg" colorScheme="gray">
          Send
        </Button>
      </HStack>
    </Formik>
  );
};

export default ChatBox;
