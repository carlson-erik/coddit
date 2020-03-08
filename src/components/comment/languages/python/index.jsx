import React from 'react';
import ReactMarkdown from 'react-markdown';
// ---------- JS Utilities ----------
import { getTimeDifferenceString } from '../../../../utils/time';
// ---------- Components ----------
import Comment from '../../index';

const PythonComment = (props) => {
  const { data, replyList, collapsed, hideShowComment } = props;
  const { all_awardings, body, score, is_submitter, author, created_utc } = data;
  const scoreStyles = score > 0 ? "positiveScore" : "negativeScore";
  const commentAge = getTimeDifferenceString(created_utc);
  let authorName;
  if (is_submitter) {
    // Comment belongs to user who made the post, mark name to identify
    authorName = <span className="string">"<span className="submitter">{author}</span>"</span>
  } else {
    authorName = <span className="string">"{author}"</span>
  }
  authorName = (
    <a href={`/user/${author.toLowerCase()}`} className="string">
      {authorName}
    </a>
  )
  return (
    <div className="comment">
      <div className="line toggleLine">
        <div onClick={() => { hideShowComment() }} className="commentToggle">
          {collapsed ? "[+]" : "[-]"}
        </div>
        author, score, age, gildings =
        {authorName},
        <span className={scoreStyles}>{score}</span>,
        <span className="string">"{commentAge}"</span>,
        {all_awardings.length > 0
          ? <span className="awardings">
              [{all_awardings.map((award, index) =>
                <span className={`${award.name.toLowerCase()}-award`} key={award.name}>
                  {`${award.count}${award.name.substring(0, 1).toLowerCase()}${index === all_awardings.length - 1 ? '' : ','}`}
                </span>
              )}],
            </span>
          : ' []'
        }
      </div>
      {collapsed
        ? null
        : <React.Fragment>
            <div className="line">
              <ul className="codeComment">
                <li className="commentLine">'''</li>
                <li className="commentLine">
                  <div className="markdownText">
                    <ReactMarkdown source={body} />
                  </div>
                </li>
                <li className="commentLine">'''</li>
              </ul>
            </div>
            {replyList.map(child =>
              <div key={child.id}>
                {child.body
                  ? <Comment {...props} data={child} isChild={true}/>
                  : null
                }
              </div>
            )}
          </React.Fragment>
      }
    </div>
  );
}

export default PythonComment;