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
      <Menu.Item key="posts">
        <Link to="/posts">
          <Icon type="file-text" />Posts
        </Link>
      </Menu.Item>
      <Menu.Item key="categories">
        <Link to="/categories">
          <Icon type="tags-o" />Categories
        </Link>
      </Menu.Item>
    </Menu>
  );
}

export default Header;
