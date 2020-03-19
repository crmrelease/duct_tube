import React from 'react';
import { Menu } from 'antd';
import axios from 'axios';
import { useSelector } from "react-redux";
//import { withRouter } from 'react-router-dom';

function RightMenu(props) {
    const user = useSelector(state => state.user)
    const logoutHandler = () => {
        axios.get('/auth/logout').then(response => {
          if (response.status === 200) {
           props.history.push("/login");
        } else {
            alert('Log Out Failed')
          }
        });
      };
    

  if (user.userData && !user.userData.isAuth) {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="mail">
          <a href="/login">Signin</a>
        </Menu.Item>
        <Menu.Item key="app">
          <a href="/join">Signup</a>
        </Menu.Item>
      </Menu>
    )
  } else {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="create">
          <a href="/video/upload">비디오</a>
        </Menu.Item>
        <Menu.Item key="logout">
          <a onClick={logoutHandler}>Logout</a>
        </Menu.Item>
      </Menu>
    )
  }
}

export default RightMenu;
