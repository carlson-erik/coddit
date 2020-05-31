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
import { Keyword, KeywordListItem, Submitter, KarmaScore } from '../../../styled-components/keywords';
import { CodeComment, MarkdownText, CommentToggle } from '../../../styled-components/comment';

const CSharpComment = (props) => {
  const { data, replyList, collapsed, isChild, hideShowComment } = props;
  const { theme } = useContext(ThemeContext);
  const { string } = theme.values;
  const { comment, score: {ups, downs} } = theme.general;
  const { variableName, variableWord, newWord, codeObject: {topLevel, child} } = theme.languages.csharp;
  const { all_awardings, body, score, is_submitter, author, created_utc } = data;
  const commentAge = getTimeDifferenceString(created_utc);
  let authorName;

  //  Change presentation based on whether or not we're the submitter of the post 
  if (is_submitter) {
    // Comment belongs to user who made the post, mark name to identify
    authorName = <Keyword color={string}>"<Submitter>{author}</Submitter>"</Keyword>
  } else {
    authorName = <Keyword color={string}>"{author}"</Keyword>
  }

  return (
    <React.Fragment>
      <Line>
        <CommentToggle onClick={() => {hideShowComment()}}>
          {collapsed ? "[+]" : "[-]"}
        </CommentToggle>
        {!isChild
          ? <Keyword color={variableWord} rightSpace={true}>var</Keyword>
          : null
        }
        <Keyword color={isChild ? child : topLevel} rightSpace={true}>
          {isChild ? 'childComment' : 'comment'}
        </Keyword>{'='} 
        <Keyword color={newWord} leftSpace={true} rightSpace={true}>new</Keyword>{"{"}
      </Line>
      <Indentation depth={1}>
        <Line>
          <Keyword color={variableName} rightSpace={true}>author</Keyword>= {authorName},
        </Line>
        <Line>
          <Keyword color={variableName} rightSpace={true}>score</Keyword>=
          <KarmaScore 
            leftSpace={true}
            ups={ups}
            downs={downs}
            score={score}
          >
            {score}
          </KarmaScore>,
        </Line>
        <Line>
          <Keyword color={variableName} rightSpace={true}>commentAge</Keyword>= <Keyword color={string}>"{commentAge}"</Keyword>,
        </Line>
        {all_awardings.length > 0
          ? <Line>
              <Keyword rightSpace={true}>gildings</Keyword> = [
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
            <div key={child.id}>
              {child.body
                ? <Indentation depth={1}>
                  <Comment {...props} data={child} isChild={true} />
                </Indentation>
                : null
              }
            </div>
          )}
        </React.Fragment>
      }
      </Indentation>
      <Line>
        {isChild ? "},": '};'}
      </Line>
    </React.Fragment>
  );
};

export default CSharpComment;