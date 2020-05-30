import React from 'react';
import styled from 'styled-components';
import Dropdown from 'react-dropdown';
// ---------- JS Utilities ----------
import { isImageLink } from '../../../../utils/image';
import { getTimeDifferenceString } from '../../../../utils/time';
import { commentSortDisplayNames } from '../../../../utils/constants';
import { getSubreddit } from '../../../../utils/route-params';
// ---------- Components ----------
import Comment from '../../../../components/comment';
import Preview from '../../../../components/preview';
// ---------- Styled Components ----------
import { Line, Indentation, Page } from '../../../../styled-components/';
import { Keyword, KeywordLink } from '../../../../styled-components/keywords';
import { PostInformation } from '../../../../styled-components/post';

const Submitter = styled(Keyword)`
  color: red;
`;
function Configuration({ subreddit, sort, sortChange }) {
  const { method } = sort;
  return (
    <React.Fragment>
      <Indentation depth={1}>
        <Line>
          <span className="const">const</span>
          <Keyword leftSpace={true} rightSpace={true}>curr_subreddit</Keyword>=
          <KeywordLink href={"/r/" + subreddit} leftSpace={true}>"{subreddit}"</KeywordLink>;
        </Line>
        <Line>
          <span className="codeComment">{"// Reddit Settings"}</span>
        </Line>
        <Line>
          <span className="const">const</span>
          <Keyword leftSpace={true} rightSpace={true}>sort_by</Keyword>=
          <Keyword leftSpace={true}>
            <Dropdown
              options={commentSortDisplayNames}
              onChange={sortChange}
              placeholder={"\"" + method + "\";"}
            />
          </Keyword>
        </Line>
      </Indentation>
      <Line/>
      <Indentation depth={1}>
        <span className="class">class</span>
        <Keyword leftSpace={true} rightSpace={true}>Coddit</Keyword>
        <span className="extends">extends</span>
        <Keyword leftSpace={true} rightSpace={true}>Post</Keyword>
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

  let postContent;
  if (isImageLink(url)) {
    // post is an image
    postContent = (
      <Line>
        <span className="const">const</span>
        <Keyword leftSpace={true} rightSpace={true}>image_link</Keyword>=
          <KeywordLink leftSpace={true} href={url} target="_blank" rel="noopener noreferrer">"{showURL}"</KeywordLink>;
          <Keyword leftSpace={true} >
            <Preview url={url} title={title} showAllPreviews={true} isImage={true} hideIcon={true} useSemicolon={true} />
          </Keyword>
      </Line>
    );
  } else if (is_self) {
    // show selftext if there is text to show
    if (selftext !== '') {
      postContent = (
        <Line>
          <span className="const">const</span>
          <Keyword leftSpace={true} rightSpace={true}>self_text</Keyword>=
          <Keyword leftSpace={true}>
            <Preview url={url} title={title} showAllPreviews={true} isImage={false} hideIcon={true} useSemicolon={true} markdownText={`"${selftext}";`} />
          </Keyword>
        </Line>
      )
    }
  } else {
    // show link
    postContent = (
      <Line>
        <span className="const">const</span>
        <Keyword leftSpace={true} rightSpace={true}>post_link</Keyword>=
        <KeywordLink leftSpace={true} href={url} target="_blank" rel="noopener noreferrer">"{showURL}"</KeywordLink>;
      </Line>
    );
  }

  return (
    <React.Fragment>
      <Indentation depth={1}>
        <Line>
          <a href={permalink} className="function">{shortTitleArray[shortTitleArray.length - 2]}</a>
          (
          <span className='parameterName first'>score</span>=
          <span className="parameter">{score}</span>,
          <Keyword leftSpace={true}>subreddit</Keyword>=
          <KeywordLink href={"/" + subreddit_name_prefixed}>"{subreddit}"</KeywordLink>
          ) {"{"}
        </Line>
        <Indentation depth={1}>
          <PostInformation>
            <Line>
              <span className="const">const</span>
              <Keyword leftSpace={true} rightSpace={true}>full_title</Keyword>=
                <Keyword leftSpace={true}>"{title}"</Keyword>;
            </Line>
            <Line>
              <span className="const">const</span>
              <Keyword leftSpace={true} rightSpace={true}>author</Keyword>=
              <Keyword leftSpace={true}>"<Submitter>{author}</Submitter>"</Keyword>;
            </Line>
            <Line>
              <span className="const">const</span>
              <Keyword leftSpace={true} rightSpace={true}>post_age</Keyword>=
              <Keyword leftSpace={true}>"{postAge}"</Keyword>;
            </Line>
            {all_awardings.length > 0
              ? <Line>
                  <span className="const">const</span>
                  <Keyword leftSpace={true} rightSpace={true}>gildings</Keyword>= [
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
                <span className="codeComment">
                  {"//  All available comments"}
                </span>
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