import React, {useContext} from "react";
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

const CSharpPost = (props) => {
  const { post, showAllPreviews } = props;
  const { theme } = useContext(ThemeContext);
  const { string, integer } = theme.values;
  const { comment } = theme.general;
  const { publicWord, functionName, variableWord, variableName, parameterType } = theme.languages.csharp;

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
        <Keyword color={variableWord} rightSpace={true}>var</Keyword>
        <Keyword color={variableName} rightSpace={true}>image_link</Keyword>=
        <KeywordLink color={string} href={url} target="_blank" rel="noopener noreferrer" leftSpace={true}>"{showURL}"</KeywordLink>;
        <Preview
          url={url} 
          title={title} 
          showAllPreviews={showAllPreviews} 
          useSemicolon={true} 
          isImage={true} 
        />
      </Line>
    );
  } else if (is_self) {
    // show selftext if there is text to show
    if (selftext !== '') {
      postContent = (
        <Line>
          <Keyword color={variableWord} rightSpace={true}>var</Keyword>
          <Keyword color={variableName} rightSpace={true}>self_text</Keyword>=
          <Keyword leftSpace={true}>
            <Preview 
              url={url} 
              title={title} 
              showAllPreviews={showAllPreviews} 
              useSemicolon={true} 
              isImage={false} 
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
        <Keyword color={variableWord} rightSpace={true}>var</Keyword>
        <Keyword color={variableName} rightSpace={true}>post_link</Keyword>=
        <KeywordLink color={string} href={url} target="_blank" rel="noopener noreferrer">"{showURL}"</KeywordLink>;
      </Line>
    );
  }
  return (
    <div>
      <Line>
        <Keyword color={publicWord} rightSpace={true}>public</Keyword>
        <KeywordLink color={functionName} href={permalink}>{shortTitleArray[shortTitleArray.length - 2]}</KeywordLink>
        (
        <Keyword color={parameterType} leftSpace={true} rightSpace={true}>int</Keyword>
        <Keyword rightSpace={true}>score</Keyword>=
        <Keyword color={integer} leftSpace={true}>{ups}</Keyword>,
        <Keyword color={parameterType} leftSpace={true} rightSpace={true}>string</Keyword>
        <Keyword rightSpace={true}>subreddit</Keyword>=
          <KeywordLink color={string} href={"/" + subreddit_name_prefixed} leftSpace={true} rightSpace={true}>"{subreddit}"</KeywordLink>
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
            <Keyword color={string} leftSpace={true} rightSpace={true}>{`"${author}"`}</Keyword>;
          </Line>
          <Line>
            <Keyword color={variableWord} rightSpace={true}>var</Keyword>
            <Keyword color={variableName} rightSpace={true}>post_age</Keyword>=
            <Keyword color={string} leftSpace={true} rightSpace={true}>"{postAge}"</Keyword>;
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
          <Line>
            <Keyword color={comment}>{"// Load comments in current tab"}</Keyword>
          </Line>
          <Line>
            <KeywordLink color={functionName} href={permalink}>
              loadComments(<Keyword color={integer}>{num_comments}</Keyword>);
            </KeywordLink>
          </Line>
        </PostInformation>
      </Indentation>
      <Line>
        {"};"}
      </Line>
    </div>
  )
};

export default CSharpPost;