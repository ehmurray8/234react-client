import React from 'react';
import PropTypes from 'prop-types';
import {tableWidth} from "../utils/constants";
import Player from "./Player";


const Players = (props) => {
    const excessWidth = tableWidth / 2;

    const coordinates = [[-excessWidth - 65, -window.innerHeight + 750], [-excessWidth - 125, -window.innerHeight + 475],
        [-excessWidth, -window.innerHeight + 200], [0, -window.innerHeight + 150], [excessWidth, -window.innerHeight + 200],
        [excessWidth + 125, -window.innerHeight + 475], [excessWidth + 65, -window.innerHeight + 750]];

    return (
        <g>
            { props.players.map((player, index) => (
                <Player xCoordinate={coordinates[index][0]} yCoordinate={coordinates[index][1]} player={player} />
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