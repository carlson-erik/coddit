import React from "react";
import Dropdown from '../../../dropdown';
// ---------- Constants ----------
import {themeSpacedOptions, progLangList, themeMap} from '../../../../utils/constants';

const PythonEditorSettings = (props) => {
	const {settings, dropdownSelect} = props;
	const {progLang, colorTheme} = settings;
	return(
		<header>
			<div className="listItem">
				<div className="line">
					<span className="codeComment"># Editor Settings</span>
				</div>
				<div className="line">
					prog_lang = 
					<Dropdown 
						options={progLangList} 
						onChange={(option) => dropdownSelect(option, 'progLang')} 
						placeholder={"\"" + progLang + "\""}
					/>
				</div>
				<div className="line">
					theme_name = 
					<Dropdown 
						options={themeSpacedOptions} 
						onChange={(option) => dropdownSelect(option, 'theme')} 
						placeholder={"\"" + themeMap[colorTheme] + "\""}
					/>
				</div>
			</div>
		</header>
	);
}
export default PythonEditorSettings;