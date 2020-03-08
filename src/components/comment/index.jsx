import React, { useState } from "react";
// ---------- JS Utilities ----------
import { replaceAll } from '../../utils/string';
// ---------- Language Renderers ----------
import CSharpComment from "./languages/csharp";
import JavaScriptComment from "./languages/javascript";
import PythonComment from "./languages/python";

// Gets all the replies for a given comment, if there are any
function getReplyList(commentData) {
  return (commentData
    && commentData.replies
    && commentData.replies.data
    && commentData.replies.data.children
    && commentData.replies.data.children.map(child => child.data))
    || [];
}

// Used to remove all weird character data from the body text
function cleanText(text) {
  return replaceAll(text, '&amp;#x200B;', '')
}

function Comment(props) {
  const [collapsed, setCollapsed] = useState(false);
  const { data, progLang } = props;
  const hideShowComment = () => {
    setCollapsed(!collapsed);
  };
  const commentProps = {
    ...props,
    data: { ...data, body: cleanText(data.body) },
    replyList: getReplyList(data),
    collapsed,
    hideShowComment
  };
  switch (progLang) {
    case "javascript":
      return (
        <JavaScriptComment {...commentProps} />
      );
    case "csharp":
      return (
        <CSharpComment  {...commentProps} />
      );
    default:
      return (
        <PythonComment {...commentProps} />
      );
  };
}

export default Comment;