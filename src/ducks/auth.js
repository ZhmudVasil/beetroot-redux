const appName = "rr2";
export const moduleName = "auth";

/**
 * Constants
 */
const LOGIN_REQUEST = `${appName}/${moduleName}/LOGIN/REQUEST`;
const LOGIN_SUCCESS = `${appName}/${moduleName}/LOGIN/SUCCESS`;
const LOGIN_FAILURE = `${appName}/${moduleName}/LOGIN/FAILURE`;

const LOGOUT_REQUEST = `${appName}/${moduleName}/LOGOUT/REQUEST`;
const LOGOUT_SUCCESS = `${appName}/${moduleName}/LOGOUT/SUCCESS`;
const LOGOUT_FAILURE = `${appName}/${moduleName}/LOGOUT/FAILURE`;

export const login = (userLogin, password) => async (
  dispatch,
  _getState,
  { api }
) => {
  dispatch({ type: LOGIN_REQUEST });
  try {
    await api.auth.login(userLogin, password);

    dispatch({
      type: LOGIN_SUCCESS
    });
  } catch (error) {
    dispatch({ type: LOGIN_FAILURE });
  }
};

// todo logout
export const logout = () => async (dispatch, _getState, { api }) => {
  dispatch({ type: LOGOUT_REQUEST });
  try {
    await api.auth.logout();

    dispatch({
      type: LOGOUT_SUCCESS
    });
  } catch (error) {
    dispatch({ type: LOGOUT_FAILURE });
  }
};
// todo save in store that logged in

const defaultState = {};

export default function(state = defaultState, action) {
  return state;
}
