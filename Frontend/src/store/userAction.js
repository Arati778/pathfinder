// userActions.js

export const SET_USER_ID = 'SET_USER_ID';
export const LOGOUT_USER = 'LOGOUT_USER';

export const setUserId = (userId) => ({
  type: SET_USER_ID,
  payload: userId,
});

export const logoutUser = () => ({
  type: LOGOUT_USER,
});
