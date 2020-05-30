import styled from 'styled-components';

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
  Line,
  Indentation,
  Page
};