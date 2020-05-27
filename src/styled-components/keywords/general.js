import styled from 'styled-components';
import { Keyword, KeywordLink } from '../index';
import { COMMENT, NEGATIVE_VOTES, STRING, SUBMITTER, POSITIVE_VOTES } from '../theme';

const KarmaScore = styled(Keyword)`
  color: ${props => props.score > 0 ? POSITIVE_VOTES : NEGATIVE_VOTES };
`;

const Submitter = styled(Keyword)`
  color: ${SUBMITTER};
`;

/* ---------------- STRING ---------------- */
const String = styled(Keyword)`
  color: ${STRING};
`;

const StringLink = styled(KeywordLink)`
  color: ${STRING};
`;

const StringListItem = styled.li`
  color: ${STRING};
  & a {
    color: ${STRING};
  }
`;
/* ---------------- STRING ---------------- */

/* ---------------- COMMENT ---------------- */
const CommentListItem = styled.li`
  color: ${COMMENT};
  & a {
    color: ${COMMENT};
  }
`;
/* ---------------- COMMENT ---------------- */

export {
  KarmaScore,
  CommentListItem,
  String,
  StringLink,
  StringListItem,
  Submitter,
};