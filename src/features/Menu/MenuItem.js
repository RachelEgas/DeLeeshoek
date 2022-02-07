import React from "react";
import {useImagesContext} from "../../contexts/ImagesContext";
import {StyledMenuItem} from "./styles";

export default (props) => {
        const { images } = useImagesContext();

        const s = props.src;
        const bookNumber = (s.match(/\d+/g) || []).map(n => parseInt(n));

        return (
            <StyledMenuItem onClick={() => {props.itemOnClick(bookNumber, props.src)}}>
                <img src={images[props.src.replace('./','')]} className="bookItem" />
            </StyledMenuItem>
        );
    };