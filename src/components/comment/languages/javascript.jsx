import React, { useContext } from 'react';
import ReactMarkdown from 'react-markdown';
// ---------- JS Utilities ----------
import { getTimeDifferenceString } from '../../../utils/time';
// ---------- Components ----------
import Comment from '../index';
// ---------- Theme ----------
import { ThemeContext } from '../../../themes';
// ---------- Styled Components ----------
import { Line, Indentation } from '../../../styled-components';
import { Keyword, KeywordListItem, KarmaScore, Submitter } from '../../../styled-components/keywords';
import { CodeComment, MarkdownText, CommentToggle } from '../../../styled-components/comment';

const JavaScriptComment = (props) => {
  const { data, replyList, collapsed, isChild, hideShowComment } = props;
  const { theme } = useContext(ThemeContext);
  const { string } = theme.values;
  const { comment, score: {ups, downs} } = theme.general;
  const { constWord, variableName, codeObject: {topLevel, child} } = theme.languages.javascript;
  const { all_awardings, body, score, is_submitter, author, created_utc } = data;
  const commentAge = getTimeDifferenceString(created_utc);
  let authorName ;
  // Change object closing whether or not we're a child comment
  let closingLineText = isChild ? '},' : '};';
  //  Change presentation whether or not we're the submitter of the post 
  if (is_submitter) {
    // Comment belongs to user who made the post, mark name to identify
    authorName = <Keyword color={string}>"<Submitter>{author}</Submitter>"</Keyword>
  } else {
    authorName = <Keyword color={string}>"{author}"</Keyword>
  }

  return (
    <React.Fragment>
      <Line>
        <CommentToggle onClick={() => { hideShowComment() }}>
          {collapsed ? "[+]" : "[-]"}
        </CommentToggle>
        {!isChild
          ? <Keyword color={constWord} rightSpace={true}>const</Keyword>
          : null
        }
        <Keyword color={isChild ? child : topLevel}>
          {isChild ? 'responseComment' : 'comment'}
        </Keyword>
        {isChild ? `: {` : ` = {`}
      </Line>
      <Indentation depth={1}>
        <Line>
          <Keyword color={variableName} leftSpace={true}>author</Keyword>: {authorName},
          </Line>
        <Line>
          <Keyword color={variableName} leftSpace={true}>score</Keyword>: <KarmaScore ups={ups} downs={downs} score={score}>{score}</KarmaScore>,
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
          <Keyword color={variableName} leftSpace={true}>commentAge</Keyword>: <Keyword color={string}>"{commentAge}"</Keyword>,
          </Line>
        {collapsed
          ? null
          : <React.Fragment>
            <Line>
              <CodeComment color={comment}>
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