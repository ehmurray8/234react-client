import React from 'react';
import PropTypes from 'prop-types';
import {playerBoxHeight, playerBoxWidth} from "../utils/constants";
import Card from './Card';
import Settings from "../utils/settings";
import PlayerAction from "./PlayerAction";

const Player = (props) => {
    const textStyle = {
        fill: Settings.mainTextColor,
        font: 'bold 20px sans-serif'
    };

    const xCoordinate = props.xCoordinate - (playerBoxWidth / 2);
    const yCoordinate = props.yCoordinate - (playerBoxHeight / 2);

    const radius = 20;
    const width = playerBoxWidth / 2 - 7;
    const height = playerBoxHeight * 2;
    const numberOfCards = props.numberOfCards;
    let cards = props.player.cards;

    if (!cards || cards.length === 0) {
        cards = Array(numberOfCards);
    }

    let spacing = width;
    if (numberOfCards > 2) {
        spacing = 30;
    }

    return (
        <g>
            { Array(numberOfCards).fill(0).map((x, y) => x + y).map((value, index) => (
                <Card key={index} card={cards[index]} xCoordinate={xCoordinate + index * spacing}
                      yCoordinate={yCoordinate} width={width} height={height} raiseCard={props.raiseCards[index]}/>
            ))}

            <rect x={xCoordinate} y={yCoordinate} height={playerBoxHeight} width={playerBoxWidth} rx={radius} ry={radius}/>
            <text x={xCoordinate + 15} y={yCoordinate + (playerBoxHeight / 2) - 15} style={textStyle}>{props.player.name}</text>
            <text x={xCoordinate + 15} y={yCoordinate + (playerBoxHeight / 2) + 25} style={textStyle}>{'$' + props.player.balance}</text>
            { props.lastAction && props.lastAction.amount && props.lastAction.amount > 0 &&
                <PlayerAction amount={props.lastAction.amount} xCoordinate={props.lastAction.xCoordinate}
                              yCoordinate={props.lastAction.yCoordinate}/>
            }
        </g>
    );
};


Player.propTypes = {
    xCoordinate: PropTypes.number.isRequired,
    yCoordinate: PropTypes.number.isRequired,
    player: PropTypes.shape({
        name: PropTypes.string.isRequired,
        balance: PropTypes.number.isRequired,
        cards: PropTypes.arrayOf(PropTypes.shape({
            suit: PropTypes.string.isRequired,
            rank: PropTypes.string.isRequired,
        })).isRequired,
    }).isRequired,
    raiseCards: PropTypes.arrayOf(PropTypes.bool.isRequired),
    lastAction: PropTypes.shape({
        amount: PropTypes.number.isRequired,
        xCoordinate: PropTypes.number.isRequired,
        yCoordinate: PropTypes.number.isRequired,
    }),
    numberOfCards: PropTypes.number.isRequired,
};


export default Player;
