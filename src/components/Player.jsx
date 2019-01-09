import React from 'react';
import PropTypes from 'prop-types';

const Player = (props) => {
    const width = 250;
    const height = 100;

    const textStyle = {
        fill: '#e3e3e3',
    };

    const xCoordinate = props.xCoordinate - (width / 2);
    const yCoordinate = props.yCoordinate - (height / 2);

    const radius = 20;

    return (
        <g>
            <rect x={xCoordinate} y={yCoordinate} height={height} width={width} rx={radius} ry={radius}/>
            <text x={xCoordinate + 15} y={yCoordinate + (height / 2)} style={textStyle}>{props.player.name}</text>
            <text x={xCoordinate + width - 50} y={yCoordinate + (height / 2)} style={textStyle}>{'$' + props.player.balance}</text>
        </g>
    );
};


Player.propTypes = {
    xCoordinate: PropTypes.number.isRequired,
    yCoordinate: PropTypes.number.isRequired,
    player: PropTypes.shape({
        name: PropTypes.string.isRequired,
        balance: PropTypes.string.isRequired,
    }).isRequired,
};


export default Player;
