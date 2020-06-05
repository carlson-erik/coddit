import React, { useContext } from 'react';
// ---------- JS Utilities ----------
import { isImageLink } from '../../../utils/image';
import { getTimeDifferenceString } from '../../../utils/time';
import { commentSortDisplayNames } from '../../../utils/constants';
import { getSubreddit } from '../../../utils/route-params';
// ---------- Theme ----------
import { ThemeContext } from '../../../themes';
// ---------- Components ----------
import Comment from '../../../components/comment';
import Preview from '../../../components/preview';
import Dropdown from '../../../components/dropdown';
// ---------- Styled Components ----------
import { Line, Indentation, Page } from '../../../styled-components';
import { Keyword, KeywordLink, KarmaScore } from '../../../styled-components/keywords';
import { DropdownLine } from '../../../styled-components/editor-settings';
import { PostInformation } from '../../../styled-components/post';

function Configuration ({ subreddit, sort, sortChange }) {
  const { method } = sort;
  const { theme } = useContext(ThemeContext);
  const { comment } = theme.general;
  const { string } = theme.values;
  const { using, usingPackage, namespace, namespaceName } = theme.languages.csharp;
  return (
    <React.Fragment>
      <Indentation depth={1}>
        <Line>
          <Keyword color={using} rightSpace={true}>using</Keyword>
					<Keyword color={usingPackage}>CurrentSubreddit</Keyword>.
          <KeywordLink color={string} href={"/r/" + subreddit}>{subreddit}</KeywordLink>;
        </Line>
        <Line>
          <Keyword color={comment}>{"// Reddit Settings"}</Keyword>
        </Line>
        <DropdownLine>
          <Keyword color={using} rightSpace={true}>using</Keyword>
          <Keyword color={usingPackage}>SortBy</Keyword>.
          <Dropdown
            options={commentSortDisplayNames}
            onChange={sortChange}
            placeholder={method}
          />;
        </DropdownLine>
      </Indentation>
      <Line />
      <Indentation depth={1}>
        <Keyword color={namespace} rightSpace={true}>namespace</Keyword>
        <Keyword color={namespaceName} rightSpace={true}>Coddit</Keyword>
        {"{"}
      </Indentation>
      <Line />
    </React.Fragment>
  );
}

