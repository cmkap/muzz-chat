import Jane from "../assets/jane.png";
import John from "../assets/john.png";

interface User {
  id: string;
  name: string;
  isConnected: boolean;
}

export const userProfiles = (location: { state?: { user: User } }) => {
  const user = location.state?.user;
  const image = user?.id === "john" ? John : Jane;
  const profileImage = user?.id !== "john" ? John : Jane;
  const userProfile = { ...user, image };

  return { user, image, profileImage, userProfile };
};
