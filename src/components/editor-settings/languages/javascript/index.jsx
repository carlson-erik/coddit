import React from "react";
// ---------- Components ----------
import Dropdown from '../../../dropdown';
// ---------- Styled-Components ----------
import Line from '../../../../styled-components/line';
import Indentation from '../../../../styled-components/indentation';
// ---------- Constants ----------
import {themeOptions, progLangList} from '../../../../utils/constants';

const JavaScriptEditorSettings = (props) => {
	const {settings, dropdownSelect} = props;
	const {progLang, colorTheme} = settings;
	return(
		<header>
			<Indentation depth={1}>
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
			</Indentation>
		</header>
	);
}
export default JavaScriptEditorSettings;