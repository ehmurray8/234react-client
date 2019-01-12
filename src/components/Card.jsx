import React from 'react';
import PropTypes from 'prop-types';
import {playerBoxHeight} from "../utils/constants";


const Card = (props) => {
    let imageUrl = '/images/CardImages/back_of_card.png';
    let identifier = "";
    let card = props.card;
    if (card) {
        imageUrl = convertCardToImage(card);
        identifier = getIdentifier(card);
    }


    const xCoordinate = props.xCoordinate + 7;
    const yCoordinate = props.yCoordinate - playerBoxHeight - 7;

    return (
        <g>
            <defs>
                <pattern id={"attachedImage" + identifier} height="100%" width="100%" patternContentUnits="objectBoundingBox">
                    <image xlinkHref={imageUrl} preserveAspectRatio="none" width={1} height={1} />
                </pattern>
            </defs>
            <rect x={xCoordinate} y={yCoordinate} height={props.height} width={props.width} fill={"url(#attachedImage" + identifier + ")"}/>
        </g>
    );
};


function convertCardToImage(card) {
    const urlBase = "/images/CardImages/";
    return urlBase + card.rank + "_of_" + card.suit + ".png";
}

function getIdentifier(card) {
    return card.rank + "-" + card.suit;
}


Card.propTypes = {
    card: PropTypes.shape({
        rank: PropTypes.string.isRequired,
        suit: PropTypes.string.isRequired,
    }),
    xCoordinate: PropTypes.number.isRequired,
    yCoordinate: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
};


export default Card;