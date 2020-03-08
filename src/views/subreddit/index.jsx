import React, { useEffect } from 'react';
import { batch } from "react-redux";
import axios from 'axios';
import { getSubredditURL } from '../../utils/url';

function getSubreddit(match) {
  const subreddit_id = match && match.params && match.params.subreddit_id;
  if (subreddit_id && subreddit_id !== '') {
    return subreddit_id;
  }
  return 'all';
}

function Subreddit(props) {
  const { match, settings } = props;
  const { progLang } = settings;
  const subreddit = getSubreddit(match);

  const updateStore = (responseData) => {
    // Get current values and update funcs from store
    const { data, setLoadingStatus, createPageData, updatePageData } = props;
    const { after, itemCount, pageList } = data;
    // Get after and children from recieved page
    const { after: pageAfter, children } = responseData && responseData.data;
    // Update redux store with the new page data
    if (after === '' && itemCount === 0) {
      // first page (initial or settings changed)
      const page = {
        pageNumber: 1,
        itemList: children.map(child => child && child.data),
        pageID: pageAfter,
      };
      batch(() => {
        setLoadingStatus(false);
        createPageData(children.length, pageAfter, page);
      })
    } else {
      // subsequent (not first) pages
      const page = {
        pageNumber: pageList.length + 1,
        itemList: children.map(child => child && child.data),
        pageID: pageAfter,
      };
      batch(() => {
        setLoadingStatus(false);
        updatePageData(itemCount + children.length, pageAfter, page)
      })
    }
  }

  const fetchPage = () => {
    const { sort, settings, data, setLoadingStatus } = props;
    const { itemLimit } = settings;
    const pageURL = getSubredditURL(subreddit, sort, itemLimit, data);
    setLoadingStatus(true);
    // Get next page data from reddit
    axios.get(pageURL).then((response) => {
      const responseData = response && response.data;
      if (responseData)
        updateStore(responseData);
    })
  };

  useEffect(() => {
    // fetch page on load of this view
    fetchPage();// eslint-disable-next-line
  }, []);

  switch (progLang) {
    case 'javascript':
      return (
        <div>javascript</div>
      );
    case 'csharp':
      return (
        <div>csharp</div>
      );
    case 'python':
      return (
        <div>python</div>
      );
    default:
      return null
  }
}



export default Subreddit;