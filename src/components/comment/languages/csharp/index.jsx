import React from 'react';
import ReactMarkdown from 'react-markdown';
// ---------- JS Utilities ----------
import { getTimeDifferenceString } from '../../../../utils/time';
// ---------- Components ----------
import Comment from '../../index';

const CSharpComment = (props) => {
  const { data, replyList, collapsed, isChild, hideShowComment } = props;
  const { all_awardings, body, score, is_submitter, author, created_utc } = data;
  const scoreStyles = score > 0 ? "positiveScore" : "negativeScore";
  const commentAge = getTimeDifferenceString(created_utc);
  let authorName, commentType, closingLineStyles, commentTypeStyle, closingLineText;

  //  Change presentation based on whether or not we're the submitter of the post 
  if (is_submitter) {
    // Comment belongs to user who made the post, mark name to identify
    authorName = <span className="string">"<span className="submitter">{author}</span>"</span>
  } else {
    authorName = <span className="string">"{author}"</span>
  }

  // Change presentation based on whether or not we're a child comment
  if (isChild) {
    // set comment object name
    commentType = 'childComment';
    commentTypeStyle = 'commentType';
    // set the closing line styles
    closingLineText = "},";
    closingLineStyles = 'line';
  } else {
    // set comment object name
    commentType = 'comment';
    commentTypeStyle = `commentType initialComment`;
    // set the closing line styles
    closingLineText = "};";
    closingLineStyles = `line closingLine`;
  }

  return (
    <React.Fragment>
      <div className="comment">
        <div className={`line toggleLine`}>
          <div onClick={() => { hideShowComment() }} className="commentToggle">
            {collapsed ? "[+]" : "[-]"}
          </div>
          {!isChild
            ? <span className="commentVar">var</span>
            : null
          }
          <span className={commentTypeStyle}>{commentType}</span> = <span className="commentNew">new</span> {"{"}
        </div>
        <div className="commentHeader">
          <div className='line'>
            <span className="commentVarName">author</span>= {authorName},
          </div>
          <div className='line'>
            <span className="commentVarName">score</span>= <span className={scoreStyles}>{score}</span>,
          </div>
          <div className='line'>
            <span className="commentVarName">commentAge</span>= <span className='string'>"{commentAge}"</span>,
          </div>
          {all_awardings.length > 0
            ? <div className='line'>
                <span className="commentVarName">gildings</span> = [
                                  <span className="awardings">
                  {all_awardings.map((award, index) =>
                    <span className={`${award.name.toLowerCase()}-award`} key={award.name}>
                      {`${award.count}${award.name.substring(0, 1).toLowerCase()}${index === all_awardings.length - 1 ? '' : ','}`}
                    </span>
                  )}
                </span>
                ],
              </div>
            : null
          }
        </div>
        {collapsed
          ? null
          : <React.Fragment>
              <div className="line">
                <ul className="codeComment">
                  <li className="commentLine">{"/*"}</li>
                  <li className="commentLine">
                    <div className={`markdownText commentBody`}>
                      <ReactMarkdown source={body} />
                    </div>
                  </li>
                  <li className="commentLine">{"*/"}</li>
                </ul>
              </div>
              {replyList.map(child =>
                <div key={child.id}>
                  {child.body
                    ? <Comment {...props} data={child} isChild={true} />
                    : null
                  }
                </div>
              )}
            </React.Fragment>
        }
      </div>
      <div className={closingLineStyles}>
        {closingLineText}
      </div>
    </React.Fragment>
  );
}

export default CSharpComment;