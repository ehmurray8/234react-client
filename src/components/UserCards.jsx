import React from 'react';
import PropTypes from 'prop-types';
import Card from "./Card";
import {playerBoxHeight, playerBoxWidth} from "../utils/constants";


const UserCards = (props) => {
    const numberOfCards = props.cards.length;
    const width = playerBoxWidth / 2;
    const height = playerBoxHeight * 2;
    const totalWidth = width * numberOfCards;

    const startingX = -totalWidth / 2;
    const yCoordinate = 825;

    return (
        <g>
            {
                props.cards.map((card, index) =>
                    <Card key={card.suit + card.rank} card={card} xCoordinate={startingX + width * index}
                          yCoordinate={yCoordinate} width={width} height={height}/>)
            }
        </g>
    )
};


UserCards.propTypes = {
    cards: PropTypes.arrayOf(PropTypes.shape({
        rank: PropTypes.string.isRequired,
        suit: PropTypes.string.isRequired,
    })).isRequired,
};


export default UserCards;