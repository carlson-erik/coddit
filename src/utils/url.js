
export function getSubredditURL(subreddit, sort, itemLimit, data){
  const {method, timeFrame} = sort;
  const {after, itemCount} = data;
  let subredditURL = `https://www.reddit.com/r/${subreddit}/${method}/.json`;
  if(after === ''){
    // fetching the first page
    subredditURL += `?t=${timeFrame}&limit=${itemLimit}`;
  } else {
    // NOT fetching the first page
    subredditURL += `?after=${after}&t=${timeFrame}&limit=${itemLimit}&count=${itemCount}`
  }
  return subredditURL;
}