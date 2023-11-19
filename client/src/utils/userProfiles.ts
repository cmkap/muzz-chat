import Jane from "../assets/jane.png";
import John from "../assets/john.png";

export interface User {
  id: string;
  name: string;
  isConnected: boolean;
}

export const userProfiles = (user: User | null ) => {
  
  const image = user?.id === "john" ? John : Jane;
  const profileImage = user?.id !== "john" ? John : Jane;
  const userProfile = { ...user, image };

  return { user, image, profileImage, userProfile };
};
