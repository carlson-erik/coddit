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
  const { match, isLoading, settings, sort } = props;
  const { progLang } = settings;

  const sortChange = (option) => {
		// const newSortFunction = sortDisplayTranslateObject[option.value];
    // this.fetchPage(newSortFunction);
    console.log(`sortChange: ${option}`)
	}

  const fetchPage = () => {
    const { setLoadingStatus } = props;
    const postURL = getPostURL(match, sort);
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
    const page = {
      pageNumber: 1,
      itemList: children.map(child => child.data),
      pageID: after && after !== '' ? after : `commentPage-1`,
    };
    batch(() => {
      setLoadingStatus(false);
      createPage(itemCount, '', headerData, page)
    });
  }

  useEffect(() => {
    // fetch page on load of the view
    fetchPage();// eslint-disable-next-line
  }, []);

  // console.log(`Post View (${isLoading}):`, props.data);

  // Render the Post is the correct language
  switch(progLang) {
    case "javascript":
      return (
        <JavaScriptPostView {...props} sortChange={sortChange}/>
      );
    case "csharp":
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