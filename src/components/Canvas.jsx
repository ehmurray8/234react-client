import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Settings from '../utils/settings';
import {signIn} from 'auth0-web'; import Table from './Table';
import Players from "./Players";
import {gameHeight, gameWidth} from "../utils/constants";
import CommunityCards from "./CommunityCards";
import Pot from "./Pot";
import UserCards from "./UserCards";
import UserInfo from "./UserInfo";
import UserOptions from "./UserOptions";
import TimeBar from "./TimeBar";
import Login from "./Login";
import SelectGame from "./SelectGame";


class Canvas extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ...props
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState(nextProps);
    }

    render() {
        const style = {
            border: '1px solid black',
            backgroundColor: Settings.backgroundColor,
        };

        const viewBox = [gameWidth / -2, 0, gameWidth, gameHeight];
        const gameState = this.state.gameState;
        return (
            <svg
                id="main-canvas"
                preserveAspectRatio="xMaxYMax none"
                style={style}
                viewBox={viewBox}
            >
                <defs>
                    <filter id="shadow">
                        <feDropShadow dx="1" dy="1" stdDeviation="2"/>
                    </filter>
                </defs>

                { this.state.navigationSettings.inGame &&
                    <Table/>
                }

                { this.state.gameState.mainPotAmount > 0 && this.state.navigationSettings.inGame &&
                    <Pot mainPotAmount={gameState.mainPotAmount}/>
                }

                { this.state.navigationSettings.inGame &&
                    <g>
                        <Players players={gameState.players} lastActionAmounts={gameState.lastActionAmounts}
                                 numberOfCards={gameState.numberOfCards}/>
                        <CommunityCards cards={gameState.communityCards} raiseCards={gameState.raiseCommunityCards}/>
                    </g>
                }

                { this.state.navigationSettings.isPlaying &&
                    <g>
                        <UserCards cards={gameState.userCards} raiseCards={gameState.raiseUserCards}
                                   foldedCard={gameState.userHasFolded} lastActionAmount={gameState.lastUserAmount}/>
                        <UserInfo stackSize={gameState.userStackSize} username={gameState.username}/>
                        <UserOptions options={gameState.options} stackSize={gameState.userStackSize} stepSize={1}
                                     selectOption={this.state.selectOption}/>
                    </g>
                }

                { this.state.navigationSettings.isPlaying && this.state.gameState.options.length > 0 &&
                    <TimeBar maxSeconds={gameState.decisionTimeMaxSeconds}/>
                }

                { !this.state.navigationSettings.loggedIn &&
                    <Login authenticate={signIn}/>
                }

                { this.state.navigationSettings.loggedIn && ! this.state.navigationSettings.inGame &&
                    <SelectGame joinGame={this.props.joinGame}/>
                }
            </svg>
        );
    }
}


Canvas.propTypes = {
    gameState: PropTypes.shape({
        players: PropTypes.arrayOf(PropTypes.shape({
            name: PropTypes.string.isRequired,
            balance: PropTypes.number.isRequired,
            cards: PropTypes.arrayOf(PropTypes.shape({
                rank: PropTypes.string.isRequired,
                suit: PropTypes.string.isRequired,
            })),
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
        lastUserAmount: PropTypes.number.isRequired,
        raiseCommunityCards: PropTypes.arrayOf(PropTypes.bool).isRequired,
        raiseUserCards: PropTypes.arrayOf(PropTypes.bool).isRequired,
        userHasFolded: PropTypes.bool.isRequired,
        decisionTimeMaxSeconds: PropTypes.number.isRequired,
        lastActionAmounts: PropTypes.arrayOf(PropTypes.number).isRequired,
        numberOfCards: PropTypes.number,
    }).isRequired,
    navigationSettings: PropTypes.shape({
        loggedIn: PropTypes.bool.isRequired,
        inGame: PropTypes.bool.isRequired,
        isPlaying: PropTypes.bool.isRequired,
        isSpectator: PropTypes.bool.isRequired,
    }).isRequired,
    socket: PropTypes.object,
    currentPlayer: PropTypes.shape({
        id: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
    }),
    loggedIn: PropTypes.func.isRequired,
    joinGame: PropTypes.func.isRequired,
    gameUpdate: PropTypes.func.isRequired,
    selectOption: PropTypes.func,
};


export default Canvas;
