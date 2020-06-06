import React, { useState, useContext } from "react";
import styled from 'styled-components';
// import PropTypes from 'prop-types';
import Image from "./image";
import Checkbox from '../checkbox';
import ReactMarkdown from 'react-markdown';
// ---------- Theme  ----------
import { ThemeContext } from '../../themes';
// ---------- JS Utilities ----------
import { replaceAll } from '../../utils/string';
// ---------- Styled Components ----------
const TextColor = styled.span`
    & > * {
      color: ${props => props.color || ''}
    }

    & > * a {
      color: ${props => props.color || ''}
    }
  `;

function Preview(props) {
  // pull needed values from props
  const { isImage, showAllPreviews, url, title, markdownText, useSemicolon, hideIcon, fontColor } = props;
  // set initial show state to be showAllPreviews
  const [showPreview, togglePreview] = useState(showAllPreviews);
  const { theme } = useContext(ThemeContext);
  const shown = showAllPreviews === true ? showAllPreviews : showPreview;
  const dotString = !useSemicolon ? '"..."' : '"...";';
  // remove bad characters sometimes sent by reddit
  const updatedMarkdown = markdownText && markdownText !== '' ? replaceAll(markdownText, '&amp;#x200B;', '') : "";
  const { string } = theme.values;
  const { background } = theme;

  const checkbox = !hideIcon && (
    <Checkbox
      checked={shown}
      onChange={() => togglePreview(!showPreview)}
      bgColor={background}
      checkCheckedColor={string}
    />
  );

  if (isImage) {
    if (shown) {
      return (
        <React.Fragment>
          {checkbox}
          <Image imageURL={url} imageTitle={title} />
        </React.Fragment>
      );
    }
    return (checkbox);
  } else {
    if (shown) {
      return (
        <React.Fragment>
          {checkbox}
          <TextColor color={fontColor && fontColor !== '' ? fontColor : 'black'}>
            <ReactMarkdown source={updatedMarkdown} />
          </TextColor>
        </React.Fragment>
      );
    }
    return (
      <React.Fragment>
        {dotString}{checkbox}
      </React.Fragment>
    );
  }
}

export default Preview;