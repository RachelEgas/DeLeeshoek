import styled from "styled-components";

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


export const StyledMenuItem = styled.button`
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
