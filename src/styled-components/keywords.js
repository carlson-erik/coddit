import styled from 'styled-components';
import {Keyword, KeywordLink} from './index';

const KarmaScore = styled(Keyword)`
  color: ${props => props.score > 0 ? 'purple' : 'red' };
`;

const Submitter = styled(Keyword)`
  color: red;
`;

/* ---------------- STRING ----------------*/
const STRING_DEFAULT = 'green';
const String = styled(Keyword)`
  color: ${STRING_DEFAULT};
`;

const StringLink = styled(KeywordLink)`
  color: ${STRING_DEFAULT};
`;

const StringListItem = styled.li`
  color: ${STRING_DEFAULT};
  & a {
    color: ${STRING_DEFAULT};
  }
`;
/* ---------------- STRING ----------------*/

/* ---------------- COMMENT ----------------*/
const COMMENT_DEFAULT = 'grey';
const CommentListItem = styled.li`
  color: ${COMMENT_DEFAULT};
  & a {
    color: ${COMMENT_DEFAULT};
  }
`;
/* ---------------- COMMENT ----------------*/

export {
  KarmaScore,
  CommentListItem,
  String,
  StringLink,
  StringListItem,
  Submitter,
}