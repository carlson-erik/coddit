import React, { useEffect } from 'react';
import axios from 'axios';
import { batch } from 'react-redux';
// ---------- JS Utilities ----------
import { getPost } from '../../utils/route-params';
// ---------- Prog Lang Renderers ----------
import PythonPostView from "./languages/python";
import CSharpPostView from "./languages/csharp";
import JavaScriptPostView from "./languages/javascript";

function getPostURL(match, sort) {
  const { postID, postTitle, subreddit } = getPost(match);
  const { method } = sort
  return `https://www.reddit.com/r/${subreddit}/comments/${postID}/${postTitle}/.json?sort=${method}`;
}

function Post(props) {
  const { match, settings } = props;
  const { progLang } = settings;

  const sortChange = (option) => {
    const { sort, updateSort, clearPageData } = props;
    const { method, timeFrame } = sort;
    const value = `${option.value}`;
    
    if (value !== method) {
      console.log('sortChange', value, value !== method)
      batch(() => {
        updateSort(value, timeFrame);
        clearPageData();
      })
    }
  }

  const fetchPage = () => {
    const { setLoadingStatus, sort } = props;
    const postURL = getPostURL(match, sort);
    console.log('postURL', postURL)
    // Update redux store to show the user that we're fetching data behind the scenes
    setLoadingStatus(true);
    axios.get(postURL).then((response) => {
      const responseData = response && response.data;
      const [ headerResponse, bodyResponse ] = responseData;
      const headerData = headerResponse && headerResponse.data && headerResponse.data.children && headerResponse.data.children[0];
      const bodyData = bodyResponse && bodyResponse.data;
      updateStore(headerData, bodyData);
    })
  }

  const updateStore = (headerData, bodyData) => {
    const { setLoadingStatus, createPage } = props;
    const { children, after } = bodyData;
    const itemCount = children.length;
    const pageID = after && after !== '' ? after : `commentPage-`;
    const page = {
      pageNumber: 1,
      itemList: children.map(child => child.data),
      pageID,
    };
    batch(() => {
      setLoadingStatus(false);
      createPage(itemCount, pageID, headerData, page)
    });
  }

  useEffect(() => {
    // fetch page on load of the view
    const {isLoading, data} = props;
    const {after, itemCount, pageList} = data;
    console.log(itemCount, after, pageList.length, !isLoading)
    // only fetch a page onload when we're in an empty state and not currently fetching data
    if(itemCount === 0 && after === '' && pageList.length === 0 && !isLoading)
      console.log('fetchPage')
      fetchPage(); // eslint-disable-next-line
  }, []);

  // Render the Post is the correct language
  switch(progLang) {
    case 'javascript':
      return (
        <JavaScriptPostView {...props} sortChange={sortChange}/>
      );
    case 'csharp':
      return (
        <CSharpPostView {...props} sortChange={sortChange}/>
      );
    default:
      return (
        <PythonPostView {...props} sortChange={sortChange}/>
      );
  }
}

export default Post;