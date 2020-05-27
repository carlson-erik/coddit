import styled from 'styled-components';

const CodeComment = styled.ul`
  max-width: 800px;
`;

const MarkdownText = styled.div`
  & > p:first-child {
    margin-top: 0;
  }

  & > p:last-child {
    margin-bottom: 0;
  }
`;

const CommentToggle = styled.span`
  cursor: default;
  display: inline-block
  font-size: 0.75em;
  margin-right: 0.4rem;
`;

export {
  CodeComment, 
  CommentToggle,
  MarkdownText
};