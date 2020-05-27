import React from "react";
// ---------- Components ----------
import Preview from '../../../preview';
// ---------- JS Utilities ----------
import { getTimeDifferenceString } from '../../../../utils/time';
import { isImageLink } from '../../../../utils/image';
// ---------- Styled Components ----------
import { Keyword, Line, Indentation } from '../../../../styled-components/';
import { String, StringLink } from '../../../../styled-components/keywords';
import PostInformation from '../../../../styled-components/post/post-information';

const PythonPost = (props) => {
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
        image_link =
        <StringLink href={url} target="_blank" rel="noopener noreferrer" leftSpace={true}>"{showURL}"</StringLink>
        <String>
          <Preview url={url} title={title} showAllPreviews={showAllPreviews} isImage={true} useSemicolon={false} />
        </String>
      </Line>
    );
  } else if (is_self) {
    // show selftext if there is text to show
    if (selftext !== '') {
      postContent = (
        <Line>
          self_text =
          <String leftSpace={true}>
            <Preview url={url} title={title} showAllPreviews={showAllPreviews} isImage={false} useSemicolon={false} markdownText={`"${selftext}"`} />
          </String>
        </Line>
      )
    }
  } else {
    // show link
    postContent = (
      <Line>
        post_link =
        <StringLink leftSpace={true} href={url} target="_blank" rel="noopener noreferrer">"{showURL}"</StringLink>
      </Line>
    );
  }
  return (
    <div>
      <Line>
        <Keyword rightSpace={true}>def</Keyword>
        <a href={permalink} className="function">{shortTitleArray[shortTitleArray.length - 2]}</a>(<span className="parameter_name">score</span>=<span
          className="parameter">{ups}</span>, <Keyword leftSpace={true}>sub</Keyword>=<StringLink href={"/" + subreddit_name_prefixed} className="parameter_string">"{subreddit}"</StringLink><span
            className="symbol">):</span>
      </Line>
      <Indentation depth={1}>
        <PostInformation>
          <Line>
            full_title =
            <String leftSpace={true}>"{title}"</String>
          </Line>
          <Line>
            author =
            <StringLink leftSpace={true} href={`/user/${author.toLowerCase()}`}>"{author}"</StringLink>
          </Line>
          <Line>
            post_age =
            <String leftSpace={true}>"{postAge}"</String>
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
          <span className="codeComment"># Load comments in current tab</span>
        </Line>
        <Line>
          <a href={permalink} className="functionCall">loadComments({num_comments})</a>
        </Line>
      </Indentation>
    </div>
  )
};

export default PythonPost;