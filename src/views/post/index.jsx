import React from 'react';

function Post(props) {
  const { match } = props;
  const { params } = match;
  const { post_id, post_title, subreddit_id } = params;
  return (
    <div>{post_id}<br />{post_title}<br />{subreddit_id}<br />post view</div>
  )
}

export default Post;