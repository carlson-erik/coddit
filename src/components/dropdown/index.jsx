import React, { useContext } from "react";
import styled from 'styled-components';
import {default as ReactDropdown} from 'react-dropdown';
import { ThemeContext } from '../../themes';
// ---------- Styled Components ----------
const OverridesDropdownWrapper = styled.div`
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
    padding: 0.1rem 0.4rem 0.1rem 0.4rem;
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


  .Dropdown-menu,
  .Dropdown-control:hover {
    box-shadow: none;
  }

  .is-open .Dropdown-arrow {
    border-color: transparent transparent #999;
    border-width: 0 5px 5px;
  }

  .Dropdown-option:hover,
  .Dropdown-option.is-selected:hover {
    background-color: ${props => props.hoverBackground || 'transparent'};
    color: ${props => props.hoverFontColor || 'black'} ;
  }

  .Dropdown-control,
  .Dropdown-menu, 
  .Dropdown-option.is-selected {
    background-color: ${props => props.background || 'transparent' };
    color: ${props => props.fontColor || 'black'} ;
  }

  .Dropdown-menu {
    border: 1px ${props => props.menuBorder || 'black'} solid;
  }
`;
const Dropdown = (props) => {
  const {options, onChange, placeholder, fontColor, } = props;
  const dropdownOptions = options && options.length >= 1 ? options : [];
  const { theme } = useContext(ThemeContext);
  const { background, dropdown } = theme;
  const { hoverFontColor, hoverBackground } = dropdown;
  
  return (
    <OverridesDropdownWrapper
      background={background}
      hoverBackground={hoverBackground}
      fontColor={fontColor}
      hoverFontColor={hoverFontColor !== '' ? hoverFontColor : fontColor }
      menuBorder={fontColor}
    >
      <ReactDropdown
        options={dropdownOptions}
        onChange={onChange}
        placeholder={placeholder}
      />
    </OverridesDropdownWrapper>
  );
}

export default Dropdown;