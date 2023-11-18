import { HStack, Image, Button, Box, Text } from "@chakra-ui/react";
import moment from "moment";

export interface Match {
  id: number
  name: string
  image: string
}
interface Props {
    size?: string 
    subTitle?: boolean 
    match?: Match
}

const Profile = ({ size = "60px", subTitle, match }: Props) => {
  return (
    <HStack>
      <Image
        boxSize={size}
        borderRadius="full"
        objectFit="cover"
        src={match?.image}
        alt={match?.name}
      />
      <Box>
        <Button
          whiteSpace="normal"
          textAlign="left"
          fontWeight={"bold"}
          onClick={() => console.log("clicked profile")}
          fontSize="large"
          variant="link"
        >
          <Text color="green">{match?.name}</Text>
        </Button>
        {subTitle && <Text fontSize="small">Expires {moment().endOf('day').fromNow()} </Text>}
      </Box>
    </HStack>
  );
};


export default Profile;
