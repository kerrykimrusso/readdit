import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { Menu, Dropdown, Button } from 'semantic-ui-react';
import PostForm from '../components/postForm.component';

const BasePage = ({
  categories,
  category,
  children,
  onNewPostSubmit,
}) => {
  const categoryDropdownOptions = categories.map(cat => ({
    key: cat.path,
    text: cat.name,
    value: cat.path,
  }));

  return (
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
          <PostForm 
            trigger={<Button content='New Post' labelPosition='left' icon='write' primary/>}
            categories={categoryDropdownOptions}
            category={category}
            onSubmit={onNewPostSubmit}
          />
          </Menu.Item>
        </Menu.Menu>
      </Menu>
      <div>
        {children}
      </div>
    </div>);
};

BasePage.propTypes = {
  categories: PropTypes.array.isRequired,
  onNewPostSubmit: PropTypes.func.isRequired,
};

BasePage.defaultProps = {
  categories: [],
}
export default BasePage;