import styled from 'styled-components';
import {Keyword, KeywordLink} from './index';

const KarmaScore = styled(Keyword)`
  color: ${props => props.score > 0 ? 'purple' : 'red' };
`;

const String = styled(Keyword)`
  color: green;
`;

const StringLink = styled(KeywordLink)`
  color: green;
`;

const Submitter = styled(Keyword)`
  color: red;
`;

const CommentListItem = styled.li`
  color: grey;
  & a {
    color: grey;
  }
`;

const StringListItem = styled.li`
  color: green;
  & a {
    color: green;
  }
`;

export {
  KarmaScore,
  CommentListItem,
  String,
  StringLink,
  StringListItem,
  Submitter,
}