import React from 'react';
import ReactMarkdown from 'react-markdown';
// ---------- JS Utilities ----------
import { getTimeDifferenceString } from '../../../../utils/time';
// ---------- Components ----------
import Comment from '../../index';
// ---------- Styled Components ----------
import { Line, Indentation } from '../../../../styled-components';
import { Keyword, KeywordListItem, KarmaScore, Submitter } from '../../../../styled-components/keywords';
import { CodeComment, MarkdownText, CommentToggle } from '../../../../styled-components/comment';

const JavaScriptComment = (props) => {
  const { data, replyList, collapsed, isChild, hideShowComment } = props;
  const { all_awardings, body, score, is_submitter, author, created_utc } = data;
  const commentAge = getTimeDifferenceString(created_utc);
  let authorName, commentType, commentAssignmentText, closingLineText;

  //  Change presentation based on whether or not we're the submitter of the post 
  if (is_submitter) {
    // Comment belongs to user who made the post, mark name to identify
    authorName = <Keyword>"<Submitter>{author}</Submitter>"</Keyword>
  } else {
    authorName = <Keyword>"{author}"</Keyword>
  }

  // Change presentation based on whether or not we're a child comment
  if (isChild) {
    commentType = 'responseComment';
    commentAssignmentText = ': ';
    closingLineText = '},';
  } else {
    commentType = 'comment';
    commentAssignmentText = '= ';
    closingLineText = '};';
  }

  return (
    <React.Fragment>
      <Line>
        <CommentToggle onClick={() => { hideShowComment() }}>
          {collapsed ? "[+]" : "[-]"}
        </CommentToggle>
        {!isChild
          ? <Keyword rightSpace={true}>const</Keyword>
          : null
        }
        {`${commentType} ${commentAssignmentText} {`}
      </Line>
      <Indentation depth={1}>
        <Line>
          <Keyword leftSpace={true}>author</Keyword>: {authorName},
          </Line>
        <Line>
          <Keyword leftSpace={true}>score</Keyword>: <KarmaScore score={score - 10}>{score}</KarmaScore>,
          </Line>
        {all_awardings.length > 0
          ? <Line>
            <Keyword leftSpace={true}>gildings</Keyword>: [
              {all_awardings.map((award, index) =>
                <span className={`${award.name.toLowerCase()}-award`} key={award.name}>
                  {`${award.count}${award.name.substring(0, 1).toLowerCase()}${index === all_awardings.length - 1 ? '' : ','}`}
                </span>
              )}
              ],
              </Line>
          : null
        }
        <Line>
          <Keyword leftSpace={true}>commentAge</Keyword>: <Keyword>"{commentAge}"</Keyword>,
          </Line>
        {collapsed
          ? null
          : <React.Fragment>
            <Line>
              <CodeComment>
                <KeywordListItem>{"/*"}</KeywordListItem>
                <KeywordListItem>
                  <MarkdownText>
                    <ReactMarkdown source={body} />
                  </MarkdownText>
                </KeywordListItem>
                <KeywordListItem>{"*/"}</KeywordListItem>
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
      </Indentation>
      <Line>
        {closingLineText}
      </Line>
    </React.Fragment>
  );
};

export default JavaScriptComment;