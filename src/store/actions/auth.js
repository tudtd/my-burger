import * as actionTypes from '../actions/actionTypes';
import axios from 'axios';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authSuccess = (userId, idToken) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    userId: userId,
    idToken: idToken
  };
};

export const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  };
};

export const logout = () => {
  return {
    type: actionTypes.AUTH_LOGOUT
  };
};

export const checkAuthTimeout = expirationTime => {
  return dispath => {
    setTimeout(() => {
      dispath(logout());
    }, expirationTime * 1000);
  };
};

export const auth = (email, password, isSignup) => {
  return dispath => {
    dispath(authStart());
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true
    };

    let url =
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAtzbCrrHLgw1hhj4WDfIB-umPEIl8-Exg';

    if (!isSignup) {
      url =
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAtzbCrrHLgw1hhj4WDfIB-umPEIl8-Exg';
    }

    axios
      .post(url, authData)
      .then(response => {
        console.log(response);
        dispath(authSuccess(response.data.localId, response.data.idToken));
        dispath(checkAuthTimeout(response.data.expiresIn));
      })
      .catch(err => {
        console.log(err);
        dispath(authFail(err.response.data.error));
      });
  };
};
