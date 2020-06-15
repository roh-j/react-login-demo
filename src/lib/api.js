import axios from 'axios';

export const login = ({ username, password }) => (
  // 화살표 함수 ()로 감싸져 있을 경우 리턴됨
  axios({
    method: 'post',
    url: 'http://192.168.140.6:8080/authenticate',
    data: {
      username: username,
      password: password,
    }
  }).then(response => { return response }) // 서버로 부터 받은 데이터를 response에 담아 리턴
)