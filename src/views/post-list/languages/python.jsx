import React, { useContext } from 'react';
// ---------- Components ----------
import Checkbox from '../../../components/checkbox';
import LoadingButton from '../../../components/loading-button';
import Post from '../../../components/post'
import Dropdown from '../../../components/dropdown';
// ---------- JS Utilities ----------
import { sortValues, itemLimitValues, linksFromDisplayNames, linksFromMap } from '../../../utils/constants';
// ---------- Theme ----------
import { ThemeContext } from '../../../themes';
// ---------- Styled Components ----------
import { Line, Indentation, Page } from '../../../styled-components';
import { DropdownLine } from '../../../styled-components/editor-settings';
import { Keyword, KeywordLink } from '../../../styled-components/keywords';

const PythonHeader = (props) => {
  const { settings, sort, subreddit, onChangeShowPreviews, onChangeSortBy, onChangeTimeFrame, onChangePostCount } = props;
  const { showAllPreviews, itemLimit, } = settings;
  const { method, timeFrame } = sort;
  const { theme } = useContext(ThemeContext);
  const { background } = theme;
  const { comment } = theme.general;
  const { string } = theme.values;
  return (
    <Indentation depth={1}>
      <Line>
        curr_subreddit =
        <KeywordLink color={string} leftSpace={true} href={"/r/" + subreddit}>"{subreddit}"</KeywordLink>
      </Line>
      <DropdownLine>
        show_all_previews =
        <Checkbox
            checked={showAllPreviews}
            onChange={onChangeShowPreviews}
            bgColor={background}
            checkCheckedColor={string}
        />
      </DropdownLine>
      <Line>
        <Keyword color={comment}># Reddit Settings</Keyword>
      </Line>
      <DropdownLine>
        sort_by =
        <Keyword leftSpace={true}>
          <Dropdown
            options={sortValues}
            onChange={onChangeSortBy}
            placeholder={"\"" + method + "\""}
            fontColor={string}
          />
        </Keyword>
      </DropdownLine>
      {method === "controversial" || method === "top"
        ? <DropdownLine>
            links_from =
            <Dropdown
              options={linksFromDisplayNames}
              onChange={onChangeTimeFrame}
              placeholder={"\"" + linksFromMap[timeFrame] + "\""}
              fontColor={string}
            />
          </DropdownLine>
        : null
      }
      <DropdownLine>
        post_count =
        <Keyword leftSpace={true}>
          <Dropdown
            options={itemLimitValues}
            onChange={onChangePostCount}
            placeholder={"\"" + itemLimit + "\""}
            fontColor={string}
          />
        </Keyword>
      </DropdownLine>
    </Indentation>
  );
}

const PythonPageList = (props) => {
  const { data, settings, isLoading, fetchNextPage } = props;
  const { showAllPreviews, itemLimit } = settings;
  const { pageList } = data;
  const { theme } = useContext(ThemeContext);
  const { comment } = theme.general;
  return (
    <React.Fragment>
      {pageList.map(page =>
        <Page key={page.pageID} depth={1}>
          {page.itemList.map(post =>
            <Post key={post.id} post={post} progLang='python' showAllPreviews={showAllPreviews} />
          )}
          <Line>
            <Keyword color={comment}># ------------ END OF PAGE {page.pageNumber} ------------</Keyword>
          </Line>
        </Page>
      )}
      <LoadingButton loadFunc={() => fetchNextPage()} isLoading={isLoading} itemLimit={itemLimit} />
    </React.Fragment>
  );
}

export { PythonPageList, PythonHeader };