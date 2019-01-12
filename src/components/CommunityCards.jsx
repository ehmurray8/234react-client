import React from 'react';
import PropTypes from 'prop-types';
import Card from "./Card";
import {playerBoxHeight, playerBoxWidth, tableWidth} from "../utils/constants";


const CommunityCards = (props) => {

    const firstXCoordinate = -tableWidth / 2 + 250;
    const spacing = [0, 15, 30, 70, 110];
    const yCoordinate = 550;

    const width = playerBoxWidth / 2;
    const height = playerBoxHeight * 2;

    return (
        <g>
            { props.cards.map((card, index) =>
                <Card key={card.rank + card.suit} card={card} xCoordinate={firstXCoordinate + width * index + spacing[index]}
                      yCoordinate={yCoordinate} width={width} height={height}/>)
            }
        </g>
    );
};


CommunityCards.propTypes = {
    cards: PropTypes.arrayOf(PropTypes.shape({
        rank: PropTypes.string.isRequired,
        suit: PropTypes.string.isRequired,
    })).isRequired,
};


export default CommunityCards;