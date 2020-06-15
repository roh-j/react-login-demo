import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import * as api from '../lib/api';

/*
  액션 타입 지정
 */
const CHANGE_FIELD = 'auth/CHANGE_FIELD';
const INITIALIZE_FORM = 'auth/INITIALIZE_FORM';

const LOGIN = 'auth/LOGIN';
const LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS';
const LOGIN_FAILURE = 'auth/LOGIN_FAILURE';

const LOADED = 'auth/LOADED';
const LOGOUT = 'auth/LOGOUT';

/*
  Action 생성 함수
 */
export const changeField = createAction(
  CHANGE_FIELD,
  ({ form, key, value }) => ({
    form,
    key,
    value,
  })
)

export const initializeForm = createAction(INITIALIZE_FORM, form => form);
export const loaded = createAction(LOADED);
export const logout = createAction(LOGOUT);

/*
  Client to Server 로그인 입력 값 전송
 */
export const login = ({ username, password }) => async dispatch => {

  // 액션 호출을 리듀서가 아닌 본 함수에서 처리
  dispatch({ // LOGIN 액션을 처리 중이라는 사실을 알림 (리듀서에 등록하지 않아도 실행됨)
    type: LOGIN,
  });

  dispatch( // 로드 중 화면 표시
    loaded()
  );

  try {
    const response = await api.login({ username, password });
    localStorage.setItem('token', JSON.stringify(response.data.token)); // 로그인 성공 후 local storage에 토큰 저장
    console.log(response);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: response.data
    }); // 액션 생성 함수 정의 없이 리듀서를 호출할 수 있음

  } catch (e) {
    dispatch({
      type: LOGIN_FAILURE,
      payload: e,
      error: true
    });
    throw e;
  }
}

/*
  Auth가 가지고 있는 state
 */
const initialState = {
  loaded: true,
  register: {
    username: '',
    password: '',
    passwordConfirm: '',
  },
  login: {
    username: '',
    password: '',
  },
  auth: null,
  authError: null,
}

/*
  Auth 리듀서
  produce: immer 라이브러리 적용
 */
const auth = handleActions(
  {
    [CHANGE_FIELD]: (state, { payload: { form, key, value } }) =>
      produce(state, draft => { // immer 라이브러리 사용
        draft[form][key] = value;
      }),
    [INITIALIZE_FORM]: (state, { payload: form }) => ({
      ...state, // 변경 되기 전 state 전체 (spread 코드로 간단하게 표현)
      [form]: initialState[form], // state에서 변경되는 일부분, immutable 유지가 핵심!, 이전 state와 다른 부분을 리듀서가 업데이트
    }),
    [LOADED]: (state) => ({
      ...state,
      loaded: false,
    }),
    [LOGIN_SUCCESS]: (state, { payload: auth }) => ({
      ...state,
      authError: null,
      loaded: true,
      auth,
    }),
    [LOGIN_FAILURE]: (state, { payload: error }) => ({
      ...state,
      authError: error,
      loaded: true,
    }),
    [LOGOUT]: (state) => ({
      ...state,
      auth: null,
      authError: null,
    }),
  },
  initialState,
)

export default auth;