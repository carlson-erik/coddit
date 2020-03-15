import React from "react";
import styled from 'styled-components';
// ---------- Components ----------
import Preview from '../../../preview';
// ---------- JS Utilities ----------
import { getTimeDifferenceString } from '../../../../utils/time';
import { isImageLink } from '../../../../utils/image';
// ---------- Styled Components ----------
import Keyword from '../../../../styled-components/keyword';
import KeywordLink from '../../../../styled-components/keyword-link';
import Line from '../../../../styled-components/line';
import Indentation from '../../../../styled-components/indentation';
import PostInformation from '../../../../styled-components/post/post-information';

const String = styled(Keyword)`
  color: green;
`;

const StringLink = styled(KeywordLink)`
  color: green;
`;

const Submitter = styled(Keyword)`
  color: red;
`;

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
        <Keyword leftSpace={true} rightSpace={true}>image_link</Keyword>=
        <StringLink href={url} target="_blank" rel="noopener noreferrer" leftSpace={true}>"{showURL}"</StringLink>;
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
          <String leftSpace={true}>
            <Preview url={url} title={title} showAllPreviews={showAllPreviews} useSemicolon={true} isImage={false} markdownText={`"${selftext}";`} />
          </String>
        </Line>
      )
    }
  } else {
    // show link
    postContent = (
      <Line>
        <span className="var">var</span>
        <Keyword leftSpace={true} rightSpace={true}>post_link</Keyword>=
        <StringLink href={url} target="_blank" rel="noopener noreferrer">"{showURL}"</StringLink>;
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
          <StringLink href={"/" + subreddit_name_prefixed} leftSpace={true} rightSpace={true}>"{subreddit}"</StringLink>
        ) {"{"}
      </Line>
      <Indentation depth={1}>
        <PostInformation>
          <Line>
            <span className="var">var</span>
            <Keyword leftSpace={true} rightSpace={true}>full_title</Keyword>=
            <String leftSpace={true}>"{title}"</String>;
          </Line>
          <Line>
            <span className="var">var</span>
            <Keyword leftSpace={true} rightSpace={true}>author</Keyword>=
            <String leftSpace={true} rightSpace={true}>"<Submitter>{author}</Submitter>"</String>;
          </Line>
          <Line>
            <span className="var">var</span>
            <Keyword leftSpace={true} rightSpace={true}>post_age</Keyword>=
            <String leftSpace={true} rightSpace={true}>"{postAge}"</String>;
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