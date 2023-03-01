// SET_USER_INFO
// payload: { userInfo: User }
// updates the user info in the store. To use when editing the profile before sending the PUT request,
// as well as when logging in and retrieving the user info.
export const SET_NEW_ROOM = `SET_NEW_ROOM`;

export const setNewRoomAction = (room) => {
  return {
    type: SET_NEW_ROOM,
    payload: room,
  };
};
