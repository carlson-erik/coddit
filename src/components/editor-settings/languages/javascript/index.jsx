import React from "react";
// ---------- Components ----------
import Dropdown from '../../../dropdown';
// ---------- Styled-Components ----------
import { Line, Indentation, Keyword } from '../../../../styled-components/';
import { String } from '../../../../styled-components/keywords';
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
					<Keyword leftSpace={true} rightSpace={true}>prog_lang</Keyword>=
					<String leftSpace={true}>
						<Dropdown 
							options={progLangList} 
							onChange={(option) => dropdownSelect(option, 'progLang')} 
							placeholder={`"${progLang}"`}
						/>
					</String>
					;
				</Line>
				<Line>
				<span className="const">const</span>
				<Keyword leftSpace={true} rightSpace={true}>theme_name</Keyword>= 
				<String leftSpace={true}>
					<Dropdown 
						options={themeOptions} 
						onChange={(option) => dropdownSelect(option, 'theme')} 
						placeholder={`"${colorTheme}"`}
					/>
				</String>
				;
				</Line>
			</Indentation>
		</header>
	);
}
export default JavaScriptEditorSettings;