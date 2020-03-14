import React from "react";
// ---------- JS Utilities ----------
// ---------- Language Renderers ----------
import CSharpPost from './languages/csharp';
import JavaScriptPost from './languages/javascript';
import PythonPost from './languages/python';

export default function Post(props) {
  const { progLang } = props;
  switch (progLang) {
    case 'csharp':
      return <CSharpPost {...props}/>;
    case 'javascript':
      return <JavaScriptPost {...props}/>;
    default:
      return <PythonPost {...props}/>;
  }
}