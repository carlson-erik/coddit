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

const StringListItem = styled.li`
  color: green;
  & a {
    color: green;
  }
`;

const Submitter = styled(Keyword)`
  color: red;
`;

const PythonComment = (props) => {
  const { data, replyList, collapsed, hideShowComment } = props;
  const { all_awardings, body, score, is_submitter, author, created_utc } = data;
  // const scoreStyles = score > 0 ? "positiveScore" : "negativeScore";
  const commentAge = getTimeDifferenceString(created_utc);
  let authorName;
  if (is_submitter) {
    // Comment belongs to user who made the post, mark name to identify
    authorName = <String>"<Submitter>{author}</Submitter>"</String>
  } else {
    authorName = <String>"{author}"</String>
  }
  authorName = (
    <StringLink leftSpace={true} href={`/user/${author.toLowerCase()}`}>
      {authorName}
    </StringLink>
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
        <String leftSpace={true}>"{commentAge}"</String>,
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
                <StringListItem>
                  '''
                </StringListItem>
                <StringListItem>
                  <MarkdownText>
                    <ReactMarkdown source={body} />
                  </MarkdownText>
                </StringListItem>
                <StringListItem>
                  '''
                </StringListItem>
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