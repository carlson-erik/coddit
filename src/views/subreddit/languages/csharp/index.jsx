import React from 'react';
import Dropdown from 'react-dropdown';
// ---------- Components ----------
import Checkbox from '../../../../components/checkbox';
import LoadingButton from '../../../../components/loading-button';
import Post from '../../../../components/post'
// ---------- JS Utilities ----------
import { sortValues, itemLimitValues, linksFromDisplayNames } from '../../../../utils/constants';
// ---------- Styled Components ----------
import { Line, Indentation, Page } from '../../../../styled-components/';
import { Keyword, KeywordLink } from '../../../../styled-components/keywords';

const CSharpHeader = (props) => {
  const { settings, sort, subreddit, onChangeShowPreviews, onChangeSortBy, onChangeTimeFrame, onChangePostCount } = props;
  const { showAllPreviews, itemLimit, } = settings;
  const { method, timeFrame } = sort;
  return (
    <Indentation depth={1}>
      <Line>
        usingCurrentSubreddit.
        <KeywordLink href={"/r/" + subreddit} >{subreddit}</KeywordLink>;
      </Line>
      <Line>
        usingShowAllPreviews.
        <Checkbox
          checked={showAllPreviews}
          onChange={onChangeShowPreviews}
          bgColor='#282C34'
          checkCheckedColor='#A1EF9D'
        />
      </Line>
      <Line>
        <span className="codeComment">{"// Reddit Settings"}</span>
      </Line>
      <Line>
        usingSortBy.
        <Dropdown
          options={sortValues}
          onChange={onChangeSortBy}
          placeholder={method + ";"}
        />
      </Line>
      {method === "controversial" || method === "top"
        ? <Line>
            usingLinksFromLast.
            <Dropdown
              options={linksFromDisplayNames}
              onChange={onChangeTimeFrame}
              placeholder={timeFrame + ";"}
            />
          </Line>
        : null
      }
      <Line>
        usingPostCount.
        <Dropdown
          options={itemLimitValues}
          onChange={onChangePostCount}
          placeholder={itemLimit + ";"}
        />
      </Line>
    </Indentation>
  );
}

const CSharpPageList = (props) => {
  const { data, settings, isLoading, fetchNextPage } = props;
  const { showAllPreviews, itemLimit } = settings;
  const { pageList } = data;
  return (
    <React.Fragment>
      <Line/>
      <Indentation depth={1}>
        <Keyword rightSpace={true}>namespace</Keyword>
        <Keyword rightSpace={true}>Coddit</Keyword>
        {"{"}
      </Indentation>
      <Line/>
      <Indentation depth={2}>
        <Keyword rightSpace={true}>public</Keyword>
        <Keyword rightSpace={true}>class</Keyword>
        <Keyword rightSpace={true}>Subreddit</Keyword>
        {"{"}
      </Indentation>
      <Line/>
      <Indentation depth={3}>
        {pageList.map(page =>
          <CSharpPage key={page.pageID} page={page} showAllPreviews={showAllPreviews} />
        )}
      </Indentation>
      <LoadingButton loadFunc={() => fetchNextPage()} isLoading={isLoading} itemLimit={itemLimit} />
      <Line/>
      <Indentation depth={2}>
        {"}"}
      </Indentation>
      <Line/>
      <Indentation depth={1}>
        {"}"}
      </Indentation>
    </React.Fragment>
  );
}

const CSharpPage = (props) => {
  const { page, showAllPreviews } = props;
  return (
    <Page>
      {page.itemList.map(post =>
        <Post key={post.id} post={post} progLang='csharp' showAllPreviews={showAllPreviews} />
      )}
      <Line>
        <span className="codeComment">{`//  ------------ END OF PAGE ${page.pageNumber} ------------`}</span>
      </Line>
    </Page>
  );
};


export { CSharpPageList, CSharpHeader };