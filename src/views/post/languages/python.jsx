import React, { useContext } from 'react';  
import Dropdown from 'react-dropdown';
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
// ---------- Styled Components ----------
import { Line, Indentation, Page } from '../../../styled-components';
import { Keyword, KeywordLink, KarmaScore } from '../../../styled-components/keywords';
import { DropdownLine } from '../../../styled-components/editor-settings';
import { PostInformation } from '../../../styled-components/post';

function Configuration ({ subreddit, sort, sortChange }) {
  const { method } = sort;
  const { theme } = useContext(ThemeContext);
  const { string } = theme.values;
  const { comment } = theme.general;
  return (
    <Indentation depth={1}>
      <Line>
        curr_subreddit =
        <KeywordLink color={string} href={"/r/" + subreddit} leftSpace={true} >"{subreddit}"</KeywordLink>
      </Line>
      <Line>
        <Keyword color={comment}># Reddit Settings</Keyword>
      </Line>
      <DropdownLine>
        sort_by =
        <Keyword leftSpace={true}>
          <Dropdown
            options={commentSortDisplayNames}
            onChange={(option) => sortChange(option)}
            placeholder={"\"" + method + "\""}
          />
        </Keyword>
      </DropdownLine>
    </Indentation>
  );
};

function Header({ postHeaderData: data }) {
  const { all_awardings, url, title, author, num_comments, selftext, created_utc, permalink, subreddit_name_prefixed, score, subreddit, is_self } = data;
  const showURL = url.length > 40 ? url.substring(0, 40) + "..." : url;
  const postAge = getTimeDifferenceString(created_utc);
  const shortTitleArray = permalink.split("/");
  const shortTitle = shortTitleArray[shortTitleArray.length - 2];
  const subredditLink = "/" + subreddit_name_prefixed;
  const { theme } = useContext(ThemeContext);
  const { string, integer } = theme.values;
  const { comment, submitter, score: { ups, downs} } = theme.general;
  const { def, functionName, parameterName, forWord, inWord, rangeWord } = theme.languages.python;
  let postContent;
  if (isImageLink(url)) {
    // post is an image
    postContent = (
      <Line>
        image_link =
        <KeywordLink color={string} href={url} target="_blank" rel="noopener noreferrer" leftSpace={true}>"{showURL}"</KeywordLink>
        <Keyword>
          <Preview url={url} title={title} showAllPreviews={true} isImage={true} hideIcon={true} useSemicolon={false} />
        </Keyword>
      </Line>
    );
  } else if (is_self) {
    // show selftext if there is text to show
    if (selftext !== '') {
      postContent = (
        <Line>
          self_text =
          <Keyword>
            <Preview url={url} title={title} showAllPreviews={true} isImage={false} hideIcon={true} useSemicolon={false} markdownText={`"${selftext}"`} />
          </Keyword>
        </Line>
      )
    }
  } else {
    // show link
    postContent = (
      <Line>
        post_link =
        <KeywordLink color={string} href={url} target="_blank" rel="noopener noreferrer" leftSpace={true}>"{showURL}"</KeywordLink>
      </Line>
    );
  }

  return (
    <React.Fragment>
      <Line>
        <Keyword color={def} rightSpace={true}>def</Keyword>
        <KeywordLink color={functionName} href={url} target="_blank" rel="noopener noreferrer">{shortTitle}</KeywordLink>
        (<Keyword color={parameterName}>score</Keyword>=
        <KarmaScore ups={ups} downs={downs} score={score}>{score}</KarmaScore>,
        <Keyword color={parameterName} leftSpace={true}>sub</Keyword>=
        <KeywordLink color={string} href={subredditLink}>"{subreddit}"</KeywordLink>):
      </Line>
      <Indentation depth={1}>
        <PostInformation>
          <Line>
            full_title =
						<Keyword color={string} leftSpace={true}>"{title}"</Keyword>
          </Line>
          <Line>
            author =
						<KeywordLink color={string} href={`/user/${author.toLowerCase()}`} leftSpace={true}>"<Keyword color={submitter}>{author}</Keyword>"</KeywordLink>
          </Line>
          <Line>
            post_age =
						<Keyword color={string} leftSpace={true}>"{postAge}"</Keyword>
          </Line>
          {all_awardings.length > 0
            ? <Line>
                gildings =
                <Keyword leftSpace={true}>
                  [
                  {all_awardings.map((award, index) =>
                    <span className={`${award.name.toLowerCase()}-award`} key={award.name}>
                      {`${award.count}${award.name.substring(0, 1).toLowerCase()}${index === all_awardings.length - 1 ? '' : ','}`}
                    </span>
                  )}
                  ]
                </Keyword>
              </Line>
            : null
          }
          {postContent}
        </PostInformation>
      </Indentation>
      <Indentation depth={1}>
        <Line>
          <Keyword color={comment}># Rendering comments below</Keyword>
        </Line>
        <Line>
          <Keyword color={forWord} rightSpace={true}>for</Keyword>
          comment
					<Keyword color={inWord} rightSpace={true} leftSpace={true}>in</Keyword>
          <Keyword color={rangeWord}>range</Keyword>
          (<Keyword color={integer}>0</Keyword>, 
          <Keyword color={integer} leftSpace={true}>{num_comments}</Keyword>):
				</Line>
      </Indentation>
    </React.Fragment>
  );
}

export default function PostView(props) {
  const { isLoading, data, sort, sortChange, match } = props;
  const { headerData, pageList } = data;
  const subreddit = getSubreddit(match, sort);
  const postHeaderData = headerData && headerData.data;
  return (
    <React.Fragment>
      <Configuration subreddit={subreddit} sort={sort} sortChange={sortChange} />
      {(postHeaderData && (pageList && pageList.length !== 0)) && !isLoading
          ? <Indentation depth={1}>
              <Header postHeaderData={postHeaderData} />
              {pageList.map(page =>
                <Page key={page.pageID} depth={2}>
                  {page.itemList.map(comment =>
                    <div key={comment.id}>
                      <Comment data={comment} progLang="python" />
                    </div>
                  )}
                </Page>
              )}
            </Indentation>
          : <div>... loading ...</div>
        }
    </React.Fragment>
  );
}