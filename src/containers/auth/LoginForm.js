import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeField, initializeForm, login, logout } from '../../modules/auth';
import AuthForm from '../../components/auth/AuthForm';
import { setUser } from '../../modules/user';
import { withRouter } from 'react-router-dom';


/*
  로직 수정 필요 : setUser를 직접적으로 액션 발생하는 대신, 서버로부터 토큰 유효성 검사 & user정보 가져오기 (서버에서도 작업 필요)
  샘플 코드이므로 구현하지 않았음.
  username: javainuse
  password: password
 */
const LoginForm = ({ history }) => {
  const [error, setError] = useState(null); // 리덕스 없이 Hooks로 state 지정
  const dispatch = useDispatch();

  /*
    Redux store에 있는 auth, user state를 사용 (Hooks)
   */
  const { form, auth, authError, loaded, user } = useSelector(({ auth, user }) => ({
    form: auth.login,
    auth: auth.auth,
    authError: auth.authError,
    loaded: auth.loaded,
    user: user.user,
  }));

  const onChange = e => {
    const { value, name } = e.target;

    dispatch(
      changeField({ // changeField 액션 함수 호출
        form: 'login',
        key: name,
        value: value,
      })
    )
  }

  const onSubmit = e => {
    e.preventDefault();
    const { username, password } = form;

    dispatch(
      login({ // login 액션 함수 호출
        username: username,
        password: password,
      })
    );
  }

  const onLogout = e => {
    localStorage.removeItem('token');

    // user state 비워줌
    dispatch(
      setUser('')
    )
    // auth, authError state 비워줌
    dispatch(
      logout()
    )
  }

  useEffect(() => {
    dispatch(initializeForm('login')); // 로그인 form 초기화

    // 임시 로그인 유지 코드 (수정 필요) : token이 localstorage에 있다면
    if (localStorage.getItem('token')) {
      dispatch(
        setUser('javainuse')
      )
    }
  }, [dispatch]);

  useEffect(() => {
    if (authError) {
      //alert('Login Failed!');
      if (authError.response.status === 401) { // error status
        setError('로그인 정보를 확인해주세요!');
      }
    }
    if (auth) {
      //alert('Login Successful!');

      dispatch(
        setUser('javainuse')
      )
      history.push('/');
    }
  }, [auth, authError, dispatch, history]);

  return (
    <AuthForm
      type='login'
      form={form}
      onChange={onChange}
      onSubmit={onSubmit}
      onLogout={onLogout}
      loaded={loaded}
      user={user}
      error={error}
    />
  )
}

export default withRouter(LoginForm);