import styled, { keyframes } from "styled-components";

export { Nav } from "./Nav";
export { Roof } from "./Roof";

export const GameHeader = styled.div`
  justify-content: center;
  height: 100%;
  min-height: 100vh;
  width: 100%;
  background-image: ${({ filter}) => {
      return filter
        ? " linear-gradient(to bottom, rgba(0,0,0,.3), rgba(0,0,0,.5)), "
        : "";
    }}
    url(${({ bg }) => bg});
  background-size: ${({ size }) => size};
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(500px, 1fr)); 
  grid-gap: 10px;                        
`;

export const Game = styled.div`
  justify-content: center;
  display: flex;
  align-items: center;
`;

export const Menu = styled.div`
  justify-content: center;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  top: 22%;
  left: 22%;
  display: grid;
  grid-template-columns: repeat(4, 200px); 
  grid-auto-rows: 200px;                  
  grid-gap: 10px;                        
  width: 516px;
`;

export const MenuItem = styled.button`
  height: 200px;
  width: 200px;
  opacity: 0.9;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.8);
  position: relative;
  img {
      max-height: 180px;
      max-width: 180px;
        opacity: 0.9;
        border: 1px solid #ccc;
        border-radius: 10px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
  }

`;

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

const hourglass = keyframes`
0% {
  transform: rotate(0);
  animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
}
50% {
  transform: rotate(900deg);
  animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
}
100% {
  transform: rotate(1800deg);
}`;

export const Loader = styled.div`
  display: block;
  position: absolute;
  width: 64px;
  height: 64px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  &:after {
    content: " ";
    display: block;
    border-radius: 50%;
    width: 0;
    height: 0;
    margin: 6px;
    box-sizing: border-box;
    border: 26px solid #fff;
    border-color: #fff transparent #fff transparent;
    animation: ${hourglass} 1.2s infinite;
  }
`;

export const Button = styled.button`
  border: 1px #77c76e solid;
  background: #60af56;
  color: #fff;
  font-size: 2rem;
  font-weight: 500;
  padding: 1rem;
  border-radius: 30px;
  margin-top: 10%;
  cursor: pointer;
  font-family: "Indie Flower", cursive, -apple-system;
  text-transform: uppercase;
  transform: scale(1);
  transition: 0.2s all;
  &:hover {
    transform: scale(1.1);
  }
  @media screen and (max-width: 768px) {
    font-size: 1.6rem;
    padding: 1rem;
  }
  @media screen and (max-height: 213px) {
    margin-top: 0;
    padding: 0;
    font-size: 0.9rem;
  }
`;
