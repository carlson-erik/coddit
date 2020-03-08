export function getSubreddit(match) {
  const subreddit_id = match && match.params && match.params.subreddit_id;
  if (subreddit_id && subreddit_id !== '') {
    return subreddit_id;
  }
  return 'all';
}

export function getPost(match) {
  const { params } = match;
  const { post_id, post_title, subreddit_id } = params;
  return {
    postID: post_id && post_id !== '' ? post_id : '',
    postTitle: post_title && post_title !== '' ? post_title : '',
    subreddit: subreddit_id && subreddit_id !== '' ? subreddit_id : '',
  }
}