function Header({ postHeaderData }) {
  const { all_awardings, url, title, author, created_utc, permalink, selftext, subreddit_name_prefixed, score, subreddit, is_self } = postHeaderData;
  const showURL = url.length > 40 ? url.substring(0, 40) + "..." : url;
  const postAge = getTimeDifferenceString(created_utc);
  const shortTitleArray = permalink.split("/");
  const { theme } = useContext(ThemeContext);
  const { submitter, score : { ups, downs} } = theme.general;
  const { string } = theme.values;
  const { variableWord, variableName, publicWord, functionName, parameterName, parameterType } = theme.languages.csharp;

  let postContent;
  if (isImageLink(url)) {
    // post is an image
    postContent = (
      <Line>
        <Keyword color={variableWord} rightSpace={true}>var</Keyword>
        <Keyword color={variableName} rightSpace={true}>image_link</Keyword>=
        <KeywordLink leftSpace={true} href={url} target="_blank" rel="noopener noreferrer">"{showURL}"</KeywordLink>;
        <Keyword leftSpace={true}>
          <Preview url={url} title={title} showAllPreviews={true} useSemicolon={true} isImage={true} hideIcon={true} />
        </Keyword>
      </Line>
    );
  } else if (is_self) {
    // show selftext if there is text to show
    if (selftext !== '') {
      postContent = (
        <Line>
          <Keyword color={variableWord} rightSpace={true}>var</Keyword>
          <Keyword color={variableName} rightSpace={true}>self_text</Keyword>=
          <Keyword>
            <Preview url={url} title={title} showAllPreviews={true} useSemicolon={true} isImage={false} hideIcon={true} markdownText={`"${selftext}";`} />
          </Keyword>
        </Line>
      )
    }
  } else {
    // show link
    postContent = (
      <Line>
        <Keyword color={variableWord} rightSpace={true}>var</Keyword>
        <Keyword color={variableName} rightSpace={true}>post_link</Keyword>=
        <KeywordLink color={string} leftSpace={true} href={url} target="_blank" rel="noopener noreferrer">"{showURL}"</KeywordLink>;
      </Line>
    );
  }
  return (
    <React.Fragment>
      <Indentation depth={1}>
        <Line>
          <Keyword color={publicWord} rightSpace={true}>public</Keyword>
          <KeywordLink color={functionName} href={permalink}>{shortTitleArray[shortTitleArray.length - 2]}</KeywordLink>
          (
          <Keyword color={parameterType} leftSpace={true} rightSpace={true}>int</Keyword>
          <Keyword color={parameterName} rightSpace={true}>score</Keyword>=
          <KarmaScore ups={ups} downs={downs} score={score} leftSpace={true}>{score}</KarmaScore>,
          <Keyword color={parameterType} rightSpace={true} leftSpace={true}>string</Keyword>
          <Keyword color={parameterName} rightSpace={true}>subreddit</Keyword>=
          <KeywordLink leftSpace={true} rightSpace={true} href={"/" + subreddit_name_prefixed}>"{subreddit}"</KeywordLink>
          ) {"{"}
        </Line>
        <Indentation depth={1}>
          <PostInformation>
            <Line>
              <Keyword color={variableWord} rightSpace={true}>var</Keyword>
              <Keyword color={variableName} rightSpace={true}>full_title</Keyword>=
              <Keyword color={string} leftSpace={true}>"{title}"</Keyword>;
            </Line>
            <Line>
              <Keyword color={variableWord} rightSpace={true}>var</Keyword>
              <Keyword color={variableName} rightSpace={true}>author</Keyword>=
              <Keyword color={string} leftSpace={true}>"<Keyword color={submitter}>{author}</Keyword>"</Keyword>;
            </Line>
            <Line>
              <Keyword color={variableWord} rightSpace={true}>var</Keyword>
              <Keyword color={variableName} rightSpace={true}>post_age</Keyword>=
              <Keyword color={string} leftSpace={true}>"{postAge}"</Keyword>;
            </Line>
            {all_awardings.length > 0
              ? <Line>
                  <Keyword color={variableWord} rightSpace={true}>var</Keyword>
                  <Keyword color={variableName} rightSpace={true}>gildings</Keyword>=
                  <Keyword leftSpace={true}>
                  [
                    {all_awardings.map((award, index) =>
                      <span className={`${award.name.toLowerCase()}-award`} key={award.name}>
                        {`${award.count}${award.name.substring(0, 1).toLowerCase()}${index === all_awardings.length - 1 ? '' : ','}`}
                      </span>
                    )}
                  ];
                  </Keyword>
                </Line>
              : null
            }
            {postContent}
          </PostInformation>
        </Indentation>
        <Line>
          {"}"}
        </Line>
      </Indentation>
      {"}"}
      <Line />
    </React.Fragment>
  );
}

function Body(props) {
  const { postHeaderData, pageList } = props;
  const { theme } = useContext(ThemeContext);
  const { publicWord, classWord, className } = theme.languages.csharp;
  return (
    <React.Fragment>
      <Indentation depth={2}>
        <Keyword color={publicWord} rightSpace={true}>public</Keyword>
        <Keyword color={classWord} rightSpace={true}>class</Keyword>
        <Keyword color={className} rightSpace={true}>Post</Keyword>
        {"{"}
      </Indentation>
      <Line />
      <Indentation depth={2}>
        <Header postHeaderData={postHeaderData} />
        <Line>
          <Keyword color={publicWord} rightSpace={true}>public</Keyword>
          <Keyword color={classWord} rightSpace={true}>class</Keyword>
          <Keyword color={className} rightSpace={true}>CommentList</Keyword>
          {"{"}
        </Line>
        {pageList.map(page => 
            <Page key={page.pageID} depth={1}>
              {page.itemList.map(comment => 
                <div key={comment.id}>
                  <Comment data={comment} progLang="csharp" />
                </div>
              )}
            </Page>
          )}
        <Line>
          {"}"}
        </Line>
      </Indentation>
    </React.Fragment>
  );
}

export default function CSharpPostView(props) {
  const { isLoading, data, sort, sortChange, match } = props;
  const { headerData, pageList } = data;
  const subreddit = getSubreddit(match, sort);
  const postHeaderData = headerData && headerData.data;
  return (
    <React.Fragment>
      <Configuration subreddit={subreddit} sort={sort} sortChange={sortChange} />
      {(headerData && (pageList && pageList.length !== 0)) && !isLoading
        ? <Body postHeaderData={postHeaderData} pageList={pageList} isLoading={isLoading} />
        : <div className="loadingIndicator">... loading ...</div>
      }
    </React.Fragment>
  );
}