import React, { useContext } from 'react';
// ---------- Components ----------
import Checkbox from '../../../components/checkbox';
import LoadingButton from '../../../components/loading-button';
import Post from '../../../components/post'
import Dropdown from '../../../components/dropdown';
// ---------- JS Utilities ----------
import { sortValues, itemLimitValues, linksFromDisplayNames } from '../../../utils/constants';
// ---------- Theme ----------
import { ThemeContext } from '../../../themes';
// ---------- Styled Components ----------
import { Line, Indentation, Page } from '../../../styled-components';
import { DropdownLine } from '../../../styled-components/editor-settings';
import { Keyword, KeywordLink } from '../../../styled-components/keywords';

const JavaScriptHeader = (props) => {
  const { settings, sort, subreddit, onChangeShowPreviews, onChangeSortBy, onChangeTimeFrame, onChangePostCount } = props;
  const { showAllPreviews, itemLimit, } = settings;
  const { method, timeFrame } = sort;
  const { theme } = useContext(ThemeContext);
  const { background } = theme;
  const { comment } = theme.general;
  const { string } = theme.values;
	const { constWord, variableName } = theme.languages.javascript;
  return (
    <Indentation depth={1}>
      <Line>
        <Keyword color={constWord} rightSpace={true}>const</Keyword>
        <Keyword color={variableName} rightSpace={true}>curr_subreddit</Keyword>=
        <KeywordLink color={string} href={"/r/" + subreddit} leftSpace={true}>"{subreddit}"</KeywordLink>;
      </Line>
      <Line>
        <Keyword color={constWord} rightSpace={true}>const</Keyword>
        <Keyword color={variableName} rightSpace={true}>show_all_previews</Keyword>=
        <Checkbox
          checked={showAllPreviews}
          onChange={onChangeShowPreviews}
          bgColor={background}
          checkCheckedColor={string}
        />
      </Line>
      <Line>
        <Keyword color={comment}>{"// Reddit Settings"}</Keyword>
      </Line>
      <DropdownLine>
        <Keyword color={constWord} rightSpace={true}>const</Keyword>
        <Keyword color={variableName} rightSpace={true}>sort_by</Keyword>=
        <Keyword leftSpace={true}>
          <Dropdown
            options={sortValues}
            onChange={onChangeSortBy}
            placeholder={`"${method}"`}
          />
        </Keyword>
        ;
      </DropdownLine>
      {method === "controversial" || method === "top"
        ? <DropdownLine>
            <Keyword color={constWord} rightSpace={true}>const</Keyword>
            <Keyword color={variableName} rightSpace={true}>links_from</Keyword>=
            <Keyword leftSpace={true}>
              <Dropdown
                options={linksFromDisplayNames}
                onChange={onChangeTimeFrame}
                placeholder={`'${timeFrame}'`}
              />
            </Keyword>
            ;
          </DropdownLine>
        : null
      }
      <DropdownLine>
        <Keyword color={constWord} rightSpace={true}>const</Keyword>
        <Keyword color={variableName} rightSpace={true}>post_count</Keyword>=
        <Keyword leftSpace={true}>
          <Dropdown
            options={itemLimitValues}
            onChange={onChangePostCount}
            placeholder={itemLimit}
          />
        </Keyword>
        ;
      </DropdownLine>
    </Indentation>
  );
};

const JavaScriptPageList = (props) => {
  const { data, settings, isLoading, fetchNextPage } = props;
  const { showAllPreviews, itemLimit } = settings;
  const { pageList } = data;
  const { theme } = useContext(ThemeContext);
  const { comment } = theme.general;
  const { classWord, className, extendsWord, extendsName } = theme.languages.javascript;
  return (
    <React.Fragment>
      <Line></Line>
      <Indentation depth={1}>
        <Keyword color={classWord} rightSpace={true}>class</Keyword>
        <Keyword color={className} rightSpace={true}>Coddit</Keyword>
        <Keyword color={extendsWord} rightSpace={true}>extends</Keyword>
        <Keyword color={extendsName} rightSpace={true}>Post</Keyword>
        {"{"}
      </Indentation>
      {pageList.map(page =>
        <Page key={page.pageID} depth={2}>
          {page.itemList.map(post =>
            <Post key={post.id} progLang='javascript' post={post} showAllPreviews={showAllPreviews} />
          )}
          <Line>
            <Keyword color={comment}>{`//  ------------ END OF PAGE ${page.pageNumber} ------------`}</Keyword>
          </Line>
        </Page>
      )}
      <LoadingButton loadFunc={() => fetchNextPage()} isLoading={isLoading} itemLimit={itemLimit} />
      <Indentation depth={1}>
        <Line>{"}"}</Line>
      </Indentation>
    </React.Fragment>
  );
};

export { JavaScriptPageList, JavaScriptHeader };