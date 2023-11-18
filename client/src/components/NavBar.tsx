import { HStack, Text } from "@chakra-ui/react";
import ColorModeSwitch from "./ColorModeSwitch";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <HStack justifyContent="space-between" padding="10px">
      <NavLink to={"/"}>
        <Text fontSize="3xl" as="b">
          Muzz
        </Text>
      </NavLink>
      <ColorModeSwitch />
    </HStack>
  );
};

export default NavBar;
