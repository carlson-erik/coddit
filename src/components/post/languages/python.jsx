import React, { useContext } from "react";
// ---------- Components ----------
import Preview from '../../preview';
// ---------- JS Utilities ----------
import { getTimeDifferenceString } from '../../../utils/time';
import { isImageLink } from '../../../utils/image';
// ---------- Theme ----------
import { ThemeContext } from '../../../themes';
// ---------- Styled Components ----------
import { Line, Indentation } from '../../../styled-components';
import { Keyword, KeywordLink } from '../../../styled-components/keywords';
import { PostInformation } from '../../../styled-components/post';

const PythonPost = (props) => {
  const { post, showAllPreviews } = props;
  const { theme } = useContext(ThemeContext);
  const { string, integer } = theme.values;
  const { comment } = theme.general;
  const { def, functionName, parameterName } = theme.languages.python;

  // Hide NSFW/over_18 content until toggle has been introduced
  if (post.over_18)
    return (null);
  // since the post is not over 18 (NSFW), pull needed values from the post
  const { all_awardings, url, author, title, permalink, num_comments, ups, subreddit_name_prefixed, subreddit, created_utc, is_self, selftext } = post;
  const postAge = getTimeDifferenceString(created_utc);
  const shortTitleArray = permalink.split("/");
  const showURL = url.length > 40 ? url.substring(0, 40) + "..." : url;

  let postContent;
  if (isImageLink(url)) {
    // post is an image
    postContent = (
      <Line>
        image_link =
        <KeywordLink color={string} href={url} target="_blank" rel="noopener noreferrer" leftSpace={true}>"{showURL}"</KeywordLink>
        <Keyword>
          <Preview url={url} title={title} showAllPreviews={showAllPreviews} isImage={true} useSemicolon={false} />
        </Keyword>
      </Line>
    );
  } else if (is_self) {
    // show selftext if there is text to show
    if (selftext !== '') {
      postContent = (
        <Line>
          self_text =
          <Keyword leftSpace={true}>
            <Preview url={url} title={title} showAllPreviews={showAllPreviews} isImage={false} useSemicolon={false} markdownText={`"${selftext}"`} />
          </Keyword>
        </Line>
      )
    }
  } else {
    // show link
    postContent = (
      <Line>
        post_link =
        <KeywordLink color={string} leftSpace={true} href={url} target="_blank" rel="noopener noreferrer">"{showURL}"</KeywordLink>
      </Line>
    );
  }
  return (
    <div>
      <Line>
        <Keyword color={def} rightSpace={true}>def</Keyword>
        <KeywordLink href={permalink} color={functionName}>{shortTitleArray[shortTitleArray.length - 2]}</KeywordLink>
        (<Keyword color={parameterName}>score</Keyword>=
        <Keyword color={integer}>{ups}</Keyword>,
        <Keyword color={parameterName} leftSpace={true}>sub</Keyword>=
        <KeywordLink  color={string} href={"/" + subreddit_name_prefixed}>"{subreddit}"</KeywordLink>):
      </Line>
      <Indentation depth={1}>
        <PostInformation>
          <Line>
            full_title =
            <Keyword color={string} leftSpace={true}>"{title}"</Keyword>
          </Line>
          <Line>
            author =
            <KeywordLink color={string} leftSpace={true} href={`/user/${author.toLowerCase()}`}>"{author}"</KeywordLink>
          </Line>
          <Line>
            post_age =
            <Keyword color={string} leftSpace={true}>"{postAge}"</Keyword>
          </Line>
          {all_awardings.length > 0
            ? <Line>
              gildings = [
                <span className="awardings">
                {all_awardings.map((award, index) =>
                  <span className={`${award.name.toLowerCase()}-award`} key={award.name}>
                    {`${award.count}${award.name.substring(0, 1).toLowerCase()}${index === all_awardings.length - 1 ? '' : ','}`}
                  </span>
                )}
              </span>
                ]
              </Line>
            : null
          }
          {postContent}
        </PostInformation>
        <Line>
          <Keyword color={comment}># Load comments in current tab</Keyword>
        </Line>
        <Line>
          <KeywordLink color={functionName} href={permalink}>
            loadComments(<Keyword color={integer}>{num_comments}</Keyword>);
          </KeywordLink>
        </Line>
      </Indentation>
    </div>
  )
};

export default PythonPost;