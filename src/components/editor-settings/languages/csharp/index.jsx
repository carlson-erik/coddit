import React from "react";
// ---------- Components ----------
import Dropdown from '../../../dropdown';
// ---------- Styled-Components ----------
import Line from '../../../../styled-components/line';
import ListItem from '../../../../styled-components/editor-settings/list-item';
// ---------- Constants ----------
import {themeOptions, progLangList} from '../../../../utils/constants';

const CSharpEditorSettings = (props) => {
	const {settings, dropdownSelect} = props;
	const {progLang, colorTheme} = settings;
	return(
		<header>
			<ListItem>
				<Line>
						<span className="codeComment">{"// Editor Settings"}</span>
				</Line>
				<Line>
					<span className="using">using</span>
					ProgLang.
					<Dropdown 
						options={progLangList} 
						onChange={(option) => dropdownSelect(option, 'progLang')} 
						placeholder={progLang + ";"}
					/>
				</Line>
				<Line>
					<span className="using">using</span>
					ThemeName.
					<Dropdown 
						options={themeOptions} 
						onChange={(option) => dropdownSelect(option, 'theme')} 
						placeholder={colorTheme + ";"}
					/>					
				</Line>
			</ListItem>
		</header>
	);
}
export default CSharpEditorSettings;