import React from 'react';
import styled from 'styled-components';
import ReactMarkdown from 'react-markdown';
// ---------- JS Utilities ----------
import { getTimeDifferenceString } from '../../../../utils/time';
// ---------- Components ----------
import Comment from '../../index';
// ---------- Styled Components ----------
import Keyword from '../../../../styled-components/keyword';
import KeywordLink from '../../../../styled-components/keyword-link';
import Line from '../../../../styled-components/line';
import Indentation from '../../../../styled-components/indentation';
import CodeComment from '../../../../styled-components/comment/code-comment';
import MarkdownText from '../../../../styled-components/comment/markdown-text';
import CommentToggle from '../../../../styled-components/comment/comment-toggle';

const String = styled(Keyword)`
  color: green;
`;

const StringLink = styled(KeywordLink)`
  color: green;
`;

const CommentListItem = styled.li`
  color: grey;
  & a {
    color: grey;
  }
`;

const Submitter = styled(Keyword)`
  color: red;
`;

export default function JavaScriptComment(props) {
  const { data, replyList, collapsed, isChild, hideShowComment } = props;
  const { all_awardings, body, score, is_submitter, author, created_utc } = data;
  const scoreStyles = score > 0 ? "positiveScore" : "negativeScore";
  const commentAge = getTimeDifferenceString(created_utc);
  let authorName, commentType, commentTypeStyle, commentAssignmentText, closingLineText, closingLineStyles;

  //  Change presentation based on whether or not we're the submitter of the post 
  if (is_submitter) {
    // Comment belongs to user who made the post, mark name to identify
    authorName = <String>"<Submitter>{author}</Submitter>"</String>
  } else {
    authorName = <String>"{author}"</String>
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
            ? <Keyword rightSpace={true}>const</Keyword>
            : null
          }
          <span className={commentTypeStyle}>{commentType}</span> {commentAssignmentText} {"{"}
        </Line>
        <div className="commentHeader">
          <Line>
            <Keyword leftSpace={true}>author</Keyword>: {authorName},
          </Line>
          <Line>
            <Keyword leftSpace={true}>score</Keyword>: <span className={scoreStyles}>{score}</span>,
          </Line>
          {all_awardings.length > 0
            ? <Line>
                <Keyword leftSpace={true} rightSpace={true}>gildings</Keyword>: [
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
            <Keyword leftSpace={true}>commentAge</Keyword>: <String>"{commentAge}"</String>,
          </Line>
        </div>
        {collapsed
          ? null
          : <React.Fragment>
              <Line>
                <CodeComment>
                  <CommentListItem>{"/*"}</CommentListItem>
                  <CommentListItem>
                    <MarkdownText>
                      <ReactMarkdown source={body} />
                    </MarkdownText>
                  </CommentListItem>
                  <CommentListItem>{"*/"}</CommentListItem>
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