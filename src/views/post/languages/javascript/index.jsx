import React from "react";
import Dropdown from 'react-dropdown';
// ---------- JS Utilities ----------
import { isImageLink } from '../../../../utils/image';
import { getTimeDifferenceString } from "../../../../utils/time";
import { commentSortDisplayNames } from '../../../../utils/constants';
import { getSubreddit } from "../../../../utils/route-params";
// ---------- Components ----------
import Comment from '../../../../components/comment';
import Preview from '../../../../components/preview';
// ---------- Styled Components ----------
import Line from '../../../../styled-components/line';
import Page from '../../../../styled-components/page';
import Indentation from '../../../../styled-components/indentation';
import PostInformation from '../../../../styled-components/post/post-information';

function Configuration({ subreddit, sort, sortChange }) {
  const { method } = sort;
  return (
    <React.Fragment>
      <Indentation depth={1}>
        <Line>
          <span className="const">const</span>
          <span className="constName">curr_subreddit</span>=
          <a href={"/r/" + subreddit} className="string">"{subreddit}"</a>;
        </Line>
        <Line>
          <span className="codeComment">{"// Reddit Settings"}</span>
        </Line>
        <Line>
          <span className="const">const</span>
          <span className="constName">sort_by</span>=
            <Dropdown
              options={commentSortDisplayNames}
              onChange={sortChange}
              placeholder={"\"" + method + "\";"}
            />
        </Line>
      </Indentation>
      <Line/>
      <Indentation depth={1}>
        <span className="class">class</span>
        <span className="className">Coddit</span>
        <span className="extends">extends</span>
        <span className="className">Post</span>
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
        <span className="varName">image_link</span>=
          <a href={url} target="_blank" rel="noopener noreferrer" className="string">"{showURL}"</a>;
          <span className="string" >
          <Preview url={url} title={title} showAllPreviews={true} isImage={true} hideIcon={true} useSemicolon={true} />
        </span>
      </Line>
    );
  } else if (is_self) {
    // show selftext if there is text to show
    if (selftext !== '') {
      postContent = (
        <Line>
          <div className="declarationLine">
            <span className="const">const</span>
            <span className="varName">self_text</span>=
          </div>
          <span className="string preview_string" >
            <Preview url={url} title={title} showAllPreviews={true} isImage={false} hideIcon={true} useSemicolon={true} markdownText={`"${selftext}";`} />
          </span>
        </Line>
      )
    }
  } else {
    // show link
    postContent = (
      <Line>
        <span className="const">const</span>
        <span className="varName">post_link</span>=
        <a href={url} target="_blank" rel="noopener noreferrer" className="string">"{showURL}"</a>;
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
          <span className="parameterName">subreddit</span>=
          <a href={"/" + subreddit_name_prefixed} className="parameter_string">"{subreddit}"</a>
          ) {"{"}
        </Line>
        <div className="postBody">
          <PostInformation>
            <Line>
              <span className="const">const</span>
              <span className="varName">full_title</span>=
                <span className="string">"{title}"</span>;
            </Line>
            <Line>
              <span className="const">const</span>
              <span className="varName">author</span>=
              <span className="string">"<span className="submitter">{author}</span>"</span>;
            </Line>
            <Line>
              <span className="const">const</span>
              <span className="varName">post_age</span>=
              <span className="string">"{postAge}"</span>;
            </Line>
            {all_awardings.length > 0
              ? <Line>
                  <span className="const">const</span>
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
          </PostInformation>
        </div>
      </Indentation>
      <Line>{"}"}</Line>
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
            <Line>
              <span className="codeComment">{"//  Rendering comments below"}</span>
            </Line>
            {pageList.map(page =>
              <Page key={page.pageID}>
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