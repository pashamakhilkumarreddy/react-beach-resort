import React, { useState } from 'react';
import { Menu } from 'semantic-ui-react';
import './header.scss';

const Header = () => {
  const [activeItem, setActiveItem] = useState('home');
  const handleClick = (e, { name = 'home' }) => {
    setActiveItem(name);
  };
  return (
    <Menu pointing secondary>
      <Menu.Item
        name='home'
        active={activeItem === 'home'}
        onClick={handleClick}
      />
      <Menu.Menu position='right'>
        <Menu.Item
          name='login'
          active={activeItem === 'login'}
          onClick={handleClick}
        />
        <Menu.Item
          name='profile'
          active={activeItem === 'profile'}
          onClick={handleClick}
        />
        <Menu.Item
          name='logout'
          active={activeItem === 'logout'}
          onClick={handleClick}
        />
      </Menu.Menu>
    </Menu>
  );
};

export default Header;
