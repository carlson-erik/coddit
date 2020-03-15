import styled from 'styled-components';

const Keyword = styled.span`
  margin-left: ${props => props.leftSpace ? '0.4rem' : '0'};
  margin-right: ${props => props.rightSpace ? '0.4rem' : '0'};
`;

export default Keyword;