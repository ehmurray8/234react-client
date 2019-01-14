import React from 'react';
import PropTypes from 'prop-types';


const Pot = (props) => {

    const imageUrl = "/images/poker-chips.png";

    const width = 175;
    const height = 120;
    const yCoordinate = 310;

    const style = {
        font: "bold 30px sans-serif",
        textAlign: "center",
    };

    return (
        <g>
            <defs>
                <pattern id={"pot-image"} height="100%" width="100%" patternContentUnits="objectBoundingBox">
                    <image xlinkHref={imageUrl} preserveAspectRatio="none" width={1} height={1} />
                </pattern>
            </defs>
            <rect x={-width / 2} y={yCoordinate} height={height} width={width} fill={"url(#pot-image)"}/>
            <text x={-width / 2 + 50} y={yCoordinate + 15} style={style}>{"$" + props.mainPotAmount}</text>
        </g>
    );
};


Pot.propTypes = {
    mainPotAmount: PropTypes.number.isRequired,
};


export default Pot;
