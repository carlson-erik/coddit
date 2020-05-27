import React from 'react';
// ---------- Components ----------
import Dropdown from '../../../dropdown';
// ---------- Styled-Components ----------
import { Line, Indentation } from '../../../../styled-components/';
import { String } from '../../../../styled-components/keywords';
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
					<String leftSpace={true}>
						<Dropdown 
							options={progLangList} 
							onChange={(option) => dropdownSelect(option, 'progLang')} 
							placeholder={"\"" + progLang + "\""}
						/>
					</String>
				</Line>
				<Line>
					theme_name = 
					<String leftSpace={true}>
						<Dropdown 
							options={themeSpacedOptions} 
							onChange={(option) => dropdownSelect(option, 'theme')} 
							placeholder={"\"" + themeMap[colorTheme] + "\""}
						/>
					</String>
				</Line>
			</Indentation>
		</header>
	);
}
export default PythonEditorSettings;