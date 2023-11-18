export interface OnlineUser {
  userId: string;
  socketId: string;
}

interface AddOnlineUser {
  type: "ADD";
  onlineUsers: OnlineUser[];
}

export type OnlineUserAction = AddOnlineUser;

const onlinUsersReducer = (
  onlineUsers: OnlineUser[],
  action: OnlineUserAction
): OnlineUser[] => {
  switch (action.type) {
    case "ADD":
      return [...action.onlineUsers];
    default:
      return onlineUsers;
  }
};

export default onlinUsersReducer;
