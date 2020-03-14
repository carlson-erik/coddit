import React, { useState } from "react";
// ---------- JS Utilities ----------
import { replaceAll } from '../../utils/string';
// ---------- Language Renderers ----------
import CSharpComment from "./languages/csharp";
import JavaScriptComment from "./languages/javascript";
import PythonComment from "./languages/python";

// Gets all the replies for a given comment, if there are any
function getReplyList(data) {
  return (data
    && data.replies
    && data.replies.data
    && data.replies.data.children
    && data.replies.data.children.map(child => child.data))
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

  // Normal comments don't have children attribute, return nothing if present
  if(data.children) return null;

  // Update the props that will be passed down to proglang renderer
  const commentProps = {
    ...props,
    data: { ...data, body: cleanText(data.body) },
    replyList: getReplyList(data),
    collapsed,
    hideShowComment
  };
  switch (progLang) {
    case "javascript":
      return <JavaScriptComment {...commentProps}/>;
    case "csharp":
      return <CSharpComment  {...commentProps}/>;
    default:
      return <PythonComment {...commentProps}/>;
  };
}

export default Comment;