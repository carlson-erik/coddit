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

export default function CSharpPost(props) {
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
        <span className="var">var</span>
        <span className="varName">image_link</span>=
        <a href={url} target="_blank" rel="noopener noreferrer" className="string">"{showURL}"</a>;
        <span className="string" >
          <Preview url={url} title={title} showAllPreviews={showAllPreviews} useSemicolon={true} isImage={true} />
        </span>
      </Line>
    );
  } else if (is_self) {
    // show selftext if there is text to show
    if (selftext !== '') {
      postContent = (
        <Line>
          <span className="var">var</span>
          <span className="varName">self_text</span>=
          <span className="string" >
            <Preview url={url} title={title} showAllPreviews={showAllPreviews} useSemicolon={true} isImage={false} markdownText={`"${selftext}";`} />
          </span>
        </Line>
      )
    }
  } else {
    // show link
    postContent = (
      <Line>
        <span className="var">var</span>
        <span className="varName">post_link</span>=
        <a href={url} target="_blank" rel="noopener noreferrer" className="string">"{showURL}"</a>;
      </Line>
    );
  }
  return (
    <div>
      <Line>
        <span className="public">public</span>
        <a href={permalink} className="function">{shortTitleArray[shortTitleArray.length - 2]}</a>
        (
        <span className="default_type">int</span>
        <span className="parameterName">score</span>=
        <span className="parameter">{ups}</span>,
        <span className="default_type notFirst">string</span>
        <span className="parameterName">subreddit</span>=
          <a href={"/" + subreddit_name_prefixed} className="parameter_string">"{subreddit}"</a>
        ) {"{"}
      </Line>
      <Indentation depth={1}>
        <PostInformation>
          <Line>
            <span className="var">var</span>
            <span className="varName">full_title</span>=
            <span className="string">"{title}"</span>;
          </Line>
          <Line>
            <span className="var">var</span>
            <span className="varName">author</span>=
            <span className="string">"{author}"</span>;
          </Line>
          <Line>
            <span className="var">var</span>
            <span className="varName">post_age</span>=
            <span className="string">"{postAge}"</span>;
          </Line>
          {all_awardings.length > 0
              ? <Line>
                  <span className="var">var</span>
                  <span className="varName">gildings</span>= [
                  <span className="awardings">
                    {all_awardings.map((award, index) =>
                      <span className={`${award.name.toLowerCase()}-award`} key={award.name}>
                        {`${award.count}${award.name.substring(0, 1).toLowerCase()}${index === all_awardings.length - 1 ? '' : ','}`}
                      </span>
                    )}
                  </span>
                    ];
                </Line>
              : null
            }
            {postContent}
          <Line>
            <span className="codeComment">{"// Load comments in current tab"}</span>
          </Line>
          <Line>
            <a href={permalink} className="functionCall">loadComments
            <span className="paren">(<span className="numComments">{num_comments}</span>);</span></a>
          </Line>
        </PostInformation>
      </Indentation>
      <Line>
        {"};"}
      </Line>
    </div>
  )
};