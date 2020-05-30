import React from 'react';
// ---------- Components ----------
import Dropdown from '../../../dropdown';
// ---------- Styled-Components ----------
import { Line, Indentation } from '../../../../styled-components/';
import { Keyword } from '../../../../styled-components/keywords';
// ---------- Constants ----------
import {themeSpacedOptions, progLangList, themeMap} from '../../../../utils/constants';

const PythonEditorSettings = (props) => {
	const {settings, dropdownSelect} = props;
	const {progLang, colorTheme} = settings;
	return(
		<header>
			<Indentation depth={1}>
				<Line>
					<span className="codeComment"># Editor Settings</span>
				</Line>
				<Line>
					prog_lang = 
					<Keyword leftSpace={true}>
						<Dropdown 
							options={progLangList} 
							onChange={(option) => dropdownSelect(option, 'progLang')} 
							placeholder={"\"" + progLang + "\""}
						/>
					</Keyword>
				</Line>
				<Line>
					theme_name = 
					<Keyword leftSpace={true}>
						<Dropdown 
							options={themeSpacedOptions} 
							onChange={(option) => dropdownSelect(option, 'theme')} 
							placeholder={"\"" + themeMap[colorTheme] + "\""}
						/>
					</Keyword>
				</Line>
			</Indentation>
		</header>
	);
}
export default PythonEditorSettings;