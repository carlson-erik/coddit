import React, { useContext } from 'react';
// ---------- Components ----------
import Checkbox from '../../../components/checkbox';
import LoadingButton from '../../../components/loading-button';
import Post from '../../../components/post';
import Dropdown from '../../../components/dropdown';
// ---------- Theme ----------
import { ThemeContext } from '../../../themes';
// ---------- JS Utilities ----------
import { sortValues, itemLimitValues, linksFromDisplayNames } from '../../../utils/constants';
// ---------- Styled Components ----------
import { Line, Indentation, Page } from '../../../styled-components';
import { Keyword, KeywordLink } from '../../../styled-components/keywords';
import { DropdownLine } from '../../../styled-components/editor-settings';

const CSharpHeader = (props) => {
  const { settings, sort, subreddit, onChangeShowPreviews, onChangeSortBy, onChangeTimeFrame, onChangePostCount } = props;
  const { showAllPreviews, itemLimit, } = settings;
  const { method, timeFrame } = sort;
  const { theme } = useContext(ThemeContext);
  const { background } = theme;
  const { comment } = theme.general;
  const { string } = theme.values;
  const { using, usingPackage } = theme.languages.csharp;
  return (
    <Indentation depth={1}>
      <DropdownLine>
        <Keyword color={using} rightSpace={true}>using</Keyword>
        <Keyword color={usingPackage}>CurrentSubreddit</Keyword>.
        <KeywordLink color={usingPackage} href={"/r/" + subreddit} >{subreddit}</KeywordLink>;
      </DropdownLine>
      <DropdownLine>
        <Keyword color={using} rightSpace={true}>using</Keyword>
        <Keyword color={usingPackage}>ShowAllPreviews</Keyword>.
				<Checkbox
          checked={showAllPreviews}
          onChange={onChangeShowPreviews}
          bgColor={background}
          checkCheckedColor={string}
        />
      </DropdownLine>
      <Line>
        <Keyword color={comment}>{"// Reddit Settings"}</Keyword>
      </Line>
      <DropdownLine>
        <Keyword color={using} rightSpace={true}>using</Keyword>
        <Keyword color={usingPackage}>SortBy</Keyword>.
        <Dropdown
          options={sortValues}
          onChange={onChangeSortBy}
          placeholder={method + ";"}
        />
      </DropdownLine>
      {method === "controversial" || method === "top"
        ? <DropdownLine>
          <Keyword color={using} rightSpace={true}>using</Keyword>
          <Keyword color={usingPackage}>LinksFromLast</Keyword>.
              <Dropdown
            options={linksFromDisplayNames}
            onChange={onChangeTimeFrame}
            placeholder={timeFrame + ";"}
          />
        </DropdownLine>
        : null
      }
      <DropdownLine>
        <Keyword color={using} rightSpace={true}>using</Keyword>
        <Keyword color={usingPackage}>PostCount</Keyword>.
        <Dropdown
          options={itemLimitValues}
          onChange={onChangePostCount}
          placeholder={itemLimit + ";"}
        />
      </DropdownLine>
    </Indentation>
  );
};

const CSharpPageList = (props) => {
  const { data, settings, isLoading, fetchNextPage } = props;
  const { showAllPreviews, itemLimit } = settings;
  const { pageList } = data;
  const { theme } = useContext(ThemeContext);
  const { comment } = theme.general;
  const { namespace, namespaceName, publicWord, classWord, className } = theme.languages.csharp;
  return (
    <React.Fragment>
      <Line />
      <Indentation depth={1}>
        <Keyword color={namespace} rightSpace={true}>namespace</Keyword>
        <Keyword color={namespaceName} rightSpace={true}>Coddit</Keyword>
        {"{"}
      </Indentation>
      <Line />
      <Indentation depth={2}>
        <Keyword color={publicWord} rightSpace={true}>public</Keyword>
        <Keyword color={classWord} rightSpace={true}>class</Keyword>
        <Keyword color={className} rightSpace={true}>Subreddit</Keyword>
        {"{"}
      </Indentation>
      <Line />
      <Indentation depth={3}>
        {pageList.map(page =>
          <Page key={page.pageID}>
            {page.itemList.map(post =>
              <Post key={post.id} post={post} progLang='csharp' showAllPreviews={showAllPreviews} />
            )}
            <Line>
              <Keyword color={comment}>{`//  ------------ END OF PAGE ${page.pageNumber} ------------`}</Keyword>
            </Line>
          </Page>
        )}
      </Indentation>
      <LoadingButton loadFunc={() => fetchNextPage()} isLoading={isLoading} itemLimit={itemLimit} />
      <Line />
      <Indentation depth={2}>
        {"}"}
      </Indentation>
      <Line />
      <Indentation depth={1}>
        {"}"}
      </Indentation>

    </React.Fragment>
  );
}

export { CSharpPageList, CSharpHeader };