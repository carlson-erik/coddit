import React from 'react';
import styled from 'styled-components'
// ---------- Components ----------
import Dropdown from '../../../dropdown';
// ---------- Styled-Components ----------
import Line from '../../../../styled-components/line';
import Keyword from '../../../../styled-components/keyword';
import Indentation from '../../../../styled-components/indentation';
// ---------- Constants ----------
import {themeSpacedOptions, progLangList, themeMap} from '../../../../utils/constants';

const String = styled(Keyword)`
  color: green;
`;

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