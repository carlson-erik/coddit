// sort dropdown values
export const sortValues = [
	"hot",
	"top",
	"new",
	"controversial",
];

export const commentSortDisplayNames = [
	...sortValues,
	"q&a"
];

// post limit dropdown values
export const itemLimitValues = [
	"10",
	"25",
	"50",
	"100"
];

// time frame dropdown values
export const linksFromValues = [
	"hour",
	"24hours",
	"week",
	"month",
	"year",
	"all"
];

// links_from dropdown values
export const linksFromDisplayNames = [
	"past hour",
	"past 24 hours",
	"past week",
	"past month",
	"past year",
	"all time"
];

// Map containing all the values needed to convert between 
// the display string values for "time_frame" and it's corresponding
// api string value.
export const linksFromMap = {
	// -------- api string to display value --------
	"hour" : "past hour",
	"24hours" : "past 24 hours",
	"week" : "past week",
	"month" : "past month",
	"year" : "past year",
	"all" : "all time",
	// -------- display value to api string --------
	"past hour" : "hour",
	"past 24 hours" : "24hours",
	"past week" : "week",
	"past month" : "month",
	"past year" : "year",
	"all time" : "all" 
};

// translate from sort display -> sort function
export const commentSortDisplayTranslateObject = {
	"best" : "confidence",
	"top" : "top",
	"new" : "new",
	"controversial" : "controversial",
	"q&a" : "qa",
}

// translate from sort function -> display
export const commentSortFunctionTranslateObject = {
	"confidence" : "best",
	"top" : "top",
	"new" : "new",
	"controversial" : "controversial",
	"qa" : "q&a",
}

export const themeOptions = [
	'oneDark',
	'oneLight',
	'materialHCDark',
]
export const themeSpacedOptions = [
	{ value: 'oneDark', label: 'one dark' },
	{ value: 'oneLight', label: 'one light' },
	{ value: 'materialHCDark', label: 'hc darker' },	
]

export const progLangList = [
	"csharp",
	"javascript",
	"python",
];

export const themeColors = {
	"oneDark" : "#282C34",
	"oneLight" : "#fafafa", 
	"materialHCDark" : "#212121",
};

export const themeMap = {
	"one dark" : "oneDark",
	"one light" : "oneLight",
	"hc darker" : "materialHCDark",
	"oneDark" : "one dark",
	"oneLight" : "one light",
	"materialHCDark" : "hc darker",
};


// Default values
export const sortDefault = sortValues[0];
export const timeFrameDefault = linksFromValues[1];
export const itemLimitDefault = itemLimitValues[1];

