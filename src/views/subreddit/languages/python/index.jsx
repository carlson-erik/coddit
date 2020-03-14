import React from 'react';
import Dropdown from 'react-dropdown';
// ---------- Components ----------
import Checkbox from '../../../../components/checkbox';
import LoadingButton from '../../../../components/loading-button';
import Post from '../../../../components/post'
// ---------- JS Utilities ----------
import { sortValues, itemLimitValues, linksFromDisplayNames, linksFromMap } from '../../../../utils/constants';
// ---------- Styled Components ----------
import Line from '../../../../styled-components/line';
import Page from '../../../../styled-components/page';
import Indentation from '../../../../styled-components/indentation';

const PythonHeader = (props) => {
  const { dropdownFunctions, settings, sort, subreddit } = props;
  const { showAllPreviews, itemLimit, } = settings;
  const { method, timeFrame } = sort;
  const { onChangeShowPreviews, onChangeSortBy, onChangeTimeFrame, onChangePostCount } = dropdownFunctions;
  return (
    <Indentation depth={1}>
      <Line>
        curr_subreddit =
        <a href={"/r/" + subreddit} className="string">"{subreddit}"</a>
      </Line>
      <Line>
        show_all_previews =
        <Checkbox
            checked={showAllPreviews}
            onChange={onChangeShowPreviews}
            bgColor='#282C34'
            checkCheckedColor='#A1EF9D'
        />
      </Line>
      <Line>
        <span className="codeComment"># Reddit Settings</span>
      </Line>
      <Line>
        sort_by =
                <Dropdown
          options={sortValues}
          onChange={onChangeSortBy}
          placeholder={"\"" + method + "\""}
        />
      </Line>
      {method === "controversial" || method === "top"
        ? <Line>
            links_from =
            <Dropdown
              options={linksFromDisplayNames}
              onChange={onChangeTimeFrame}
              placeholder={"\"" + linksFromMap[timeFrame] + "\""}
            />
          </Line>
        : null
      }
      <Line>
        post_count =
        <Dropdown
          options={itemLimitValues}
          onChange={onChangePostCount}
          placeholder={"\"" + itemLimit + "\""}
        />
      </Line>
    </Indentation>
  );
}

const PythonPageList = (props) => {
  const { data, settings, isLoading, fetchNextPage } = props;
  const { showAllPreviews, itemLimit } = settings;
  const { pageList } = data;
  console.log('PythonPageList Props:', props)
  return (
    <React.Fragment>
      {pageList.map(page =>
        <PythonPage key={page.pageID} page={page} showAllPreviews={showAllPreviews} />
      )}
      <LoadingButton loadFunc={() => fetchNextPage()} isLoading={isLoading} itemLimit={itemLimit} />
    </React.Fragment>
  );
}

const PythonPage = (props) => {
  const { page, showAllPreviews } = props;
  return (
    <Page depth={1}>
      {page.itemList.map(post =>
        <Post key={post.id} post={post} progLang='python' showAllPreviews={showAllPreviews} />
      )}
      <Line>
        <span className="codeComment"># ------------ END OF PAGE {page.pageNumber} ------------</span>
      </Line>
    </Page>
  );
};

export { PythonPageList, PythonHeader };