import React from "react";
// ---------- Components ----------
import Preview from '../../../preview';
// ---------- JS Utilities ----------
import { getTimeDifferenceString } from '../../../../utils/time';
import { isImageLink } from '../../../../utils/image';
// ---------- Styled Components ----------
import { Line, Indentation } from '../../../../styled-components';
import { Keyword, KeywordLink, Submitter } from '../../../../styled-components/keywords';
import { PostInformation } from '../../../../styled-components/post';

const CSharpPost = (props) => {
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
        <Keyword leftSpace={true} rightSpace={true}>image_link</Keyword>=
        <KeywordLink href={url} target="_blank" rel="noopener noreferrer" leftSpace={true}>"{showURL}"</KeywordLink>;
        <Preview url={url} title={title} showAllPreviews={showAllPreviews} useSemicolon={true} isImage={true} />

      </Line>
    );
  } else if (is_self) {
    // show selftext if there is text to show
    if (selftext !== '') {
      postContent = (
        <Line>
          <span className="var">var</span>
          <Keyword leftSpace={true} rightSpace={true}>self_text</Keyword>=
          <Keyword leftSpace={true}>
            <Preview url={url} title={title} showAllPreviews={showAllPreviews} useSemicolon={true} isImage={false} markdownText={`"${selftext}";`} />
          </Keyword>
        </Line>
      )
    }
  } else {
    // show link
    postContent = (
      <Line>
        <span className="var">var</span>
        <Keyword leftSpace={true} rightSpace={true}>post_link</Keyword>=
        <KeywordLink href={url} target="_blank" rel="noopener noreferrer">"{showURL}"</KeywordLink>;
      </Line>
    );
  }
  return (
    <div>
      <Line>
        <Keyword rightSpace={true}>public</Keyword>
        <a href={permalink} className="function">{shortTitleArray[shortTitleArray.length - 2]}</a>
        (
        <Keyword leftSpace={true} rightSpace={true}>int</Keyword>
        <Keyword rightSpace={true}>score</Keyword>=
        <Keyword leftSpace={true}>{ups}</Keyword>,
        <Keyword leftSpace={true} rightSpace={true}>string</Keyword>
        <Keyword rightSpace={true}>subreddit</Keyword>=
          <KeywordLink href={"/" + subreddit_name_prefixed} leftSpace={true} rightSpace={true}>"{subreddit}"</KeywordLink>
        ) {"{"}
      </Line>
      <Indentation depth={1}>
        <PostInformation>
          <Line>
            <span className="var">var</span>
            <Keyword leftSpace={true} rightSpace={true}>full_title</Keyword>=
            <Keyword leftSpace={true}>"{title}"</Keyword>;
          </Line>
          <Line>
            <span className="var">var</span>
            <Keyword leftSpace={true} rightSpace={true}>author</Keyword>=
            <Keyword leftSpace={true} rightSpace={true}>"<Submitter>{author}</Submitter>"</Keyword>;
          </Line>
          <Line>
            <span className="var">var</span>
            <Keyword leftSpace={true} rightSpace={true}>post_age</Keyword>=
            <Keyword leftSpace={true} rightSpace={true}>"{postAge}"</Keyword>;
          </Line>
          {all_awardings.length > 0
              ? <Line>
                  <span className="var">var</span>
                  <Keyword leftSpace={true} rightSpace={true}>gildings</Keyword>=
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

export default CSharpPost;