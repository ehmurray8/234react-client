import React from 'react';
import PropTypes from 'prop-types';
import {gameHeight, playerBoxHeight, playerBoxWidth, tableWidth} from "../utils/constants";
import Player from "./Player";


const Players = (props) => {
    const excessWidth = tableWidth / 2;

    const bottomPlayerYCoordinate = gameHeight - 300;
    const middlePlayerYCoordinate = gameHeight - 540;
    const cornerPlayerYCoordinate = gameHeight - 775;
    const topPlayerYCoordinate = gameHeight - 825;

    const coordinates = [[-excessWidth - 125, bottomPlayerYCoordinate], [-excessWidth - 125, middlePlayerYCoordinate],
                         [-excessWidth, cornerPlayerYCoordinate], [0, topPlayerYCoordinate],
                         [excessWidth, cornerPlayerYCoordinate], [excessWidth + 125, middlePlayerYCoordinate],
                         [excessWidth + 125, bottomPlayerYCoordinate]];

    const lastActionCoordinates = [
        [-excessWidth - 125 + playerBoxWidth / 2 + 75, bottomPlayerYCoordinate - playerBoxHeight / 2],
        [-excessWidth - 125 + playerBoxWidth / 2 + 35, middlePlayerYCoordinate - playerBoxHeight / 2],
        [-excessWidth + playerBoxWidth / 2 + 25, cornerPlayerYCoordinate + playerBoxHeight / 2 + 15],
        [-150, topPlayerYCoordinate + playerBoxHeight / 2],
        [excessWidth - 200, cornerPlayerYCoordinate + playerBoxHeight / 2 + 15],
        [excessWidth - 125, middlePlayerYCoordinate - playerBoxHeight / 2],
        [excessWidth - 125, bottomPlayerYCoordinate - playerBoxHeight / 2],
    ];

    return (
        <g>
            { props.players.map((player, index) => (
                <Player key={player.name} xCoordinate={coordinates[index][0]} yCoordinate={coordinates[index][1]}
                        player={player} raiseCards={player.raiseCards} lastAction={{amount: props.lastActionAmounts[index],
                                                                                    xCoordinate: lastActionCoordinates[index][0],
                                                                                    yCoordinate: lastActionCoordinates[index][1]}}/>
            )) }
        </g>
    );
};



Players.propTypes = {
    players: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        balance: PropTypes.number.isRequired,
        raiseCards: PropTypes.arrayOf(PropTypes.bool.isRequired).isRequired,
    })),
    lastActionAmounts: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
};


export default Players;