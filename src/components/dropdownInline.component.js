import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown } from 'semantic-ui-react';

const DropdownInlineComponent = ({
  pretext,
  options,
  defaultIndex,
}) => (
  <span>
    {pretext + ' '}
    <Dropdown inline options={options} defaultValue={options[defaultIndex].value}/>
  </span>
);

DropdownInlineComponent.propTypes = {
  pretext: PropTypes.string,
  options: PropTypes.array.isRequired,
  defaultIndex: PropTypes.number,
}

DropdownInlineComponent.defaultProps = {
  defaultIndex: 0,
}

export default DropdownInlineComponent;