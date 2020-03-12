import React from "react";
// ---------- Components ----------
import Dropdown from '../../../dropdown';
// ---------- Styled-Components ----------
import Line from '../../../../styled-components/line';
import ListItem from '../../../../styled-components/editor-settings/list-item';
// ---------- Constants ----------
import {themeSpacedOptions, progLangList, themeMap} from '../../../../utils/constants';

const PythonEditorSettings = (props) => {
	const {settings, dropdownSelect} = props;
	const {progLang, colorTheme} = settings;
	return(
		<header>
			<ListItem>
				<Line>
					<span className="codeComment"># Editor Settings</span>
				</Line>
				<Line>
					prog_lang = 
					<Dropdown 
						options={progLangList} 
						onChange={(option) => dropdownSelect(option, 'progLang')} 
						placeholder={"\"" + progLang + "\""}
					/>
				</Line>
				<Line>
					theme_name = 
					<Dropdown 
						options={themeSpacedOptions} 
						onChange={(option) => dropdownSelect(option, 'theme')} 
						placeholder={"\"" + themeMap[colorTheme] + "\""}
					/>
				</Line>
			</ListItem>
		</header>
	);
}
export default PythonEditorSettings;