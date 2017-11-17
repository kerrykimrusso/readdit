import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { Menu, Dropdown, Button } from 'semantic-ui-react';

const Nav = ({
  categories,
  children,
}) => (
  <div>
    <Menu pointing>
      <Menu.Item>
        <NavLink to={'/'}>Home</NavLink>
      </Menu.Item>
      <Dropdown item text='Categories'>
        <Dropdown.Menu>
          {categories.map(cat => (
            <NavLink key={cat.name} to={`/${cat.path}`}>
              <Dropdown.Item>
                {cat.name}
              </Dropdown.Item>
            </NavLink>
          ))}
        </Dropdown.Menu>
      </Dropdown>
      <Menu.Menu position='right'>
        <Menu.Item>
          <NavLink to={'/posts/new'}>
            <Button content='New Post' labelPosition='left' icon='write' primary/>
          </NavLink>
        </Menu.Item>
      </Menu.Menu>
    </Menu>
    <div>
      {children}
    </div>
  </div>
);

Nav.propTypes = {
  categories: PropTypes.array.isRequired,
};

Nav.defaultProps = {
  categories: [],
}
export default Nav;