import styled from 'styled-components';
import { SUBMITTER } from './theme';

const LEFT_SPACE = '0.3rem';
const RIGHT_SPACE ='0.3rem';

const Keyword = styled.span`
  margin-left: ${props => props.leftSpace ? LEFT_SPACE : '0'};
  margin-right: ${props => props.rightSpace ? RIGHT_SPACE : '0'};
  ${props => props.color !== '' ? `color: ${props.color};` : ''}
`;

const KeywordLink = styled.a`
  margin-left: ${props => props.leftSpace ? '0.4rem' : '0'};
  margin-right: ${props => props.rightSpace ? '0.4rem' : '0'};
  ${props => props.color !== '' ? `color: ${props.color};` : ''}
`;

const KeywordListItem = styled.li`
  ${props => props.color !== '' ? `
    color: ${props.color};
    & a {
      color: ${props.color};
    }` : ''}
`;

const KarmaScore = styled(Keyword)`
  margin-left: ${props => props.leftSpace ? LEFT_SPACE : '0'};
  margin-right: ${props => props.rightSpace ? RIGHT_SPACE : '0'};
  color: ${props => (props.score > 0) 
            ? (props.ups !== '' ? props.ups : 'Orange')
            : (props.downs !== '' ? props.downs : 'DodgerBlue')
          };
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