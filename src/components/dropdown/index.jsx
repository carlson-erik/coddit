import React from "react";
import {default as ReactDropdown} from 'react-dropdown';
// ---------- CSS Overrides ----------
import './index.css';

const Dropdown = (props) => {
  const {options, onChange, placeholder} = props;
  const dropdownOptions = options && options.length >= 1 ? options : [];
  console.log('rendering custom dropdown')
  return (
    <ReactDropdown
      options={dropdownOptions}
      onChange={onChange}
      placeholder={placeholder}
    />
  )
}

export default Dropdown;