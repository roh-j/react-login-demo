import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';

/*
  [ 리액트 개발 환경 ]
  - Functional Components
  - Hooks
  - Ducks Structure
  - Route
  - axios
  - immer
  - bootstrap

  - redux
  - redux-actions
  - redux-thunk
  - redux-devtools-extension
  - react-router-dom
 */

function App() {
  return (
    <>
      <Route component={LoginPage} path={['/', '/login']} exact />
    </>
  );
}

export default App;
