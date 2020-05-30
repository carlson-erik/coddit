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
import { Line, Indentation, Page } from '../../../../styled-components/';
import { Keyword, KeywordLink } from '../../../../styled-components/keywords';

const Integer = styled(Keyword)`
  color: orange!important;
`;

const JavaScriptHeader = (props) => {
  const { settings, sort, subreddit, onChangeShowPreviews, onChangeSortBy, onChangeTimeFrame, onChangePostCount } = props;
  const { showAllPreviews, itemLimit, } = settings;
  const { method, timeFrame } = sort;
  return (
    <Indentation depth={1}>
      <Line>
        <span className="const">const</span>
        <Keyword leftSpace={true} rightSpace={true}>curr_subreddit</Keyword>=
        <KeywordLink href={"/r/" + subreddit} leftSpace={true}>"{subreddit}"</KeywordLink>;
      </Line>
      <Line>
        <span className="const">const</span>
        <Keyword leftSpace={true} rightSpace={true}>show_all_previews</Keyword>=
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
        <span className="const">const</span>
        <Keyword leftSpace={true} rightSpace={true}>sort_by</Keyword>=
        <Keyword leftSpace={true}>
          <Dropdown
            options={sortValues}
            onChange={onChangeSortBy}
            placeholder={`"${method}"`}
          />
          ;
        </Keyword>
        
      </Line>
      {method === "controversial" || method === "top"
        ? <Line>
            <span className="const">const</span>
            <span className="constName">links_from</span>=
            <Keyword leftSpace={true}><Dropdown
              options={linksFromDisplayNames}
              onChange={onChangeTimeFrame}
              placeholder={`'${timeFrame}'`}
              />
              ;
            </Keyword>
              
          </Line>
        : null
      }
      <Line>
        <span className="const">const</span>
        <Keyword leftSpace={true} rightSpace={true}>post_count</Keyword>=
        <Integer leftSpace={true}>
          <Dropdown
            options={itemLimitValues}
            onChange={onChangePostCount}
            placeholder={itemLimit}
          />
        </Integer>;
      </Line>
    </Indentation>
  );
}

const JavaScriptPageList = (props) => {
  const { data, settings, isLoading, fetchNextPage } = props;
  const { showAllPreviews, itemLimit } = settings;
  const { pageList } = data;
  return (
    <React.Fragment>
      <Line></Line>
      <Indentation depth={1}>
        <Keyword rightSpace={true}>class</Keyword>
        <Keyword rightSpace={true}>Coddit</Keyword>
        <Keyword rightSpace={true}>extends</Keyword>
        <Keyword rightSpace={true}>Post</Keyword>
        {"{"}
      </Indentation>
      {pageList.map(page =>
        <JavaScriptPage key={page.pageID} page={page} showAllPreviews={showAllPreviews} />
      )}
      <LoadingButton loadFunc={() => fetchNextPage()} isLoading={isLoading} itemLimit={itemLimit} />
      <Indentation depth={1}>
        <Line>{"}"}</Line>
      </Indentation>
    </React.Fragment>
  );
}

const JavaScriptPage = (props) => {
  const { page, showAllPreviews } = props;
  return (
    <Page depth={2}>
      {page.itemList.map(post =>
        <Post key={post.id} progLang='javascript' post={post} showAllPreviews={showAllPreviews} />
      )}
      <Line>
        <span className="codeComment">{`//  ------------ END OF PAGE ${page.pageNumber} ------------`}</span>
      </Line>
    </Page>
  );
};

export { JavaScriptPageList, JavaScriptHeader };