import React from "react";
import styled from 'styled-components';
import {default as ReactDropdown} from 'react-dropdown';
// ---------- Styled Components ----------
/*const DEFAULT_overrides_DropdownWrapper = styled.div`
&  .Dropdown-root {
  position: relative
}

&  .Dropdown-control {
  position: relative;
  overflow: hidden;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 2px;
  box-sizing: border-box;
  color: #333;
  cursor: default;
  outline: none;
  padding: 8px 52px 8px 10px;
  transition: all 200ms ease
}

&  .Dropdown-control:hover {
  box-shadow: 0 1px 0 rgba(0,0,0,.06)
}

&  .Dropdown-arrow {
  border-color: #999 transparent transparent;
  border-style: solid;
  border-width: 5px 5px 0;
  content: ' ';
  display: block;
  height: 0;
  margin-top: -ceil(2.5);
  position: absolute;
  right: 10px;
  top: 14px;
  width: 0
}

&  .is-open .Dropdown-arrow {
  border-color: transparent transparent #999;
  border-width: 0 5px 5px
}

&  .Dropdown-menu {
  background-color: #fff;
  border: 1px solid #ccc;
  box-shadow: 0 1px 0 rgba(0,0,0,.06);
  box-sizing: border-box;
  margin-top: -1px;
  max-height: 200px;
  overflow-y: auto;
  position: absolute;
  top: 100%;
  width: 100%;
  z-index: 1000;
  -webkit-overflow-scrolling: touch
}

& .Dropdown-menu .Dropdown-group>.Dropdown-title {
  padding: 8px 10px;
  color: #333;
  font-weight: 700;
  text-transform: capitalize
}

.Dropdown-option {
  box-sizing: border-box;
  color: rgba(51,51,51,.8);
  cursor: pointer;
  display: block;
  padding: 8px 10px
}

.Dropdown-option:last-child {
  border-bottom-right-radius: 2px;
  border-bottom-left-radius: 2px
}

.Dropdown-option:hover {
  background-color: #f2f9fc;
  color: #333
}

.Dropdown-option.is-selected {
  background-color: #f2f9fc;
  color: #333
}

.Dropdown-noresults {
  box-sizing: border-box;
  color: #ccc;
  cursor: default;
  display: block;
  padding: 8px 10px
}


`;*/
const OLDOverridesDropdownWrapper = styled.div`
  .Dropdown-root {
    position: relative;
    display: inline-block;
  }

  .Dropdown-control {
    position: relative;
    overflow: inherit;
    border: none;
    box-sizing: border-box;
    cursor: default;
    outline: none;
    padding: 0px 1.75em 0px 0px;
    transition: all 200ms ease;
    background-color: white;
  }

  .Dropdown-arrow {
    border-color: #999 transparent transparent;
    border-style: solid;
    border-width: 5px 5px 0;
    content: ' ';
    display: block;
    height: 0;
    margin-top: -ceil(2.5);
    position: absolute;
    right: 10px;
    top: 7px;
    width: 0;
  }

  .Dropdown-menu {
    border: 0;
    box-sizing: border-box;
    margin-top: -1px;
    max-height: 200px;
    overflow-y: auto;
    position: absolute;
    top: 100%;
    z-index: 1000;
    -webkit-overflow-scrolling: touch;
  }

  .Dropdown-menu .Dropdown-group > .Dropdown-title{
    padding: 8px 10px;
    text-transform: capitalize;
  }

  .Dropdown-option {
    box-sizing: border-box;
    cursor: pointer;
    display: block;
    padding-top: 0;
    padding-bottom: 0;
    padding-right: 0;
    padding-left: 0.5em;
  }

  .Dropdown-option:last-child {
    border-bottom-right-radius: 2px;
    border-bottom-left-radius: 2px;
  }

  .Dropdown-noresults {
    box-sizing: border-box;
    cursor: default;
    display: block;
    padding: 8px 10px;
  }

  .Dropdown-container{
    display: inline-block;
  }

  /*.javascript .Dropdown-root{
    margin-left: 0.4em;
  }*/




















  
  .Dropdown-option:hover,
  .Dropdown-option.is-selected:hover,
  .Dropdown-option.is-selected,
  .Dropdown-control {
    color: #bde480;
  }

  .Dropdown-menu {
    border: 1px #7c7c7c solid;
  }

  .Dropdown-control:hover,
  .Dropdown-menu {
    box-shadow: none;
  }

  .is-open .Dropdown-arrow {
    border-color: transparent transparent #999;
    border-width: 0 5px 5px;
  }

  .Dropdown-menu {
    color: #e9fcfc;
  }

  .Dropdown-menu .Dropdown-group>.Dropdown-title {
    color: rgba(51, 51, 51, 1);
    font-weight: bold;
  }

  .Dropdown-option {
    color: rgba(51, 51, 51, 0.8);
    color: #e9fcfc;
  }

  .Dropdown-option:hover,
  .Dropdown-option.is-selected:hover {
    background-color: #333333;
  }

  .Dropdown-control,
  .Dropdown-menu, 
  .Dropdown-option.is-selected {
    background-color: #212121;
  }

  .Dropdown-noresults {
    color: #4A4E63;
    cursor: default;
  }
`;
const Dropdown = (props) => {
  const {options, onChange, placeholder} = props;
  const dropdownOptions = options && options.length >= 1 ? options : [];
  return (
    <OLDOverridesDropdownWrapper>
      <ReactDropdown
        options={dropdownOptions}
        onChange={onChange}
        placeholder={placeholder}
      />
    </OLDOverridesDropdownWrapper>
  );
}

export default Dropdown;