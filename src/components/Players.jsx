import React from 'react';
import PropTypes from 'prop-types';
import {gameHeight, tableWidth} from "../utils/constants";
import Player from "./Player";


const Players = (props) => {
    const excessWidth = tableWidth / 2;

    const bottomPlayerYCoordinate = gameHeight - 300;
    const middlePlayerYCoordinate = gameHeight - 525;
    const cornerPlayerYCoordinate = gameHeight - 775;
    const topPlayerYCoordinate = gameHeight - 825;

    const coordinates = [[-excessWidth - 125, bottomPlayerYCoordinate], [-excessWidth - 125, middlePlayerYCoordinate],
                         [-excessWidth, cornerPlayerYCoordinate], [0, topPlayerYCoordinate],
                         [excessWidth, cornerPlayerYCoordinate], [excessWidth + 125, middlePlayerYCoordinate],
                         [excessWidth + 125, bottomPlayerYCoordinate]];

    return (
        <g>
            { props.players.map((player, index) => (
                <Player key={player.name} xCoordinate={coordinates[index][0]} yCoordinate={coordinates[index][1]}
                        player={player}/>
            )) }
        </g>
    );
};



Players.propTypes = {
    players: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        balance: PropTypes.number.isRequired,
    })),
};


export default Players;