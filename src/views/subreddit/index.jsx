import React, {useEffect} from 'react';
import axios from 'axios';

function getSubredditURL(subreddit, sort, itemLimit, data){
  const {method, timeFrame} = sort;
  const {after} = data;
  let subredditURL = `https://www.reddit.com/r/${subreddit}/${method}/.json`;
  if(after === ''){
    // fetching the first page
    subredditURL += `?=${timeFrame}&limit=${itemLimit}`;
  } else {
    // NOT fetching the first page
  }
  return subredditURL;
}

function getSubreddit(match){
  const subreddit_id = match && match.params && match.params.subreddit_id;
  if (subreddit_id && subreddit_id !== '') { 
    return subreddit_id;
  }
  return 'all';
}



function Subreddit(props) {
  const { match } = props;
  const subreddit = getSubreddit(match);
  
  const updatePageData = (responseData) => {
    const page  = responseData && responseData.data;
    const {data} = props;
    const {after} = data

    const {after: pageAfter, children, dist} = page;
    console.log(after, pageAfter, children, dist);
  }

  const fetchPage = (subreddit) => {
    const {sort, settings, data} = props;
    const {itemLimit} = settings;
    const pageURL = getSubredditURL(subreddit, sort, itemLimit, data);
    console.log(pageURL);

    // Get the page data from reddit
    axios.get(pageURL)
    .then((response) => {
      const responseData = response && response.data;
      if(responseData)
        updatePageData(responseData);
    })
  };
  
  
  useEffect(() => {
    // fetch page on load of this view
    fetchPage(subreddit);
  });

  return (
    <div>{subreddit} subreddit view</div>
  )
}

export default Subreddit;