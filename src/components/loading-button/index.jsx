import React from "react";
import styled from 'styled-components';

const Container = styled.div`
  width: fit-content;
  margin-left: 2em;
  border-radius: 2px;
  padding: 0.5em;
`;

const Content = styled.div`
  text-align: center;
  vertical-align: middle;
`;

const LoadingButton = ({ loadFunc, isLoading, itemLimit }) => {
  return (
    <Container onClick={loadFunc}>
      {isLoading
        ? <Content>loading</Content>
        : <Content>load next {itemLimit}</Content>
      }
    </Container>
  )
};

export default LoadingButton;