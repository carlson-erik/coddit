import React, { useEffect } from 'react';
import { batch } from "react-redux";
import axios from 'axios';
// ---------- JS Utilities ----------
import { getSubredditURL } from '../../utils/url';
import { linksFromMap } from '../../utils/constants';
import { getSubreddit } from "../../utils/route-params";
// ---------- Prog Lang Renderers ----------
import { PythonPageList, PythonHeader } from './languages/python';
import { JavaScriptPageList, JavaScriptHeader } from './languages/javascript';
import { CSharpPageList, CSharpHeader } from './languages/csharp';

function Subreddit(props) {
  const { match, settings } = props;
  const { progLang } = settings;
  const subreddit = getSubreddit(match);
  // This method handles checkbox changes
  const onChangeShowPreviews = () => {
    const { settings, updateSettings } = props;
    const { showAllPreviews, itemLimit, colorTheme } = settings;
    updateSettings(itemLimit, progLang, !showAllPreviews, colorTheme);
  }
  // function for onChange of the method dropdown
  const onChangeSortBy = (option) => {
    const { sort, updateSort, clearPageData } = props;
    const { method, timeFrame } = sort;
    const value = `${option.value}`;
    if (value !== method) {
      batch(() => {
        updateSort(value, timeFrame);
        clearPageData();
      })
    }
  }
  // function for onChange of the timeFrame dropdown
  const onChangeTimeFrame = (option) => {
    const { sort, updateSort, clearPageData } = props;
    const { method, timeFrame } = sort;
    const value = `${option.value}`;
    if (value !== linksFromMap[timeFrame]) {
      batch(() => {
        updateSort(method, linksFromMap[value]);
        clearPageData();
      })
    }
  }
  // function for onChange of the itemLimit dropdown
  const onChangePostCount = (option) => {
    const { settings, updateSettings, clearPageData } = props;
    const { itemLimit, showAllPreviews, colorTheme } = settings;
    const value = `${option.value}`;
    if (value !== itemLimit) {
      batch(() => {
        updateSettings( value, progLang, showAllPreviews, colorTheme);
        clearPageData();
      })
    }
  }

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
    // fetch page on load of the view
    const {after, itemCount, pageList} = props.data;
    const {isLoading} = props;
    // only fetch a page onload when we're in an empty state and not currently fetching data
    if(itemCount === 0 && after === '' && pageList.length === 0 && !isLoading){
      fetchPage();// eslint-disable-next-line
    }
  });

  const dropdownFunctions = {
    onChangeShowPreviews,
    onChangeSortBy,
    onChangeTimeFrame,
    onChangePostCount,
  }

  switch (progLang) {
    case 'javascript':
      return (
        <React.Fragment>
          <JavaScriptHeader {...props} dropdownFunctions={dropdownFunctions} subreddit={subreddit}/>
          <JavaScriptPageList {...props} />
        </React.Fragment>
      );
    case 'csharp':
      return (
        <React.Fragment>
          <CSharpHeader {...props} dropdownFunctions={dropdownFunctions} subreddit={subreddit}/>
          <CSharpPageList {...props} />
        </React.Fragment>
      );
    case 'python':
      return (
        <React.Fragment>
          <PythonHeader {...props} dropdownFunctions={dropdownFunctions} subreddit={subreddit}/>
          <PythonPageList {...props} />
        </React.Fragment>
      );
    default:
      return null
  }
}



export default Subreddit;