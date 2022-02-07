import React from "react";
import {useImagesContext} from "../../contexts/ImagesContext";
import {WinContainer} from "./styles";

export default (props) => {
    const { images } = useImagesContext();
    console.log(images);

    return (
        <WinContainer>
            <img src={images[props.currentImage.replace('./','')]} alt="puzzle"  />
        </WinContainer>
    );
};