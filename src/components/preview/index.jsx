import React, {useState} from "react";
import styled from 'styled-components';
// import PropTypes from 'prop-types';
import Image from "./image";
import Checkbox from '../checkbox';
import ReactMarkdown from 'react-markdown';
// ---------- JS Utilities ----------
import { replaceAll } from '../../utils/string';
// ---------- Styled-Components ----------
const HideShowIcon = styled.span``; 

function Preview(props) {
  // pull needed values from props
  const { isImage, showAllPreviews, url, title, markdownText, useSemicolon, hideIcon, className } = props;
  // set initial show state to be showAllPreviews
  const [showPreview, togglePreview] = useState(showAllPreviews);
  const shown = showAllPreviews === true ? showAllPreviews : showPreview;
  const checkbox = (
    <Checkbox
      checked={shown}
      onChange={() => togglePreview(!showPreview)}
      bgColor='#4A4E63'
      checkCheckedColor='#A1EF9D'
    />
  )

  const dotString = !useSemicolon ? '"..."' : '"...";';

  const iconStyles = hideIcon ? `selftext_preview hideIcon ${className}` : `selftext_preview ${className}`;
  // remove bad characters sometimes sent by reddit
  const updatedMarkdown = markdownText && markdownText !== '' ? replaceAll(markdownText, '&amp;#x200B;', '') : "";
  if (isImage) {
    if (shown) {
      return (
        <React.Fragment>
          <span>{checkbox}</span>
          <Image imageURL={url} imageTitle={title} />
        </React.Fragment>
      );
    }
    return (checkbox);
  } else {
    if (shown) {
      return (
        <React.Fragment>
          <span>{checkbox}</span>
          <div className="cancelMargin string selftext_preview">
            <ReactMarkdown source={updatedMarkdown} />
          </div>
        </React.Fragment>
      );
    }
    return (
      <React.Fragment>
        {dotString} {checkbox}
      </React.Fragment>
    );
  }
}

export default Preview;