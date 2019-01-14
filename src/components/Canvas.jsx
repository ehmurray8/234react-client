import React from 'react';
import PropTypes from 'prop-types';
import Settings from '../utils/settings';
import Table from './Table';
import Players from "./Players";
import {gameHeight, gameWidth} from "../utils/constants";
import CommunityCards from "./CommunityCards";
import Pot from "./Pot";
import UserCards from "./UserCards";
import UserInfo from "./UserInfo";
import UserOptions from "./UserOptions";
import TimeBar from "./TimeBar";


const Canvas = (props) => {
    const style = {
        border: '1px solid black',
        backgroundColor: Settings.backgroundColor,
    };

    const viewBox = [gameWidth / -2, 0, gameWidth, gameHeight];
    const gameState = props.gameState;
    return (
        <svg
            id="main-canvas"
            preserveAspectRatio="xMaxYMax none"
            style={style}
            viewBox={viewBox}
        >
            <Table />
            { props.gameState.mainPotAmount > 0 &&
                <Pot mainPotAmount={gameState.mainPotAmount}/>
            }
            <Players players={gameState.players} lastActionAmounts={gameState.lastActionAmounts}/>
            <CommunityCards cards={gameState.communityCards} raiseCards={gameState.raiseCommunityCards}/>
            <UserCards cards={gameState.userCards} raiseCards={gameState.raiseUserCards} foldedCard={gameState.userHasFolded} lastActionAmount={100}/>
            <UserInfo stackSize={gameState.userStackSize} username={gameState.username}/>
            <UserOptions options={gameState.options} stackSize={gameState.userStackSize} stepSize={1}/>
            <TimeBar maxSeconds={gameState.decisionTimeMaxSeconds}/>
        </svg>
    );
};

Canvas.propTypes = {
    gameState: PropTypes.shape({
        players: PropTypes.arrayOf(PropTypes.shape({
            name: PropTypes.string.isRequired,
            balance: PropTypes.number.isRequired,
            cards: PropTypes.arrayOf(PropTypes.shape({
                rank: PropTypes.string.isRequired,
                suit: PropTypes.string.isRequired,
            })).isRequired,
        })).isRequired,
        communityCards: PropTypes.arrayOf(PropTypes.shape({
            rank: PropTypes.string.isRequired,
            suit: PropTypes.string.isRequired,
        })).isRequired,
        mainPotAmount: PropTypes.number.isRequired,
        userCards: PropTypes.arrayOf(PropTypes.shape({
            rank: PropTypes.string.isRequired,
            suit: PropTypes.string.isRequired,
        })).isRequired,
        userStackSize: PropTypes.number.isRequired,
        username: PropTypes.string.isRequired,
        options: PropTypes.arrayOf(PropTypes.shape({
            type: PropTypes.string.isRequired,
            amount: PropTypes.number.isRequired,
        })).isRequired,
        raiseCommunityCards: PropTypes.arrayOf(PropTypes.bool).isRequired,
        raiseUserCards: PropTypes.arrayOf(PropTypes.bool).isRequired,
        userHasFolded: PropTypes.bool.isRequired,
        decisionTimeMaxSeconds: PropTypes.number.isRequired,
        lastActionAmounts: PropTypes.arrayOf(PropTypes.number).isRequired,
    }).isRequired,
};


export default Canvas;