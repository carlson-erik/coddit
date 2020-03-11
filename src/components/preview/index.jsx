import React, {useState} from "react";
// import PropTypes from 'prop-types';
import Image from "./image";
import Checkbox from '../checkbox';
import ReactMarkdown from 'react-markdown';
// ---------- JS Utilities ----------
import { replaceAll } from '../../utils/string';

function Preview(props) {
  // pull needed values from props
  const { isImage, showAllPreviews, url, title, markdownText, useSemicolon } = props;
  // set initial show state to be showAllPreviews
  const [showPreview, togglePreview] = useState(showAllPreviews);
  const shown = showAllPreviews === true ? showAllPreviews : showPreview;
  const dotString = !useSemicolon ? '"..."' : '"...";';
  // remove bad characters sometimes sent by reddit
  const updatedMarkdown = markdownText && markdownText !== '' ? replaceAll(markdownText, '&amp;#x200B;', '') : "";

  const checkbox = (
    <Checkbox
      checked={shown}
      onChange={() => togglePreview(!showPreview)}
      bgColor='#4A4E63'
      checkCheckedColor='#A1EF9D'
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
          <div className="cancelMargin string selftext_preview">
            <ReactMarkdown source={updatedMarkdown} />
          </div>
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