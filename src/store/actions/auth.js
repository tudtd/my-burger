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
    idToken: idToken,
    setAuthRedirectPath: '/orders'
  };
};

export const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  };
};

export const logout = () => {
  localStorage.removeItem('userId');
  localStorage.removeItem('token');
  localStorage.removeItem('expirationDate');

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
        const expirationDate = new Date(
          new Date().getTime() + response.data.expiresIn * 1000
        );
        localStorage.setItem('userId', response.data.localId);
        localStorage.setItem('token', response.data.idToken);
        localStorage.setItem('expirationDate', expirationDate);
        console.log(response.data.expiresIn);
        dispath(authSuccess(response.data.localId, response.data.idToken));
        dispath(checkAuthTimeout(response.data.expiresIn));
      })
      .catch(err => {
        console.log(err);
        dispath(authFail(err.response.data.error));
      });
  };
};

export const setAuthRedirectPath = path => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path: path
  };
};

export const authCheckState = () => {
  return dispatch => {
    const localToken = localStorage.getItem('token');

    if (!localToken) {
      dispatch(logout());
    } else {
      const localExpirationDate = new Date(
        localStorage.getItem('expirationDate')
      );

      if (localExpirationDate <= new Date()) {
        dispatch(logout());
      } else {
        const localUserId = localStorage.getItem('userId');
        dispatch(authSuccess(localUserId, localToken));
        checkAuthTimeout(localExpirationDate - new Date());
        console.log((localExpirationDate - new Date()) / 1000);
      }
    }
  };
};
