import React from 'react';
import PropTypes from 'prop-types';
import {playerBoxHeight, playerBoxWidth} from "../utils/constants";
import Card from './Card';

const Player = (props) => {
    const textStyle = {
        fill: '#e3e3e3',
    };

    const xCoordinate = props.xCoordinate - (playerBoxWidth / 2);
    const yCoordinate = props.yCoordinate - (playerBoxHeight / 2);

    const radius = 20;
    const width = playerBoxWidth / 2 - 7;
    const numberOfCards = props.player.cards.length;
    const cards = props.player.cards;

    console.log(props.player);

    return (
        <g>
            { Array(numberOfCards).fill(0).map((x, y) => x + y).map((value, index) => (
                <Card card={cards[index]} xCoordinate={xCoordinate + index * width} yCoordinate={yCoordinate} width={width} />
            ))}

            <rect x={xCoordinate} y={yCoordinate} height={playerBoxHeight} width={playerBoxWidth} rx={radius} ry={radius}/>
            <text x={xCoordinate + 15} y={yCoordinate + (playerBoxHeight / 2)} style={textStyle}>{props.player.name}</text>
            <text x={xCoordinate + playerBoxWidth - 50} y={yCoordinate + (playerBoxHeight / 2)} style={textStyle}>{'$' + props.player.balance}</text>
        </g>
    );
};


Player.propTypes = {
    xCoordinate: PropTypes.number.isRequired,
    yCoordinate: PropTypes.number.isRequired,
    player: PropTypes.shape({
        name: PropTypes.string.isRequired,
        balance: PropTypes.string.isRequired,
        cards: PropTypes.arrayOf(PropTypes.shape({
            suit: PropTypes.string.isRequired,
            rank: PropTypes.string.isRequired,
        })).isRequired,
    }).isRequired,
};


export default Player;
