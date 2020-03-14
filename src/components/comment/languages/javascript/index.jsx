import React from 'react';
import ReactMarkdown from 'react-markdown';
// ---------- JS Utilities ----------
import { getTimeDifferenceString } from '../../../../utils/time';
// ---------- Components ----------
import Comment from '../../index';
// ---------- Styled Components ----------
import Line from '../../../../styled-components/line';
import Indentation from '../../../../styled-components/indentation';
import CodeComment from '../../../../styled-components/comment/code-comment';
import MarkdownText from '../../../../styled-components/comment/markdown-text';
import CommentToggle from '../../../../styled-components/comment/comment-toggle';

export default function JavaScriptComment(props) {
  const { data, replyList, collapsed, isChild, hideShowComment } = props;
  const { all_awardings, body, score, is_submitter, author, created_utc } = data;
  const scoreStyles = score > 0 ? "positiveScore" : "negativeScore";
  const commentAge = getTimeDifferenceString(created_utc);
  let authorName, commentType, commentTypeStyle, commentAssignmentText, closingLineText, closingLineStyles;

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
    commentType = 'responseComment';
    commentAssignmentText = ': ';
    commentTypeStyle = 'commentType';
    // set the closing line styles
    closingLineText = '},';
    closingLineStyles = 'line';
  } else {
    // set comment object name
    commentType = 'comment';
    commentAssignmentText = '= ';
    commentTypeStyle = 'commentType initialComment';
    // set the closing line styles
    closingLineText = '};';
    closingLineStyles = 'line closingLine';
  }

  return (
    <React.Fragment>
        <Line>
          <CommentToggle onClick={() => {hideShowComment()}}>
            {collapsed ? "[+]" : "[-]"}
          </CommentToggle>
          {!isChild
            ? <span className="commentConst">const</span>
            : null
          }
          <span className={commentTypeStyle}>{commentType}</span> {commentAssignmentText} {"{"}
        </Line>
        <div className="commentHeader">
          <Line>
            <span className="commentVarName">author</span>: {authorName},
          </Line>
          <Line>
            <span className="commentVarName">score</span>: <span className={scoreStyles}>{score}</span>,
          </Line>
          {all_awardings.length > 0
            ? <Line>
                <span className="commentVarName">gildings</span>: [
                  <span className="awardings">
                    {all_awardings.map((award, index) =>
                      <span className={`${award.name.toLowerCase()}-award`} key={award.name}>
                        {`${award.count}${award.name.substring(0, 1).toLowerCase()}${index === all_awardings.length - 1 ? '' : ','}`}
                      </span>
                    )}
                </span>
                ],
              </Line>
            : null
          }
          <Line>
            <span className="commentVarName">commentAge</span>: <span className='string'>"{commentAge}"</span>,
          </Line>
        </div>
        {collapsed
          ? null
          : <React.Fragment>
              <Line>
                <CodeComment>
                  <li className="commentLine">{"/*"}</li>
                  <li className="commentLine">
                    <MarkdownText>
                      <ReactMarkdown source={body} />
                    </MarkdownText>
                  </li>
                  <li className="commentLine">{"*/"}</li>
                </CodeComment>
              </Line>
              {replyList.map(child =>
                <Indentation key={child.id} depth={1}>
                  {child.body
                    ? <Comment {...props} data={child} isChild={true} />
                    : null
                  }
                </Indentation>
              )}
            </React.Fragment>
        }
      <div className={closingLineStyles}>
        {closingLineText}
      </div>
    </React.Fragment>
  );
};