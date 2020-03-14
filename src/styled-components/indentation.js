import React from "react";
import styled from 'styled-components';

const MarginLeft = styled.div`
    margin-left: ${props => props.depth && props.depth > 0 ? `${props.depth * 2}rem` : 0 };
`;

const Indentation = (props) => {
    const {depth, children} = props;
    const indentationDepth = depth && depth > 1 ? depth * 2 :  1;
    return (
        <MarginLeft depth={indentationDepth}>
            {children}
        </MarginLeft>
    )
}

export default Indentation;