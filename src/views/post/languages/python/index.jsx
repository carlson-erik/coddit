import React from 'react';
import styled from 'styled-components'
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
import Keyword from '../../../../styled-components/keyword';
import KeywordLink from '../../../../styled-components/keyword-link';
import Line from '../../../../styled-components/line';
import Page from '../../../../styled-components/page';
import Indentation from '../../../../styled-components/indentation';
import PostInformation from '../../../../styled-components/post/post-information';

const String = styled(Keyword)`
  color: green;
`;

const StringLink = styled(KeywordLink)`
  color: green;
`;

function Configuration ({ subreddit, sort, sortChange }) {
  const { method } = sort;
  return (
    <Indentation depth={1}>
      <Line>
        curr_subreddit =
        <StringLink href={"/r/" + subreddit} leftSpace={true} >"{subreddit}"</StringLink>
      </Line>
      <Line>
        <span className="codeComment"># Reddit Settings</span>
      </Line>
      <Line>
        sort_by =
        <String leftSpace={true}>
          <Dropdown
            options={commentSortDisplayNames}
            onChange={(option) => sortChange(option)}
            placeholder={"\"" + method + "\""}
          />
        </String>
      </Line>
    </Indentation>
  );
};

function Header({ postHeaderData: data }) {
  const { all_awardings, url, title, author, num_comments, selftext, created_utc, permalink, subreddit_name_prefixed, score, subreddit, is_self } = data;
  const showURL = url.length > 40 ? url.substring(0, 40) + "..." : url;
  const postAge = getTimeDifferenceString(created_utc);
  const shortTitleArray = permalink.split("/");
  const shortTitle = shortTitleArray[shortTitleArray.length - 2];
  const subredditLink = "/" + subreddit_name_prefixed;
  let postContent;
  if (isImageLink(url)) {
    // post is an image
    postContent = (
      <Line>
        image_link =
        <StringLink href={url} target="_blank" rel="noopener noreferrer" leftSpace={true}>"{showURL}"</StringLink>
        <String>
          <Preview url={url} title={title} showAllPreviews={true} isImage={true} hideIcon={true} useSemicolon={false} />
        </String>
      </Line>
    );
  } else if (is_self) {
    // show selftext if there is text to show
    if (selftext !== '') {
      postContent = (
        <Line>
          self_text =
          <String>
            <Preview url={url} title={title} showAllPreviews={true} isImage={false} hideIcon={true} useSemicolon={false} markdownText={`"${selftext}"`} />
          </String>
        </Line>
      )
    }
  } else {
    // show link
    postContent = (
      <Line>
        post_link =
        <StringLink href={url} target="_blank" rel="noopener noreferrer" leftSpace={true}>"{showURL}"</StringLink>
      </Line>
    );
  }

  return (
    <React.Fragment>
      <Line>
        <Keyword rightSpace={true}>def</Keyword>
        <a href={url} target="_blank" rel="noopener noreferrer" className="function">{shortTitle}</a>
        (score=<span className="parameter">{score}</span>,
        sub=<StringLink href={subredditLink}>"{subreddit}"</StringLink><span className="symbol">):</span>
      </Line>
      <Indentation depth={1}>
        <PostInformation>
          <Line>
            full_title =
						<String leftSpace={true}>"{title}"</String>
          </Line>
          <Line>
            author =
						<StringLink href={`/user/${author.toLowerCase()}`} leftSpace={true}>"{author}"</StringLink>
          </Line>
          <Line>
            post_age =
						<String leftSpace={true}>"{postAge}"</String>
          </Line>
          {all_awardings.length > 0
            ? <Line>
                gildings =
                <Keyword leftSpace={true}>
                  [
                  {all_awardings.map((award, index) =>
                    <span className={`${award.name.toLowerCase()}-award`} key={award.name}>
                      {`${award.count}${award.name.substring(0, 1).toLowerCase()}${index === all_awardings.length - 1 ? '' : ','}`}
                    </span>
                  )}
                  ]
                </Keyword>
              </Line>
            : null
          }
          {postContent}
        </PostInformation>
      </Indentation>
      <Indentation depth={1}>
        <Line>
          <span className="codeComment"># Rendering comments below</span>
        </Line>
        <Line>
          <Keyword rightSpace={true}>for</Keyword>
          comment
					<Keyword rightSpace={true} leftSpace={true}>in</Keyword>
          <span className="range">range</span>(<span className="parameter">0</span>, {num_comments}):
				</Line>
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
              {pageList.map(page =>
                <Page key={page.pageID} depth={2}>
                  {page.itemList.map(comment =>
                    <div key={comment.id}>
                      <Comment data={comment} progLang="python" />
                    </div>
                  )}
                </Page>
              )}
            </Indentation>
          : <div>... loading ...</div>
        }
    </React.Fragment>
  );
}