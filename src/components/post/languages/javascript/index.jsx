import React from "react";
// ---------- Components ----------
import Preview from '../../../preview';
// ---------- JS Utilities ----------
import { getTimeDifferenceString } from '../../../../utils/time';
import { isImageLink } from '../../../../utils/image';
// ---------- Styled Components ----------
import { Keyword, Line, Indentation } from '../../../../styled-components/';
import { String, StringLink } from '../../../../styled-components/keywords';
import { PostInformation } from '../../../../styled-components/post';

const JavaScriptPost = (props) => {
  const { post, showAllPreviews } = props;
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
        <span className="const">const</span>
        <Keyword leftSpace={true} rightSpace={true}>image_link</Keyword>=
        <StringLink href={url} target="_blank" rel="noopener noreferrer" leftSpace={true}>"{showURL}"</StringLink>;
        <String leftSpace={true}>
          <Preview url={url} title={title} showAllPreviews={showAllPreviews} useSemicolon={true} isImage={true} />
        </String>
      </Line>
    );
  } else if (is_self) {
    // show selftext if there is text to show
    if (selftext !== '') {
      postContent = (
        <Line>
          <span className="const">const</span>
          <Keyword leftSpace={true} rightSpace={true}>self_text</Keyword>=
          <String leftSpace={true}>
            <Preview url={url} title={title} showAllPreviews={showAllPreviews} isImage={false} useSemicolon={true} markdownText={`"${selftext}";`} />
          </String>
        </Line>
      )
    }
  } else {
    // show link
    postContent = (
      <Line>
        <span className="const">const</span>
        <Keyword leftSpace={true} rightSpace={true}>post_link</Keyword>=
        <StringLink href={url} target="_blank" rel="noopener noreferrer" leftSpace={true}>"{showURL}"</StringLink>;
      </Line>
    );
  }
  return (
    <div>
      <Line>
        <a href={permalink} className="function">{shortTitleArray[shortTitleArray.length - 2]}</a>
        (
        <span className='parameterName first'>score</span>=
        <span className="parameter">{ups}</span>,
        <Keyword leftSpace={true}>subreddit</Keyword>=
        <StringLink href={"/" + subreddit_name_prefixed}>"{subreddit}"</StringLink>
        ) {"{"}
      </Line>
      <Indentation depth={1}>
        <PostInformation>
          <Line>
            <Keyword rightSpace={true}>const</Keyword>
            <Keyword rightSpace={true}>full_title</Keyword>=
					  <String leftSpace={true}>"{title}"</String>;
          </Line>
          <Line>
            <Keyword rightSpace={true}>const</Keyword>
            <Keyword rightSpace={true}>author</Keyword>=
						<String leftSpace={true}>"{author}"</String>;
          </Line>
          <Line>
            <Keyword rightSpace={true}>const</Keyword>
            <Keyword rightSpace={true}>post_age</Keyword>=
						<String leftSpace={true}>"{postAge}"</String>;
          </Line>
          {all_awardings.length > 0
            ? <Line>
              <Keyword rightSpace={true}>const</Keyword>
              <Keyword rightSpace={true}>gildings</Keyword>= [
                {all_awardings.map((award, index) =>
                <span className={`${award.name.toLowerCase()}-award`} key={award.name}>
                  {`${award.count}${award.name.substring(0, 1).toLowerCase()}${index === all_awardings.length - 1 ? '' : ','}`}
                </span>
              )}
                ];
              </Line>
            : null
          }
          {postContent}
        </PostInformation>
        <Line>
          <span className="codeComment">{"// Load comments in current tab"}</span>
        </Line>
        <Line>
          <a href={permalink} className="functionCall">loadComments
          <span className="paren">(<span className="numComments">{num_comments}</span>);</span></a>
        </Line>
      </Indentation>
      <Line>
        {"};"}
      </Line>
    </div>
  )
};

export default JavaScriptPost;