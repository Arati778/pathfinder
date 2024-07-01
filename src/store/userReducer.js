import { SET_USER_ID, LOGOUT_USER } from '../actions/userActions';

const initialState = {
  userId: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_ID:
      return {
        ...state,
        userId: action.payload,
      };
    case LOGOUT_USER:
      return {
        ...state,
        userId: null,
      };
    default:
      return state;
  }
};

export default userReducer;
