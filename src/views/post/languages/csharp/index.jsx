import React from "react";
import classNames from 'classnames';
import Dropdown from 'react-dropdown';
import Comment from "../../../../components/comment";
import Preview from '../../../../components/preview';
// ---------- JS Utilities ----------
import { isImageLink } from '../../../../utils/image';
import { getTimeDifferenceString } from '../../../../utils/time';
import { getSubreddit } from "../../../../utils/route-params";
import { commentSortDisplayNames } from '../../../../utils/constants';

const CSharpPostHeader = ({ subreddit, sort, sortChange }) => {
    const {method} = sort;
    return(
        <React.Fragment>
            <div className="redditSettings">
                <div className="line">
                    <span className="using">using</span>CurrentSubreddit.
                    <a href={"/r/" + subreddit} className={classNames("string", "cancelMargin")}>{subreddit}</a>;
                </div>
                <div className="line">
                    <span className="codeComment">{"// Reddit Settings"}</span>
                </div>
                <div className="line">
                    <span className="using">using</span>SortBy. 
                    <Dropdown 
                        options={commentSortDisplayNames} 
                        onChange={sortChange} 
                        placeholder={method + ";"} 
                    />
                </div>
            </div>
            <div className="line"></div>
            <div className="csharp_namespace">
                <span className="namespace">namespace</span> 
                <span className="class_name">Coddit</span>
                {"{"}
            </div>
            <div className="line"></div>
        </React.Fragment>
    );
}

const PostInformation =  ({postHeaderData}) =>{
    const { all_awardings, url, title, author, created_utc, permalink, selftext, subreddit_name_prefixed, score, subreddit, is_self} = postHeaderData;
	const showURL = url.length > 40 ? url.substring(0, 40) + "..." : url;
    const postAge = getTimeDifferenceString(created_utc);
    const shortTitleArray = permalink.split("/");

    let postContent;
    if(isImageLink(url)){
        // post is an image
        postContent = (
            <div className="line">
                <span className="var">var</span>
                <span className="varName">image_link</span>=
                <a href={url} target="_blank" rel="noopener noreferrer" className="string">"{showURL}"</a>;
                <span className="string" >
                    <Preview url={url} title={title} showAllPreviews={true} useSemicolon={true} isImage={true} hideIcon={true}/>
                </span>
            </div>
        );
    } else if(is_self){
        // show selftext if there is text to show
        if(selftext !== '') {
            postContent = (
                <div className="line selfTextLine">
                    <div className="declarationLine">
                        <span className="var">var</span>
                        <span className="varName">self_text</span>= 
                    </div>
                    <span className="string preview_string" >
                        <Preview url={url} title={title} showAllPreviews={true} useSemicolon={true} isImage={false} hideIcon={true} markdownText={`"${selftext}";`}/>
                    </span>
                </div>
            )
        }
    } else {
        // show link
        postContent = (
            <div className="line">
                <span className="var">var</span>
                <span className="varName">post_link</span>=
                <a href={url} target="_blank" rel="noopener noreferrer" className="string">"{showURL}"</a>;
            </div>
        );
    }
	return (
        <React.Fragment>
            <div className="post">
                <div className="postDeclaration" >
                    <div className="line">
                        <span className="public">public</span> 
                        <a href={permalink} className="function">{shortTitleArray[shortTitleArray.length - 2]}</a>
                        (
                        <span className="default_type">int</span>
                        <span className="parameterName">score</span>=
                        <span className="parameter">{score}</span>,
                        <span className={classNames("default_type", "notFirst")}>string</span>
                        <span className="parameterName">subreddit</span>=
                        <a href={"/" + subreddit_name_prefixed} className="parameter_string">"{subreddit}"</a>
                        ) {"{"}
                    </div>
                </div>
                <div className="postBody">
                    <div className="postInformation">
                        <div className="line">
                            <span className="var">var</span>
                            <span className="varName">full_title</span>= 
                            <span className="string">"{title}"</span>;
                        </div>
                        <div className='line'>
                            <span className="var">var</span>
                            <span className="varName">author</span>=
                            <span className="string">"<span className="submitter">{author}"</span></span>;
                        </div>
                        <div className="line">
                            <span className="var">var</span>
                            <span className="varName">post_age</span>=
                            <span className="string">"{postAge}"</span>;
                        </div>
                        { all_awardings.length > 0
                            ?   <div className='line'>
                                    <span className="var">var</span>
                                    <span className="varName">gildings</span>= [
                                    <span className="awardings">
                                        {all_awardings.map((award, index) => 
                                            <span className={`${award.name.toLowerCase()}-award` } key={award.name}>
                                                {`${award.count}${award.name.substring(0,1).toLowerCase()}${index === all_awardings.length -1 ? '':','}`}
                                            </span>
                                        )}
                                    </span>
                                    ];
                                </div>
                            : null
                        }
                        {postContent}
                    </div>		
                </div>
                <div className="line">{"}"}</div>
            </div>
            <div className="closingParen">{"}"}</div>
            <div className ="line"></div>   
        </React.Fragment>
    );        
}

const PostBody = (props) => {
    const { postHeaderData, pageList } = props;
    return (
        <React.Fragment>
            <div className="csharp_public_class">
                <span className="public">public</span> 
                <span className="class">class</span>  
                <span className="class_name">Post</span> 
                {"{"}
            </div>
            <div className="line"></div>
            <div className="commentBody">
                <PostInformation postHeaderData={postHeaderData}/>
                <div className="page">
                    <span className="public">public</span> 
                    <span className="class">class</span>  
                    <span className="class_name">CommentList</span> 
                    {"{"}
                    <div className ="line"></div>
                    {pageList.map(page => 
                        <CommentPage key={page.pageID} commentList={page.itemList}/>
                    )}
                    {"}"}
                </div>
            </div>
        </React.Fragment>
    );
}

const CommentPage = ({commentList}) => {
    return(
        <div className="commentPage">
            {commentList.map(comment => 
				<div key={comment.id}>
					<Comment data={comment} progLang="javascript"/>
				</div>
			)}
        </div>
    );
}


const CSharpPostView = (props) => {
    const { isLoading, data, sort, sortChange, match } = props;
    const { headerData, pageList } = data;
    const subreddit = getSubreddit(match, sort);
    const postHeaderData = headerData && headerData.data;
    return (
        <React.Fragment>
            <CSharpPostHeader subreddit={subreddit} sort={sort} sortChange={sortChange} />
            {(headerData && (pageList && pageList.length !== 0)) && !isLoading
                ? <PostBody postHeaderData={postHeaderData} pageList={pageList} isLoading={isLoading}/>
                : <div className="loadingIndicator">... loading ...</div>
            }
        </React.Fragment>
    );
}

export default CSharpPostView;