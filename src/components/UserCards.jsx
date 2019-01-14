import React from 'react';
import PropTypes from 'prop-types';
import Card from "./Card";
import {playerBoxHeight, playerBoxWidth} from "../utils/constants";
import PlayerAction from "./PlayerAction";


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
                          yCoordinate={yCoordinate} width={width} height={height} raiseCard={props.raiseCards[index]}
                          foldedCard={props.foldedCard}/>)
            }
            { props.lastActionAmount && props.lastActionAmount > 0 &&
                <PlayerAction amount={props.lastActionAmount} xCoordinate={startingX + width * numberOfCards + 20} yCoordinate={700}/>
            }
        </g>
    )
};


UserCards.propTypes = {
    cards: PropTypes.arrayOf(PropTypes.shape({
        rank: PropTypes.string.isRequired,
        suit: PropTypes.string.isRequired,
    })).isRequired,
    raiseCards: PropTypes.arrayOf(PropTypes.bool.isRequired).isRequired,
    foldedCard: PropTypes.bool.isRequired,
    lastActionAmount: PropTypes.number.isRequired,
};


export default UserCards;