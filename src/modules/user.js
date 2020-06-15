import { createAction, handleActions } from 'redux-actions';

const SET_USER = 'user/SET_USER';

export const setUser = createAction(SET_USER, user => user);

const initialState = {
  user: null,
}

const user = handleActions(
  {
    [SET_USER]: (state, { payload: user }) => ({
      ...state,
      user: user
    })
  },
  initialState,
)

export default user;