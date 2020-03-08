import React from "react";
// ---------- Prog Lang Renderers ----------
import PythonEditorSettings from "./languages/python";
import CSharpEditorSettings from "./languages/csharp";
import JavaScriptEditorSettings from "./languages/javascript";

const EditorSettings = (props) => {
  const { updateSettings, settings } = props;
  const { itemLimit, progLang, showAllPreviews, colorTheme } = settings;

  // This method dispatches the appropriate state change when an EditorSettings dropdown changes values
  const dropdownSelect = (option, list) => {
    let value = option.value;
    // this shouldn't happen and it isn't too bad to keep around 
    if (value.includes(`'`)) {
      value = value.replace(/'/g, '');
    }
    if (list === 'theme') {
      // update the theme in local storage
      localStorage.setItem("coddit_theme_name", value)

      // Update the theme in state 
      updateSettings(itemLimit, progLang, showAllPreviews, value);
    } else if (list === 'progLang') {
      // update the prog lang in local storage
      localStorage.setItem("coddit_prog_lang", value);

      // Update the progLang in the store
      updateSettings(itemLimit, value, showAllPreviews, colorTheme);
    }
  }

  switch (progLang) {
    case "javascript":
      return (
        <JavaScriptEditorSettings {...props} dropdownSelect={dropdownSelect} />
      );
    case "csharp":
      return (
        <CSharpEditorSettings {...props} dropdownSelect={dropdownSelect} />
      );
    default:
      return (
        <PythonEditorSettings {...props} dropdownSelect={dropdownSelect} />
      );
  }
}

export default EditorSettings;