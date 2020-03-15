import styled from 'styled-components';

const Indentation = styled.div`
    margin-left: ${props => props.depth && props.depth >= 1 ? `${props.depth*2}rem` : 0 };
`;

export default Indentation;