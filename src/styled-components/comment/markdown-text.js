import styled from 'styled-components';

const MarkdownText = styled.div`
  & > p:first-child {
    margin-top: 0;
  }

  & > p:last-child {
    margin-bottom: 0;
  }
`

export default MarkdownText;