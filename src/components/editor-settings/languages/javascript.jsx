import React, { useContext } from "react";
// ---------- Components ----------
import Dropdown from '../../dropdown';
// ---------- Theme ----------
import { ThemeContext } from '../../../themes';
// ---------- Styled-Components ----------
import { Line, Indentation,  } from '../../../styled-components';
import { DropdownLine } from '../../../styled-components/editor-settings';
import { Keyword } from '../../../styled-components/keywords';
// ---------- Constants ----------
import { themeOptions, progLangList } from '../../../utils/constants';

const JavaScriptEditorSettings = (props) => {
	const {settings, dropdownSelect} = props;
	const {progLang, colorTheme} = settings;
	const { theme } = useContext(ThemeContext);
	const { constWord, variableName } = theme.languages.javascript;
	const { comment } = theme.general;
	const { string } = theme.values;
	return(
		<header>
			<Indentation depth={1}>
				<Line>
						<Keyword color={comment}>{"// Editor Settings"}</Keyword>
				</Line>
				<DropdownLine>
					<Keyword color={constWord} rightSpace={true}>const</Keyword>
					<Keyword color={variableName} rightSpace={true}>prog_lang</Keyword>=
					<Keyword leftSpace={true}>
						<Dropdown 
							options={progLangList} 
							onChange={(option) => dropdownSelect(option, 'progLang')} 
							placeholder={`"${progLang}"`}
							fontColor={string}
						/>
					</Keyword>
					;
				</DropdownLine>
				<DropdownLine>
				<Keyword color={constWord} rightSpace={true}>const</Keyword>
				<Keyword color={variableName} rightSpace={true}>theme_name</Keyword>= 
				<Keyword leftSpace={true}>
					<Dropdown 
						options={themeOptions} 
						onChange={(option) => dropdownSelect(option, 'theme')} 
						placeholder={`"${colorTheme}"`}
						fontColor={string}
					/>
				</Keyword>
				;
				</DropdownLine>
			</Indentation>
		</header>
	);
}
export default JavaScriptEditorSettings;