import styled from 'styled-components';

const Keyword = styled.span`
  margin-left: ${props => props.leftSpace ? '0.2rem' : '0'};
  margin-right: ${props => props.rightSpace ? '0.2rem' : '0'};
`;

export default Keyword;