import React from "react";
// ---------- Components ----------
import Preview from '../../../preview';
// ---------- JS Utilities ----------
import { getTimeDifferenceString } from '../../../../utils/time';
import { isImageLink } from '../../../../utils/image';
// ---------- Styled Components ----------
import Line from '../../../../styled-components/line';
import Indentation from '../../../../styled-components/indentation';
import PostInformation from '../../../../styled-components/post/post-information';

export default function PythonPost(props) {
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
      <div className="line">
        image_link =
        <a href={url} target="_blank" rel="noopener noreferrer" className="string">"{showURL}"</a>
        <span className="string" >
          <Preview url={url} title={title} showAllPreviews={showAllPreviews} isImage={true} useSemicolon={false} />
        </span>
      </div>
    );
  } else if (is_self) {
    // show selftext if there is text to show
    if (selftext !== '') {
      postContent = (
        <div className="line">
          self_text =
          <span className="string" >
            <Preview url={url} title={title} showAllPreviews={showAllPreviews} isImage={false} useSemicolon={false} markdownText={`"${selftext}"`} />
          </span>
        </div>
      )
    }
  } else {
    // show link
    postContent = (
      <div className="line">
        post_link =
        <a href={url} target="_blank" rel="noopener noreferrer" className="string">"{showURL}"</a>
      </div>
    );
  }
  return (
    <div>
      <Line>
        <span className="keyword">def</span>
        <a href={permalink} className="function">{shortTitleArray[shortTitleArray.length - 2]}</a>(<span className="parameter_name">score</span>=<span
          className="parameter">{ups}</span>, <span className="parameter_name">sub</span>=<a href={"/" + subreddit_name_prefixed} className="parameter_string">"{subreddit}"</a><span
            className="symbol">):</span>
      </Line>
      <Indentation depth={1}>
        <PostInformation>
          <Line>
            full_title =
            <span className="string">"{title}"</span>
          </Line>
          <Line>
            author =
            <a href={`/user/${author.toLowerCase()}`} className="string">"{author}"</a>
          </Line>
          <Line>
            post_age =
            <span className="string">"{postAge}"</span>
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
}