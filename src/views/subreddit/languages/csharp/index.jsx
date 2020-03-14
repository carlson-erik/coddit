import React from 'react';
import Dropdown from 'react-dropdown';
// ---------- Components ----------
import Checkbox from '../../../../components/checkbox';
import LoadingButton from '../../../../components/loading-button';
import Post from '../../../../components/post'
// ---------- JS Utilities ----------
import { sortValues, itemLimitValues, linksFromDisplayNames } from '../../../../utils/constants';
// ---------- Styled Components ----------
import Line from '../../../../styled-components/line';
import Page from '../../../../styled-components/page';
import Indentation from '../../../../styled-components/indentation';

const CSharpHeader = (props) => {
  const { dropdownFunctions, settings, sort, subreddit } = props;
  const { showAllPreviews, itemLimit, } = settings;
  const { method, timeFrame } = sort;
  const { onChangeShowPreviews, onChangeSortBy, onChangeTimeFrame, onChangePostCount } = dropdownFunctions;
  return (
    <Indentation depth={1}>
      <Line>
        <span className="using">using</span>CurrentSubreddit.
        <a href={"/r/" + subreddit} className="string cancelMargin">{subreddit}</a>;
      </Line>
      <Line>
        <span className="using">using</span>ShowAllPreviews.
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
        <span className="using">using</span>SortBy.
                <Dropdown
          options={sortValues}
          onChange={onChangeSortBy}
          placeholder={method + ";"}
        />
      </Line>
      {method === "controversial" || method === "top"
        ? <Line>
            <span className="using">using</span>LinksFromLast.
            <Dropdown
              options={linksFromDisplayNames}
              onChange={onChangeTimeFrame}
              placeholder={timeFrame + ";"}
            />
          </Line>
        : null
      }
      <Line>
        <span className="using">using</span>PostCount.
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
        <span className="namespace">namespace</span>
        <span className="class_name">Coddit</span>
        {"{"}
      </Indentation>
      <Line/>
      <Indentation depth={2}>
        <span className="public">public</span>
        <span className="class">class</span>
        <span className="class_name">Subreddit</span>
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