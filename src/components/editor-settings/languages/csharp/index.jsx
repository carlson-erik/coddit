import React from "react";
import Dropdown from 'react-dropdown';
// ---------- Constants ----------
import {themeOptions, progLangList} from '../../../../utils/constants';

const CSharpEditorSettings = (props) => {
	const {settings, dropdownSelect} = props;
	const {progLang, colorTheme} = settings;
	return(
		<header>
			<div className="listItem">
				<div className="line">
						<span className="codeComment">{"// Editor Settings"}</span>
				</div>
				<div className="line">
					<span className="using">using</span>
					ProgLang.
					<Dropdown 
						options={progLangList} 
						onChange={(option) => dropdownSelect(option, 'progLang')} 
						placeholder={progLang + ";"}
					/>
				</div>
				<div className="line">
					<span className="using">using</span>
					ThemeName.
					<Dropdown 
						options={themeOptions} 
						onChange={(option) => dropdownSelect(option, 'theme')} 
						placeholder={colorTheme + ";"}
					/>					
				</div>
			</div>
		</header>
	);
}
export default CSharpEditorSettings;