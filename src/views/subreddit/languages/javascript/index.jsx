import React from "react";
import Dropdown from 'react-dropdown';
// ---------- Components ----------
import Checkbox from '../../../../components/checkbox';
import Post from '../../../../components/post';
import LoadingButton from "../../../../components/loading-button";
// ---------- JS Utilities ----------
import { sortValues, itemLimitValues, linksFromDisplayNames } from '../../../../utils/constants';

const JavaScriptHeader = (props) => {
  const { dropdownFunctions, settings, sort, subreddit } = props;
  const { showAllPreviews, itemLimit, } = settings;
  const { method, timeFrame } = sort;
  const { onChangeShowPreviews, onChangeSortBy, onChangeTimeFrame, onChangePostCount } = dropdownFunctions;
  return (
    <div className="redditSettings">
      <div className="line">
        <span className="const">const</span>
        <span className="constName">curr_subreddit</span>=
        <a href={"/r/" + subreddit} className="string">"{subreddit}"</a>;
      </div>
      <div className="line">
        <span className="const">const</span>
        <span className="constName">show_all_previews</span>=
        <Checkbox
          checked={showAllPreviews}
          onChange={onChangeShowPreviews}
          bgColor='#282C34'
          checkCheckedColor='#A1EF9D'
        />
      </div>

      <div className="line">
        <span className="codeComment">{"// Reddit Settings"}</span>
      </div>
      <div className="line">
        <span className="const">const</span>
        <span className="constName">sort_by</span>=
        <Dropdown
          options={sortValues}
          onChange={onChangeSortBy}
          placeholder={`"${method}"`}
        />
        ;
            </div>
      {method === "controversial" || method === "top"
        ? <div className="line">
          <span className="const">const</span>
          <span className="constName">links_from</span>=
            <Dropdown
            options={linksFromDisplayNames}
            onChange={onChangeTimeFrame}
            placeholder={`'${timeFrame}'`}
          />;
          </div>
        : null
      }
      <div className="line">
        <span className="const">const</span>
        <span className="constName">post_count</span>=
        <span className="integer">
          <Dropdown
            options={itemLimitValues}
            onChange={onChangePostCount}
            placeholder={itemLimit}
          />
        </span>;
      </div>
    </div>
  );
}

const JavaScriptPageList = (props) => {
  const { data, settings, isLoading, fetchNextPage } = props;
  const { showAllPreviews, itemLimit } = settings;
  const { pageList } = data;
  return (
    <>
      <div className="line"></div>
      <div className="jsClass">
        <span className="class">class</span>
        <span className="className">Coddit</span>
        <span className="extends">extends</span>
        <span className="className">Post</span>
        {"{"}
      </div>
      <div className="line"></div>
      {pageList.map(page =>
        <Page key={page.pageID} page={page} showAllPreviews={showAllPreviews} />
      )}
      <LoadingButton loadFunc={() => fetchNextPage()} isLoading={isLoading} itemLimit={itemLimit} />
      <div className='line jsClass'>{"}"}</div>
    </>
  );
}

const Page = (props) => {
  const { page, showAllPreviews } = props;
  console.log('jspage', props)
  return (
    <div className="page">
      {page.itemList.map(post =>
        <Post key={post.id} progLang='javascript' post={post} showAllPreviews={showAllPreviews} />
      )}
      <div className="line">
        <span className="codeComment">{`//  ------------ END OF PAGE ${page.pageNumber} ------------`}</span>
      </div>
    </div>
  );
};

export { JavaScriptPageList, JavaScriptHeader };