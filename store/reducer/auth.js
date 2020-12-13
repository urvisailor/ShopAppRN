import {Authenticate,Log_Out} from '../actions/auth';
const initialState = {
  token: '',
  userID: '',
};

export const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case Authenticate:
      return {
        token: action.token,
        userID: action.userID,
      };
      case Log_Out:
        return initialState;
    // case sign_up:
    //   return {
    //     token: action.token,
    //     userID: action.userID,
    //   };
  }
  return state;
};
