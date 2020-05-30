import React from "react";
// ---------- Components ----------
import Dropdown from '../../../dropdown';
// ---------- Styled-Components ----------
import { Line, Indentation,  } from '../../../../styled-components/';
import { Keyword } from '../../../../styled-components/keywords';
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
					<Keyword leftSpace={true}>
						<Dropdown 
							options={progLangList} 
							onChange={(option) => dropdownSelect(option, 'progLang')} 
							placeholder={`"${progLang}"`}
						/>
					</Keyword>
					;
				</Line>
				<Line>
				<span className="const">const</span>
				<Keyword leftSpace={true} rightSpace={true}>theme_name</Keyword>= 
				<Keyword leftSpace={true}>
					<Dropdown 
						options={themeOptions} 
						onChange={(option) => dropdownSelect(option, 'theme')} 
						placeholder={`"${colorTheme}"`}
					/>
				</Keyword>
				;
				</Line>
			</Indentation>
		</header>
	);
}
export default JavaScriptEditorSettings;