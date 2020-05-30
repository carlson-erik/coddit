import styled from 'styled-components';
import { NEGATIVE_VOTES, SUBMITTER, POSITIVE_VOTES } from './theme';

const Keyword = styled.span`
  margin-left: ${props => props.leftSpace ? '0.2rem' : '0'};
  margin-right: ${props => props.rightSpace ? '0.2rem' : '0'};
  ${props => `color: ${props.color};` || ''}
`;

const KeywordLink = styled.a`
  margin-left: ${props => props.leftSpace ? '0.4rem' : '0'};
  margin-right: ${props => props.rightSpace ? '0.4rem' : '0'};
  ${props => `color: ${props.color};` || ''}
`;

const KeywordListItem = styled.li`
  ${props => `
    color: ${props.color};
    & a {
      color: ${props.color};
    }` || ''}
`;

const KarmaScore = styled(Keyword)`
  color: ${props => props.score > 0 ? POSITIVE_VOTES : NEGATIVE_VOTES };
`;

const Submitter = styled(Keyword)`
  color: ${SUBMITTER};
`;

export {
  Keyword,
  KeywordLink,
  KeywordListItem,
  KarmaScore,
  Submitter,
};