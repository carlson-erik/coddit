import React from "react";
import Dropdown from 'react-dropdown';
// ---------- Components ----------
import Preview from '../../../../components/preview';
import Checkbox from '../../../../components/checkbox';
import LoadingButton from "../../../../components/loading_button";
// ---------- JS Utilities ----------
import { getTimeDifferenceString } from "../../../../utils/time";
import { isImageLink } from "../../../../utils/image";
import { sortValues, itemLimitValues, linksFromDisplayNames, linksFromMap } from '../../../../utils/constants';

const PythonHeader = (props) => {
  const { dropdownFunctions, settings, sort, subreddit } = props;
  const { showAllPreviews, itemLimit, } = settings;
  const { method, timeFrame } = sort;
  const { onChangeShowPreviews, onChangeSortBy, onChangeTimeFrame, onChangePostCount } = dropdownFunctions;
  return (
    <div className="redditSettings">
      <div className="line">
        curr_subreddit =
        <a href={"/r/" + subreddit} className="string">"{subreddit}"</a>
      </div>
      <div className="line">
        show_all_previews =
                <Checkbox
          checked={showAllPreviews}
          onChange={onChangeShowPreviews}
        />
      </div>
      <div className="line">
        <span className="codeComment"># Reddit Settings</span>
      </div>
      <div className="line">
        sort_by =
                <Dropdown
          options={sortValues}
          onChange={onChangeSortBy}
          placeholder={"\"" + method + "\""}
        />
      </div>
      {method === "controversial" || method === "top"
        ? <div className="line">
          links_from =
                        <Dropdown
            options={linksFromDisplayNames}
            onChange={onChangeTimeFrame}
            placeholder={"\"" + linksFromMap[timeFrame] + "\""}
          />
        </div>
        : null
      }
      <div className="line">
        post_count =
                <Dropdown
          options={itemLimitValues}
          onChange={onChangePostCount}
          placeholder={"\"" + itemLimit + "\""}
        />
      </div>
    </div>
  );
}

const PythonPageList = (props) => {
  const { pageList, itemLimit, isLoading, showAllPreviews, fetchNextPage } = props;
  return (
    <>
      {pageList.map(page =>
        <Page key={page.pageID} page={page} showAllPreviews={showAllPreviews} />
      )}
      <LoadingButton loadFunc={() => fetchNextPage()} isLoading={isLoading} itemLimit={itemLimit} />
    </>
  );
}

const Page = (props) => {
  const { page, showAllPreviews } = props;
  return (
    <div className="page">
      {page.itemList.map(post =>
        <Post key={post.id} post={post} showAllPreviews={showAllPreviews} />
      )}
      <div className="line">
        <span className="codeComment"># ------------ END OF PAGE {page.pageNumber} ------------</span>
      </div>
    </div>
  );
};

const Post = (props) => {
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
    <div className="post">
      <div className="postDeclaration" >
        <div className="line">
          <span className="keyword">def</span>
          <a href={permalink} className="function">{shortTitleArray[shortTitleArray.length - 2]}</a>(<span className="parameter_name">score</span>=<span
            className="parameter">{ups}</span>, <span className="parameter_name">sub</span>=<a href={"/" + subreddit_name_prefixed} className="parameter_string">"{subreddit}"</a><span
              className="symbol">):</span>
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
        <div className="postCommentsLink">
          <div className="line">
            <span className="codeComment"># Load comments in current tab</span>
          </div>
          <div className="line">
            <a href={permalink} className="functionCall">loadComments({num_comments})</a>
          </div>
        </div>
        <div className="line"></div>
      </div>
    </div>
  );
};

export { PythonPageList, PythonHeader };