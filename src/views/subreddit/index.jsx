import React from 'react';

function Subreddit(props) {
  const { match } = props;
  const { params } = match;
  const { subreddit_id } = params;
  const subreddit = subreddit_id && subreddit_id !== '' ? subreddit_id : 'all'
  return (
    <div>{subreddit} subreddit view</div>
  )
}

export default Subreddit;