import React from "react";
import Dropdown from 'react-dropdown';
import Comment from '../../../../components/comment';
import Preview from '../../../../components/preview';
// ---------- js utilities ----------
import { isImageLink } from '../../../../utils/image';
import { getTimeDifferenceString } from "../../../../utils/time";
import { commentSortDisplayNames } from '../../../../utils/constants';
import { getSubreddit } from "../../../../utils/route-params";

const PythonPostHeader = ({ subreddit, sort, sortChange }) => {
  const { method } = sort;
  return (
    <div className="redditSettings">
      <div className="line">
        curr_subreddit =
        <a href={"/r/" + subreddit} className="string">"{subreddit}"</a>
      </div>
      <div className="line">
        <span className="codeComment"># Reddit Settings</span>
      </div>
      <div className="line">
        sort_by =
                <Dropdown
          options={commentSortDisplayNames}
          onChange={(option) => sortChange(option)}
          placeholder={"\"" + method + "\""}
        />
      </div>
    </div>
  );
};


const PostInformation = ({ postHeaderData }) => {
  const { all_awardings, url, title, author, num_comments, selftext, created_utc, permalink, subreddit_name_prefixed, score, subreddit, is_self } = postHeaderData;
  const showURL = url.length > 40 ? url.substring(0, 40) + "..." : url;
  const postAge = getTimeDifferenceString(created_utc);
  const shortTitleArray = permalink.split("/");
  const shortTitle = shortTitleArray[shortTitleArray.length - 2];
  const subredditLink = "/" + subreddit_name_prefixed;

  let postContent;
  if (isImageLink(url)) {
    // post is an image
    postContent = (
      <div className="line">
        image_link =
                <a href={url} target="_blank" rel="noopener noreferrer" className="string">"{showURL}"</a>
        <span className="string" >
          <Preview url={url} title={title} showAllPreviews={true} isImage={true} hideIcon={true} ZZZuseSemicolon={false} />
        </span>
      </div>
    );
  } else if (is_self) {
    // show selftext if there is text to show
    if (selftext !== '') {
      postContent = (
        <div className="line selfTextLine">
          <div className="declarationLine">
            self_text =
                    </div>
          <div className="string preview_string" >
            <Preview url={url} title={title} showAllPreviews={true} isImage={false} hideIcon={true} useSemicolon={false} markdownText={`"${selftext}"`} />
          </div>
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
    <>
      <div className="codeDeclaration">
        <div className="line">
          <span className="keyword">def</span>
          <a href={url} target="_blank" rel="noopener noreferrer" className="function">{shortTitle}</a>
          (score=<span className="parameter">{score}</span>,
                    sub=<a href={subredditLink} className="parameter_string">"{subreddit}"</a><span className="symbol">):</span>
        </div>
      </div>

      <div className="postBody">
        <div className="postInformation">
          <div className="line">
            full_title =
						<span className="string">"{title}"</span>
          </div>
          <div className='line'>
            author =
						<a href={`/user/${author.toLowerCase()}`} className="string">"{author}"</a>
          </div>
          <div className="line">
            post_age =
						<span className="string">"{postAge}"</span>
          </div>
          {all_awardings.length > 0
            ? <div className='line'>
              gildings = [
                                <span className="awardings">
                {all_awardings.map((award, index) =>
                  <span className={`${award.name.toLowerCase()}-award`} key={award.name}>
                    {`${award.count}${award.name.substring(0, 1).toLowerCase()}${index === all_awardings.length - 1 ? '' : ','}`}
                  </span>
                )}
              </span>
              ]
                            </div>
            : null
          }
          {postContent}
        </div>
      </div>
      <div className="commentHeader">
        <div className="line">
          <span className="codeComment"># Rendering comments below</span>
        </div>
        <div className="line">
          <span className="keyword">for</span>
          comment
					<span className="keyword">in</span>
          <span className="range">range</span>(<span className="parameter">0</span>, {num_comments}):
				</div>
      </div>

    </>
  );
}

const CommentPage = ({ commentList }) => {
  return (
    <div className="commentPage">
      {commentList.map(comment =>
        <div key={comment.id}>
          <Comment data={comment} progLang="python" />
        </div>
      )}
    </div>
  );
}

const PythonPostView = (props) => {
  const { isLoading, data, sort, sortChange, match } = props;
  const { headerData, pageList } = data;
  const subreddit = getSubreddit(match, sort);
  const postHeaderData = headerData && headerData.data;
  return (
    <React.Fragment>
      <PythonPostHeader subreddit={subreddit} sort={sort} sortChange={sortChange} />
      <div className="page">
        <div className="codeBlock">
          {(headerData && (pageList && pageList.length !== 0)) && !isLoading
            ? <div className="commentBody">
                <PostInformation postHeaderData={postHeaderData} />
                {pageList.map(page =>
                  <CommentPage key={page.pageID} commentList={page.itemList} />
                )}
              </div>
            : <div>... loading ...</div>
          }
        </div>
      </div>
    </React.Fragment>
  );
}

export default PythonPostView;