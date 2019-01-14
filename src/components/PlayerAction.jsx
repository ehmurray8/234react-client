import React from 'react';
import PropTypes from 'prop-types';


const PlayerAction = (props) => {

    const imageUrl = "/images/poker-chips.png";
    const height = 75;
    const width = 50;

    const textStyle = {
        font: 'bold 18px sans-serif',
    };

    return (
        <g>
            <defs>
                <pattern id={"player-action-image"} height="100%" width="100%" patternContentUnits="objectBoundingBox">
                    <image xlinkHref={imageUrl} preserveAspectRatio="none" width={1} height={1} />
                </pattern>
            </defs>
            <rect height={height} width={width} x={props.xCoordinate} y={props.yCoordinate} fill="url(#player-action-image)"/>
            <text x={props.xCoordinate} y={props.yCoordinate + height + 5} style={textStyle}>{"$" + props.amount}</text>
        </g>
    );
};


PlayerAction.propTypes = {
    amount: PropTypes.number.isRequired,
    xCoordinate: PropTypes.number.isRequired,
    yCoordinate: PropTypes.number.isRequired,
};


export default PlayerAction;