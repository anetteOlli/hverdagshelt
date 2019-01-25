import React from 'react';
import styled from 'styled-components';

/**
 * @fileOverview Using 'styled-components' for map markers as google-map-react package had issues with material-ui.
 */

/**
 * black dot
 **/
const Wrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 25px;
  height: 25px;
  background-color: #000;
  border: 2px solid #fff;
  border-radius: 100%;
  user-select: none;
  transform: translate(-50%, -50%);
  cursor: ${props => (props.onClick ? 'pointer' : 'default')};
  &:hover {
    z-index: 1;
  }
`;

/**
 * blue dot
 **/
const WrapperCurrent = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 30px;
  height: 30px;
  background-color: blue;
  border: 2px solid #fff;
  border-radius: 100%;
  user-select: none;
  transform: translate(-50%, -50%);
  cursor: ${props => (props.onClick ? 'pointer' : 'default')};
  &:hover {
    z-index: 1;
  }
`;

export const Pointer = ({ onClick }) => <Wrapper onClick={onClick} />;
export const PointerCurrent = ({ onClick }) => <WrapperCurrent onClick={onClick} />;
