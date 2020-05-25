import styled from 'styled-components';
import {Keyword} from './index';

const KarmaScore = styled(Keyword)`
  color: ${props => props.score > 0 ? 'purple' : 'red' };
`;

const String = styled(Keyword)`
  color: green;
`;

export {
  KarmaScore,
  String,
}