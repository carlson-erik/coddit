// ---------- js imports ----------
import React from "react";
import Dropdown from 'react-dropdown';
// ---------- component imports ----------
import Preview from '../../../../shared/preview';
import Checkbox from '../../../../shared/checkbox';
import LoadingButton from "../../../../shared/loading_button"
// ---------- utility imports ----------
import {getTimeDifferenceString} from "../../../../../utilities/time";
import {isImageLink} from "../../../../../utilities/image";
import {sortValues, postLimitValues, linksFromDisplayNames } from '../../../../utils/constants';

const CSharpHeader = (props) => {
    const { propValues, dropdownFunctions } = props;
    const { subreddit,showAllPreviews, postLimit, sortFunction, sortTimeFrame } = propValues;
    const { onChangeShowPreviews, onChangeSortBy, onChangeTimeFrame, onChangePostCount } = dropdownFunctions;
    return (
        <div className="redditSettings">
            <div className="line">
                <span className="using">using</span>CurrentSubreddit.
                <a href={"/r/" + subreddit} className="string cancelMargin">{subreddit}</a>;
            </div>
            <div className="line">
                <span className="using">using</span>ShowAllPreviews.
                <Checkbox 
                    checked={showAllPreviews}
                    onChange={onChangeShowPreviews}
                />
            </div>
            <div className="line">
                <span className="codeComment">{"// Reddit Settings"}</span>
            </div>
            <div className="line">
                <span className="using">using</span>SortBy. 
                <Dropdown 
                    options={sortValues} 
                    onChange={onChangeSortBy} 
                    placeholder={sortFunction + ";"} 
                />
            </div>
            { sortFunction === "controversial" || sortFunction === "top"
                ?   <div className="line">
                        <span className="using">using</span>LinksFromLast. 
                        <Dropdown 
                            options={linksFromDisplayNames} 
                            onChange={onChangeTimeFrame} 
                            placeholder={ sortTimeFrame + ";"} 
                        />
                    </div>
                : null
            }
            <div className="line">
                <span className="using">using</span>PostCount. 
                <Dropdown 
                    options={postLimitValues} 
                    onChange={onChangePostCount} 
                    placeholder={postLimit + ";"} 
                />
            </div>
        </div>
    );
}

const CSharpPageList = (props) => {
    const { pageList, postLimit, isLoading, showAllPreviews, fetchNextPage } = props;
    return (
        <>
            <div className="line"></div>
            <div className="csharp_namespace">
                <span className="namespace">namespace</span> 
                <span className="class_name">Coddit</span>
                {"{"}
            </div>
            <div className="line"></div>
            <div className="csharp_public_class">
                <span className="public">public</span> 
                <span className="class">class</span>  
                <span className="class_name">Subreddit</span> 
                {"{"}
            </div>
            <div className="line"></div>
            { pageList.map(page =>
                <Page key={page.pageID} page={page} showAllPreviews={showAllPreviews}/>
            )}
            <LoadingButton loadFunc={() => fetchNextPage() } isLoading={isLoading} postLimit={postLimit} />
            <div className="line"></div>
            <div className="csharp_public_class">
                {"}"}
            </div>
            <div className="line"></div>
            <div className="csharp_namespace">
                {"}"}
            </div>
        
        </>				
    );
}

const Page = (props) => {
	const {page, showAllPreviews} = props;
	return (
		<div className="page">
			{page.itemList.map(post => 
				<Post key={post.id} post={post} showAllPreviews={showAllPreviews}/>
			)}
			<div className="line">
				<span className="codeComment">{`//  ------------ END OF PAGE ${page.pageNumber} ------------`}</span>
			</div>
		</div>
	);
};

const Post = (props) => {
    const {post, showAllPreviews} = props;
	// Hide NSFW/over_18 content until toggle has been introduced
	if(post.over_18)
		return(null);
	// since the post is not over 18 (NSFW), pull needed values from the post
	const { all_awardings, url, author, title, permalink, num_comments, ups, subreddit_name_prefixed, subreddit, created_utc, is_self, selftext }  = post;
	const postAge = getTimeDifferenceString(created_utc);
	const shortTitleArray = permalink.split("/");
    const showURL = url.length > 40 ? url.substring(0, 40) + "..." : url;
    
    let postContent;
    if(isImageLink(url)){
        // post is an image
        postContent = (
            <div className="line">
                <span className="var">var</span>
                <span className="varName">image_link</span>=
                <a href={url} target="_blank" rel="noopener noreferrer" className="string">"{showURL}"</a>;
                <span className="string" >
                    <Preview url={url} title={title} showAllPreviews={showAllPreviews} useSemicolon={true} isImage={true}/>
                </span>
            </div>
        );
    } else if(is_self){
        // show selftext if there is text to show
        if(selftext !== '') {
            postContent = (
                <div className="line">
                    <span className="var">var</span>
                    <span className="varName">self_text</span>=
                    <span className="string" >
                        <Preview url={url} title={title} showAllPreviews={showAllPreviews} useSemicolon={true} isImage={false} markdownText={`"${selftext}";`}/>
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
        <div className="post">
			<div className="postDeclaration" >
                <div className="line">
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
						<span className="string">"{author}"</span>;
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
				<div className="postCommentsLink">
					<div className="line">
						<span className="codeComment">{"// Load comments in current tab"}</span>
					</div>
					<div className="line">
						<a href={permalink} className="functionCall">loadComments
                        <span className="paren">(<span className="numComments">{num_comments}</span>);</span></a>
					</div>
				</div>
			</div>
                <div className="line">
                    {"}"}
                </div>
                <div className ="line"></div>
		</div>
    )
}

export {CSharpPageList, CSharpHeader};