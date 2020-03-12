import React from "react";
// ---------- Components ----------
import Dropdown from '../../../dropdown';
// ---------- Styled-Components ----------
import Line from '../../../../styled-components/line';
import ListItem from '../../../../styled-components/editor-settings/list-item';
// ---------- Constants ----------
import {themeOptions, progLangList} from '../../../../utils/constants';

const JavaScriptEditorSettings = (props) => {
	const {settings, dropdownSelect} = props;
	const {progLang, colorTheme} = settings;
	return(
		<header>
			<ListItem noMarginBottom={true}>
				<Line>
						<span className="codeComment">{"// Editor Settings"}</span>
				</Line>
				<Line>
					<span className="const">const</span>
					<span className="constName">prog_lang</span>= 
					<Dropdown 
						options={progLangList} 
						onChange={(option) => dropdownSelect(option, 'progLang')} 
						placeholder={`"${progLang}"`}
					/>
					;
				</Line>
				<Line>
				<span className="const">const</span>
				<span className="constName">theme_name</span>= 
					<Dropdown 
						options={themeOptions} 
						onChange={(option) => dropdownSelect(option, 'theme')} 
						placeholder={`"${colorTheme}"`}
					/>
					;
				</Line>
			</ListItem>
		</header>
	);
}
export default JavaScriptEditorSettings;