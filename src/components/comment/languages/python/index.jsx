import React from 'react';
import ReactMarkdown from 'react-markdown';
// ---------- JS Utilities ----------
import { getTimeDifferenceString } from '../../../../utils/time';
// ---------- Components ----------
import Comment from '../../index';
// ---------- Styled Components ----------
import { Line, Indentation } from '../../../../styled-components';
import { Keyword, KeywordLink, KeywordListItem, Submitter } from '../../../../styled-components/keywords';
import { CodeComment, MarkdownText, CommentToggle } from '../../../../styled-components/comment';

const PythonComment = (props) => {
  const { data, replyList, collapsed, hideShowComment } = props;
  const { all_awardings, body, score, is_submitter, author, created_utc } = data;
  // const scoreStyles = score > 0 ? "positiveScore" : "negativeScore";
  const commentAge = getTimeDifferenceString(created_utc);
  let authorName;
  if (is_submitter) {
    // Comment belongs to user who made the post, mark name to identify
    authorName = <Keyword>"<Submitter>{author}</Submitter>"</Keyword>
  } else {
    authorName = <Keyword>"{author}"</Keyword>
  }
  authorName = (
    <KeywordLink leftSpace={true} href={`/user/${author.toLowerCase()}`}>
      {authorName}
    </KeywordLink>
  )
  return (
    <React.Fragment>
      <Line>
        <CommentToggle onClick={() => { hideShowComment() }}>
          {collapsed ? "[+]" : "[-]"}
        </CommentToggle>
        author, score, age, gildings =
        {authorName},
        <Keyword leftSpace={true}>{score}</Keyword>,
        <Keyword leftSpace={true}>"{commentAge}"</Keyword>,
        {all_awardings.length > 0
          ? <Keyword leftSpace={true}>
              [{all_awardings.map((award, index) =>
                <span className={`${award.name.toLowerCase()}-award`} key={award.name}>
                  {`${award.count}${award.name.substring(0, 1).toLowerCase()}${index === all_awardings.length - 1 ? '' : ','}`}
                </span>
              )}],
            </Keyword>
          : '  []'
        }
      </Line>
      {collapsed
        ? null
        : <React.Fragment>
            <Line>
              <CodeComment>
                <KeywordListItem>
                  '''
                </KeywordListItem>
                <KeywordListItem>
                  <MarkdownText>
                    <ReactMarkdown source={body} />
                  </MarkdownText>
                </KeywordListItem>
                <KeywordListItem>
                  '''
                </KeywordListItem>
              </CodeComment>
            </Line>
            {replyList.map(child =>
              <div key={child.id}>
                {child.body
                  ? <Indentation key={child.id} depth={1}>
                      <Comment {...props} data={child} isChild={true}/>
                    </Indentation>
                  : null
                }
              </div>
            )}
          </React.Fragment>
      }
    </React.Fragment>
  );
};

export default PythonComment;