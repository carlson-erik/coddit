import React, { useContext } from "react";
// ---------- Components ----------
import Dropdown from '../../dropdown';
// ---------- Theme ----------
import { ThemeContext } from '../../../themes';
// ---------- Styled-Components ----------
import { Line, Indentation } from '../../../styled-components';
import { Keyword } from '../../../styled-components/keywords';
import { DropdownLine } from '../../../styled-components/editor-settings';
// ---------- Constants ----------
import {themeSpacedOptions, progLangList, themeMap} from '../../../utils/constants';

const PythonEditorSettings = (props) => {
	const {settings, dropdownSelect} = props;
	const {progLang, colorTheme} = settings;
	const { theme } = useContext(ThemeContext);
	const { comment } = theme.general;
	const { string } = theme.values;
	return(
		<header>
			<Indentation depth={1}>
				<Line>
					<Keyword color={comment}># Editor Settings</Keyword>
				</Line>
				<DropdownLine>
					prog_lang = 
					<Keyword leftSpace={true}>
						<Dropdown 
							options={progLangList} 
							onChange={(option) => dropdownSelect(option, 'progLang')} 
							placeholder={"\"" + progLang + "\""}
							fontColor={string}
						/>
					</Keyword>
				</DropdownLine>
				<DropdownLine>
					theme_name = 
					<Keyword leftSpace={true}>
						<Dropdown 
							options={themeSpacedOptions} 
							onChange={(option) => dropdownSelect(option, 'theme')} 
							placeholder={"\"" + themeMap[colorTheme] + "\""}
							fontColor={string}
						/>
					</Keyword>
				</DropdownLine>
			</Indentation>
		</header>
	);
}
export default PythonEditorSettings;