// sort dropdown values
const sortValues = [
	"hot",
	"top",
	"new",
	"controversial",
];

// post limit dropdown values
const postLimitValues = [
	"10",
	"25",
	"50",
	"100"
];

// time frame dropdown values
const linksFromValues = [
	"hour",
	"24hours",
	"week",
	"month",
	"year",
	"all"
];

// links_from dropdown values
const linksFromDisplayNames = [
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
const linksFromMap = {
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

export {sortDefault, timeFrameDefault, postLimitDefault, sortValues, postLimitValues, linksFromValues, linksFromDisplayNames, linksFromMap};