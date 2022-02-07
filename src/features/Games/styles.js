import styled, { keyframes } from "styled-components";

const rotate = keyframes`
100% {
  transform: rotate(1turn);
}
`;

let height = 450;

if (window.screen.height <= 640 || window.screen.width <= 412 ) {
    height = 300;
}

if (window.screen.height <= 480) {
    height = 300;
}
if (window.screen.height <= 412) {
    height = 200;
}

export const Grid = styled.div`
    display: flex;
    flex-wrap: wrap;
    user-select: none;
    .board-square:nth-child(n + 35):nth-child(-n + ${({ wordLength }) => wordLength}) {
        box-sizing: border-box;
        border-bottom: 4px solid rgba(255, 255, 255, 0.9);
        border-top: 4px solid rgba(255, 255, 255, 0.9);
        background-color: rgba(129, 190, 214, 1);
    };
    .board-square:nth-child(2) {
        box-sizing: border-box;
        border-top-left-radius: 21px;
    };
    .board-square:nth-child(11) {
        box-sizing: border-box;
        border-top-right-radius: 21px;
    };
    .board-square:nth-child(62) {
         box-sizing: border-box;
         border-bottom-left-radius: 21px;
    };
    .board-square:nth-child(71) {
        box-sizing: border-box;
        border-bottom-right-radius: 21px;
    };
    .board-square:nth-child(35) {
        box-sizing: border-box;
        border-left: 4px solid var(--color5);
    };   
    .board-square:nth-child(${({ wordLength }) => wordLength}) {
        box-sizing: border-box;
        border-right: 4px solid var(--color5);
    };
`;

export const WinContainer = styled.div`
  margin: 0 auto;
  width: ${height}px;
  //height:${height}px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 0;
  border-radius: 10px;
  overflow: hidden;
  padding: 1rem;
  background: lightblue;
  > img {
    width: 100%;
   // height: 100%;
    background: lightblue;
  }
  &::before {
    content: "";
    position: absolute;
    z-index: -2;
    left: -50%;
    top: -50%;
    width: 200%;
    height: 200%;
    background-color: #399953;
    background-repeat: no-repeat;
    background-size: 50% 50%, 50% 50%;
    background-position: 0 0, 100% 0, 100% 100%, 0 100%;
    background-image: linear-gradient(#399953, #399953),
      linear-gradient(#fbb300, #fbb300), linear-gradient(#d53e33, #d53e33),
      linear-gradient(#377af5, #377af5);
    animation: ${rotate} 4s linear infinite;
  }
  &::after {
    content: "";
    position: absolute;
    z-index: -1;
    left: 6px;
    top: 6px;
    width: calc(100% - 12px);
    height: calc(100% - 12px);
    background: white;
    border-radius: 5px;
  }
`;
