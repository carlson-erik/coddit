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

function Configuration({ subreddit, sort, sortChange }) {
  const { method } = sort;
  const { theme } = useContext(ThemeContext);
  const { comment } = theme.general;
  const { string } = theme.values;
  const { constWord, variableName, classWord, className, extendsWord, extendsName } = theme.languages.javascript;
  return (
    <React.Fragment>
      <Indentation depth={1}>
        <Line>
          <Keyword color={constWord} rightSpace={true}>const</Keyword>
          <Keyword color={variableName} rightSpace={true}>curr_subreddit</Keyword>=
          <KeywordLink color={string} href={"/r/" + subreddit} leftSpace={true}>"{subreddit}"</KeywordLink>;
        </Line>
        <Line>
          <Keyword color={comment}>{"// Reddit Settings"}</Keyword>
        </Line>
        <DropdownLine>
          <Keyword color={constWord} rightSpace={true}>const</Keyword>
          <Keyword color={variableName} rightSpace={true}>sort_by</Keyword>=
          <Keyword leftSpace={true}>
            <Dropdown
              options={commentSortDisplayNames}
              onChange={sortChange}
              placeholder={"\"" + method + "\""}
              fontColor={string}
            />
          </Keyword>;
        </DropdownLine>
      </Indentation>
      <Line/>
      <Indentation depth={1}>
        <Keyword color={classWord} rightSpace={true}>class</Keyword>
        <Keyword color={className} rightSpace={true}>Coddit</Keyword>
        <Keyword color={extendsWord} rightSpace={true}>extends</Keyword>
        <Keyword color={extendsName} rightSpace={true}>Post</Keyword>
        {"{"}
      </Indentation>
    </React.Fragment>
  );
}

function Header({ postHeaderData }) {
  const { all_awardings, url, title, author, created_utc, permalink, selftext, subreddit_name_prefixed, score, subreddit, is_self } = postHeaderData;
  const showURL = url.length > 40 ? url.substring(0, 40) + "..." : url;
  const postAge = getTimeDifferenceString(created_utc);
  const shortTitleArray = permalink.split("/");
  const { theme } = useContext(ThemeContext);
  const { string } = theme.values;
  const { score: {ups, downs}, submitter } = theme.general;
  const { constWord, variableName, functionName, parameterName } = theme.languages.javascript;

  let postContent;
  if (isImageLink(url)) {
    // post is an image
    postContent = (
      <Line>
        <Keyword color={constWord} rightSpace={true}>const</Keyword>
        <Keyword color={variableName} rightSpace={true}>image_link</Keyword>=
        <KeywordLink color={string} leftSpace={true} href={url} target="_blank" rel="noopener noreferrer">"{showURL}"</KeywordLink>;
        <Keyword leftSpace={true}>
          <Preview 
            url={url} 
            title={title} 
            showAllPreviews={true} 
            isImage={true} 
            hideIcon={true} 
            useSemicolon={true} 
        />
        </Keyword>
      </Line>
    );
  } else if (is_self) {
    // show selftext if there is text to show
    if (selftext !== '') {
      postContent = (
        <Line>
          <Keyword color={constWord} rightSpace={true}>const</Keyword>
          <Keyword color={variableName} rightSpace={true}>self_text</Keyword>=
          <Keyword leftSpace={true}>
            <Preview 
              url={url} 
              title={title} 
              showAllPreviews={true} 
              isImage={false} 
              hideIcon={true} 
              useSemicolon={true} 
              markdownText={`"${selftext}";`}
              fontColor={string}
            />
          </Keyword>
        </Line>
      )
    }
  } else {
    // show link
    postContent = (
      <Line>
        <Keyword color={constWord} rightSpace={true}>const</Keyword>
        <Keyword color={variableName} rightSpace={true}>post_link</Keyword>=
        <KeywordLink color={string} leftSpace={true} href={url} target="_blank" rel="noopener noreferrer">"{showURL}"</KeywordLink>;
      </Line>
    );
  }

  return (
    <React.Fragment>
      <Indentation depth={1}>
        <Line>
          <KeywordLink color={functionName} href={permalink}>{shortTitleArray[shortTitleArray.length - 2]}</KeywordLink>
          (
          <Keyword color={parameterName}>score</Keyword>=
          <KarmaScore leftSpace={true} ups={ups} downs={downs} score={score}>
            {score}
          </KarmaScore>,
          <Keyword color={parameterName} leftSpace={true}>subreddit</Keyword>=
          <KeywordLink color={string} href={"/" + subreddit_name_prefixed}>"{subreddit}"</KeywordLink>
          ) {"{"}
        </Line>
        <Indentation depth={1}>
          <PostInformation>
            <Line>
              <Keyword color={constWord} rightSpace={true}>const</Keyword>
              <Keyword color={variableName} rightSpace={true}>full_title</Keyword>=
              <Keyword color={string} leftSpace={true}>"{title}"</Keyword>;
            </Line>
            <Line>
              <Keyword color={constWord} rightSpace={true}>const</Keyword>
              <Keyword color={variableName} rightSpace={true}>author</Keyword>=
              <Keyword color={string} leftSpace={true}>"<Keyword color={submitter}>{author}</Keyword>"</Keyword>;
            </Line>
            <Line>
              <Keyword color={constWord} rightSpace={true}>const</Keyword>
              <Keyword color={variableName} rightSpace={true}>post_age</Keyword>=
              <Keyword color={string} leftSpace={true}>"{postAge}"</Keyword>;
            </Line>
            {all_awardings.length > 0
              ? <Line>
                  <Keyword color={constWord} rightSpace={true}>const</Keyword>
                  <Keyword color={variableName} rightSpace={true}>gildings</Keyword>= [
                  <React.Fragment>
                    {all_awardings.map((award, index) =>
                      <span className={`${award.name.toLowerCase()}-award`} key={award.name}>
                        {`${award.count}${award.name.substring(0, 1).toLowerCase()}${index === all_awardings.length - 1 ? '' : ','}`}
                      </span>
                    )}
                  </React.Fragment>
                  ];
                </Line>
              : null
            }
            {postContent}
          </PostInformation>
        </Indentation>
        <Line>{"}"}</Line>
      </Indentation>
    </React.Fragment>
  );
}

export default function PostView(props) {
  const { isLoading, data, sort, sortChange, match } = props;
  const { headerData, pageList } = data;
  const { theme } = useContext(ThemeContext);
  const { comment } = theme.general;
  const subreddit = getSubreddit(match, sort);
  const postHeaderData = headerData && headerData.data;
  return (
    <React.Fragment>
      <Configuration subreddit={subreddit} sort={sort} sortChange={sortChange} />
      {(headerData && (pageList && pageList.length !== 0)) && !isLoading
        ? <Indentation depth={1}>
            <Header postHeaderData={postHeaderData} />
            <Indentation depth={1}>
              <Line>
                <Keyword color={comment}>{'//  All available comments'}</Keyword>
              </Line>
            </Indentation>
            {pageList.map(page =>
              <Page key={page.pageID} depth={1}>
                {page.itemList.map(comment =>
                  <div key={comment.id}>
                    <Comment data={comment} progLang="javascript" />
                  </div>
                )}
              </Page>
            )}
            {"};"}
          </Indentation>
        : <div className="loadingIndicator">... loading ...</div>
      }
    </React.Fragment>
  );
};