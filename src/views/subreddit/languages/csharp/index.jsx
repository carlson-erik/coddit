import React from 'react';
import styled from 'styled-components';
import Dropdown from 'react-dropdown';
// ---------- Components ----------
import Checkbox from '../../../../components/checkbox';
import LoadingButton from '../../../../components/loading-button';
import Post from '../../../../components/post'
// ---------- JS Utilities ----------
import { sortValues, itemLimitValues, linksFromDisplayNames } from '../../../../utils/constants';
// ---------- Styled Components ----------
import Keyword from '../../../../styled-components/keyword';
import KeywordLink from '../../../../styled-components/keyword-link';
import Line from '../../../../styled-components/line';
import Page from '../../../../styled-components/page';
import Indentation from '../../../../styled-components/indentation';

const StringLink = styled(KeywordLink)`
  color: green;
`;

const CSharpHeader = (props) => {
  const { dropdownFunctions, settings, sort, subreddit } = props;
  const { showAllPreviews, itemLimit, } = settings;
  const { method, timeFrame } = sort;
  const { onChangeShowPreviews, onChangeSortBy, onChangeTimeFrame, onChangePostCount } = dropdownFunctions;
  return (
    <Indentation depth={1}>
      <Line>
        usingCurrentSubreddit.
        <StringLink href={"/r/" + subreddit} >{subreddit}</StringLink>;
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