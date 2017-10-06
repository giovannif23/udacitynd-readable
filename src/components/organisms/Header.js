import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Icon } from 'antd';

const Header = ({...props}) => {
  return (
    <Menu mode="horizontal">
      <Menu.Item key="home">
        <Link to="/">
          <Icon type="home" />Home
        </Link>
      </Menu.Item>
      <Menu.Item key="post">
        <Link to="/post">
          <Icon type="file-text" />Add Post
        </Link>
      </Menu.Item>
    </Menu>
  );
}

export default Header;
