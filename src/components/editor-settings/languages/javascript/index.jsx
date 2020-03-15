import React from "react";
import styled from 'styled-components';
// ---------- Components ----------
import Dropdown from '../../../dropdown';
// ---------- Styled-Components ----------
import Keyword from '../../../../styled-components/keyword';
import Line from '../../../../styled-components/line';
import Indentation from '../../../../styled-components/indentation';
// ---------- Constants ----------
import {themeOptions, progLangList} from '../../../../utils/constants';

const String = styled(Keyword)`
  color: green;
`;

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