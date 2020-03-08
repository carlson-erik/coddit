import React, { useState } from "react";
import Image from "./image";
import ReactMarkdown from 'react-markdown';
// ---------- JS Utilities ----------
import { replaceAll } from '../../utils/string';

function Preview(props) {
  // pull needed values from props
  const { isImage, showAllPreviews, url, title, markdownText, useSemicolon, hideIcon } = props;
  // set initial show state to be showAllPreviews
  const [showPreview, togglePreview] = useState(showAllPreviews);
  const shown = showAllPreviews === true ? showAllPreviews : showPreview;
  const iconStyle = shown ? 'far fa-minus-square' : 'far fa-plus-square';
  const icon = <i className={iconStyle} onClick={() => togglePreview(!showPreview)}></i>;

  const dotString = !useSemicolon ? '"..."' : '"...";';

  const iconStyles = hideIcon ? "string selftext_preview hideIcon" : "string selftext_preview";
  // remove bad characters sometimes sent by reddit
  const updatedMarkdown = markdownText && markdownText !== '' ? replaceAll(markdownText, '&amp;#x200B;', '') : "";
  if (isImage) {
    if (shown) {
      return (
        <React.Fragment>
          <span className={iconStyles}>{icon}</span>
          <Image imageURL={url} imageTitle={title} />
        </React.Fragment>
      );
    }
    return (icon);
  } else {
    if (shown) {
      return (
        <React.Fragment>
          <span className={iconStyles}>{icon}</span>
          <div className="cancelMargin string selftext_preview">
            <ReactMarkdown source={updatedMarkdown} />
          </div>
        </React.Fragment>
      );
    }
    return (
      <React.Fragment>
        {dotString} {icon}
      </React.Fragment>
    );
  }
}

export default Preview;