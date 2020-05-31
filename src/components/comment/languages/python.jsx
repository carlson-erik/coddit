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
import { Keyword, KeywordLink, KeywordListItem, Submitter } from '../../../styled-components/keywords';
import { CodeComment, MarkdownText, CommentToggle } from '../../../styled-components/comment';

const PythonComment = (props) => {
  const { data, replyList, collapsed, hideShowComment } = props;
  const { theme } = useContext(ThemeContext);
  const { string, integer } = theme.values;
  const { all_awardings, body, score, is_submitter, author, created_utc } = data;
  const commentAge = getTimeDifferenceString(created_utc);
  return (
    <React.Fragment>
      <Line>
        <CommentToggle onClick={() => { hideShowComment() }}>
          {collapsed ? "[+]" : "[-]"}
        </CommentToggle>
        author, score, age, gildings =
        <KeywordLink color={string} leftSpace={true} href={`/user/${author.toLowerCase()}`}>
          {is_submitter
            ? <Keyword>"<Submitter>{author}</Submitter>"</Keyword>
            : <Keyword>"{author}"</Keyword>
          }
          {','}
        </KeywordLink>
        <Keyword color={integer} leftSpace={true}>{score}</Keyword>,
        <Keyword color={string} leftSpace={true}>"{commentAge}"</Keyword>,
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
              <CodeComment color={string}>
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