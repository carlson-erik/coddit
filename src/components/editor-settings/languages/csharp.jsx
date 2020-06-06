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
import { themeOptions, progLangList } from '../../../utils/constants';

const CSharpEditorSettings = (props) => {
	const { settings, dropdownSelect } = props;
	const { progLang, colorTheme } = settings;
	const { theme } = useContext(ThemeContext);
	const { comment } = theme.general;
	const { using, usingPackage } = theme.languages.csharp;
	return(
		<header>
			<Indentation depth={1}>
				<Line>
						<Keyword color={comment}>{"// Editor Settings"}</Keyword>
				</Line>
				<DropdownLine>
					<Keyword color={using} rightSpace={true}>using</Keyword>
					<Keyword color={usingPackage}>ProgLang</Keyword>.
					<Dropdown 
						options={progLangList} 
						onChange={(option) => dropdownSelect(option, 'progLang')} 
						placeholder={progLang + ";"}
						fontColor={usingPackage}
					/>
				</DropdownLine>
				<DropdownLine>
					<Keyword color={using} rightSpace={true}>using</Keyword>
					<Keyword color={usingPackage}>ThemeName</Keyword>.
					<Dropdown 
						options={themeOptions} 
						onChange={(option) => dropdownSelect(option, 'theme')} 
						placeholder={colorTheme + ";"}
						fontColor={usingPackage}
					/>					
				</DropdownLine>
			</Indentation>
		</header>
	);
}
export default CSharpEditorSettings;