import styled from 'styled-components';

const Keyword = styled.span`
  margin-left: ${props => props.leftSpace ? '0.2rem' : '0'};
  margin-right: ${props => props.rightSpace ? '0.2rem' : '0'};
`;

const KeywordLink = styled.a`
  margin-left: ${props => props.leftSpace ? '0.4rem' : '0'};
  margin-right: ${props => props.rightSpace ? '0.4rem' : '0'};
`;

const Line = styled.div`
  min-height: 1em;
  line-height: 1.6em;
`;

const Indentation = styled.div`
    margin-left: ${props => props.depth && props.depth >= 1 ? `${props.depth*2}rem` : 0 };
`;

const Page = styled(Indentation)`
  margin-bottom: 1rem;
`;

export {
  Keyword,
  KeywordLink,
  Line,
  Indentation,
  Page
};