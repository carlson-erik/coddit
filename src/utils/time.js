// Takes amount of milisecond difference of two dates and converts it to years
const getMSDifferenceToNow = (timeUTC) => {
  const currentTime = new Date().getTime();
  const passedTime = new Date(timeUTC*1000).getTime()
  return Math.abs( passedTime - currentTime);
}

// Takes amount of milisecond difference of two dates and converts it to minutes
const toMinutesDifference = (msDifference) => {
  return Math.floor(msDifference/(1000 * 60 ));
}

// Takes amount of milisecond difference of two dates and converts it to hours
const toHoursDifference = (msDifference) => {
  return Math.floor(msDifference/(1000 * 60 * 60));
}

// Takes amount of milisecond difference of two dates and converts it to days
const toDaysDifference = (msDifference) => {
  return Math.floor(msDifference/(1000 * 60 * 60 * 24))
}

// Takes amount of milisecond difference of two dates and converts it to years
const toYearsDifference = (msDifference) => {
  return Math.floor(msDifference/(1000 * 60 * 60 * 24 * 365))
}

// Converts the passed utc timestamp into a time/date string
const  getTimeDateString = (timeUTC) => {
  // Convert time from utc to Date obj
  const postTime = new Date(timeUTC*1000);
  // Get time string using newly created Date obj
  const timeString = postTime.toLocaleTimeString(undefined, {
      hour: '2-digit',
      minute: '2-digit',
      month: 'numeric',
      day: 'numeric',
      year: 'numeric',
  });
  return timeString;
}

/*
* Converts the passed utc timestamp into a string with the amount of time 
* passed since the timestamp.
*/
const getTimeDifferenceString = (timeUTC) => {
  // Get difference in milliseconds
  const msDifference = getMSDifferenceToNow(timeUTC);

  // Get difference in hours
  const hoursDiff = toHoursDifference(msDifference);
  // Less than one hour has passed, return difference in minutes
  if(hoursDiff < 1){
      return toMinutesDifference(msDifference) + "m";
  }

  // Return difference in hours
  if(hoursDiff < 24){
      return hoursDiff + "h";
  }

  // Get difference in days
  const daysDiff = toDaysDifference(msDifference);
  if(daysDiff < 365)
      return daysDiff + "d";

  // Get difference in years
  const yearsDiff = toYearsDifference(msDifference);
  return yearsDiff + "y"
}

export {getTimeDifferenceString, getTimeDateString};