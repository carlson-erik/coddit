import React from "react";
import Dropdown from 'react-dropdown';
// ---------- Components ----------
import Checkbox from '../../../../components/checkbox';
import Post from '../../../../components/post';
import LoadingButton from "../../../../components/loading-button";
// ---------- JS Utilities ----------
import { sortValues, itemLimitValues, linksFromDisplayNames } from '../../../../utils/constants';

const CSharpHeader = (props) => {
  const { dropdownFunctions, settings, sort, subreddit } = props;
  const { showAllPreviews, itemLimit, } = settings;
  const { method, timeFrame } = sort;
  const { onChangeShowPreviews, onChangeSortBy, onChangeTimeFrame, onChangePostCount } = dropdownFunctions;
  return (
    <div className="redditSettings">
      <div className="line">
        <span className="using">using</span>CurrentSubreddit.
                <a href={"/r/" + subreddit} className="string cancelMargin">{subreddit}</a>;
            </div>
      <div className="line">
        <span className="using">using</span>ShowAllPreviews.
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
        <span className="using">using</span>SortBy.
                <Dropdown
          options={sortValues}
          onChange={onChangeSortBy}
          placeholder={method + ";"}
        />
      </div>
      {method === "controversial" || method === "top"
        ? <div className="line">
          <span className="using">using</span>LinksFromLast.
                        <Dropdown
            options={linksFromDisplayNames}
            onChange={onChangeTimeFrame}
            placeholder={timeFrame + ";"}
          />
        </div>
        : null
      }
      <div className="line">
        <span className="using">using</span>PostCount.
                <Dropdown
          options={itemLimitValues}
          onChange={onChangePostCount}
          placeholder={itemLimit + ";"}
        />
      </div>
    </div>
  );
}

const CSharpPageList = (props) => {
  const { data, settings, isLoading, fetchNextPage } = props;
  const { showAllPreviews, itemLimit } = settings;
  const { pageList } = data;
  return (
    <>
      <div className="line"></div>
      <div className="csharp_namespace">
        <span className="namespace">namespace</span>
        <span className="class_name">Coddit</span>
        {"{"}
      </div>
      <div className="line"></div>
      <div className="csharp_public_class">
        <span className="public">public</span>
        <span className="class">class</span>
        <span className="class_name">Subreddit</span>
        {"{"}
      </div>
      <div className="line"></div>
      {pageList.map(page =>
        <Page key={page.pageID} page={page} showAllPreviews={showAllPreviews} />
      )}
      <LoadingButton loadFunc={() => fetchNextPage()} isLoading={isLoading} itemLimit={itemLimit} />
      <div className="line"></div>
      <div className="csharp_public_class">
        {"}"}
      </div>
      <div className="line"></div>
      <div className="csharp_namespace">
        {"}"}
      </div>

    </>
  );
}

const Page = (props) => {
  const { page, showAllPreviews } = props;
  return (
    <div className="page">
      {page.itemList.map(post =>
        <Post key={post.id} post={post} progLang='csharp' showAllPreviews={showAllPreviews} />
      )}
      <div className="line">
        <span className="codeComment">{`//  ------------ END OF PAGE ${page.pageNumber} ------------`}</span>
      </div>
    </div>
  );
};


export { CSharpPageList, CSharpHeader };