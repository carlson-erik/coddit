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

const JavaScriptHeader = (props) => {
  const { dropdownFunctions, settings, sort, subreddit } = props;
  const { showAllPreviews, itemLimit, } = settings;
  const { method, timeFrame } = sort;
  const { onChangeShowPreviews, onChangeSortBy, onChangeTimeFrame, onChangePostCount } = dropdownFunctions;
  return (
    <Indentation depth={1}>
      <Line>
        <span className="const">const</span>
        <span className="constName">curr_subreddit</span>=
        <a href={"/r/" + subreddit} className="string">"{subreddit}"</a>;
      </Line>
      <Line>
        <span className="const">const</span>
        <span className="constName">show_all_previews</span>=
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
        <span className="constName">sort_by</span>=
        <Dropdown
          options={sortValues}
          onChange={onChangeSortBy}
          placeholder={`"${method}"`}
        />
        ;
      </Line>
      {method === "controversial" || method === "top"
        ? <Line>
            <span className="const">const</span>
            <span className="constName">links_from</span>=
              <Dropdown
              options={linksFromDisplayNames}
              onChange={onChangeTimeFrame}
              placeholder={`'${timeFrame}'`}
            />;
          </Line>
        : null
      }
      <Line>
        <span className="const">const</span>
        <span className="constName">post_count</span>=
        <span className="integer">
          <Dropdown
            options={itemLimitValues}
            onChange={onChangePostCount}
            placeholder={itemLimit}
          />
        </span>;
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
        <span className="class">class</span>
        <span className="className">Coddit</span>
        <span className="extends">extends</span>
        <span className="className">Post</span>
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