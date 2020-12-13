import AsyncStorage from '@react-native-community/async-storage';
export const sign_up = 'SignUp';
export const Log_in = 'LogIn';
export const Log_Out = 'Logout';
export const Authenticate = 'authenticate';
export const authenticate = (token, userId, expirytime) => {
  return (dispatch) => {
    dispatch(setLogout(expirytime));
    dispatch({
      type: Authenticate,
      userId: userId,
      token: token,
    });
  };
};
let timer;
export const SignUp = (email, password) => {
  return async (dispatch) => {
    //   console.log(email+"-----"+password);
    try {
      let errormessage = '';
      const response = await fetch(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBDvfC4UTCwFtXRtDGJSx-WLIoayjlTJn8',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email,
            password: password,
            returnSecureToken: true,
          }),
        },
      );

      if (!response.ok) {
        const err = await response.json();
        const errortype = err.error.message;
        if (errortype == 'EMAIL_EXISTS') {
          errormessage = 'Email is Already Exists';
        }
        throw new Error(errormessage);
      }

      const authdata = await response.json();
      console.log(authdata);
      dispatch(
        authenticate(
          authdata.idToken,
          authdata.localId,
          parseInt(authdata.expiresIn) * 10000,
        ),
      );
      // dispatch({
      //   type: sign_up,
      //   token: authdata.idToken,
      //   userID: authdata.localId,
      // });
      const expiryTimeLimit = new Date(
        new Date().getTime() + parseInt(authdata.expiresIn) * 10000,
      );
      StoreCredential(authdata.idToken, authdata.localId, expiryTimeLimit);
    } catch (err) {
      throw new Error(err);
    }
  };
};

export const Login = (email, password) => {
  return async (dispatch) => {
    //   console.log(email+"-----"+password);
    let errormessage = '';

    try {
      const response = await fetch(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBDvfC4UTCwFtXRtDGJSx-WLIoayjlTJn8',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email,
            password: password,
            returnSecureToken: true,
          }),
        },
      );
      if (!response.ok) {
        const err = await response.json();
        const errortype = err.error.message;
        if (errortype == 'EMAIL_NOT_FOUND') {
          errormessage = 'Email is incorrect!';
        } else if (errortype == 'INVALID_PASSWORD') {
          errormessage = 'email or password incorrect!';
        }
        throw new Error(errormessage);
        // console.log('error-->', err);
      }

      const authdata = await response.json();
      console.log(authdata);
      dispatch(
        authenticate(
          authdata.idToken,
          authdata.localId,
          parseInt(authdata.expiresIn) * 10000,
        ),
      );

      // dispatch({
      //   type: Log_in,
      //   token: authdata.idToken,
      //   userID: authdata.localId,
      // });
      const expiryTimeLimit = new Date(
        new Date().getTime() + parseInt(authdata.expiresIn) * 10000,
      );
      StoreCredential(authdata.idToken, authdata.localId, expiryTimeLimit);
    } catch (err) {
      throw new Error(err);
      // console.log(err);
    }
  };
};

export const Logout = () => {
  clearLogoutTimout();
  AsyncStorage.removeItem('UserData');
  return {
    type: Log_Out,
  };
};
const clearLogoutTimout = () => {
  console.log('time-->', timer);
  if (timer) {
    clearTimeout(timer);
  }
};

const setLogout = (expirationTime) => {
  return (dispatch) => {
    timer = setTimeout(() => {
      dispatch(Logout());
    }, expirationTime/100);
  };
  console.log(timer);
};

const StoreCredential = (token, userid, expiryTimeLimit) => {
  AsyncStorage.setItem(
    'UserData',
    JSON.stringify({
      token: token,
      userID: userid,
      expiryDate: expiryTimeLimit.toISOString(),
    }),
  );
};
