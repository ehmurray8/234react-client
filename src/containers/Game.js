import { connect } from 'react-redux';
import App from '../App';
import {gameUpdate, joinGame, loggedIn, selectOption, leaveGame} from "../actions";


const mapStateToProps = state => ({
    ...state
});


const mapDispatchToProps = dispatch => ({
    loggedIn: (player, socket) => {
        dispatch(loggedIn(player, socket));
    },
    joinGame: () => {
        dispatch(joinGame());
    },
    gameUpdate: (payload) => {
        dispatch(gameUpdate(payload));
    },
    selectOption: (type, amount) => {
        dispatch(selectOption(type, amount));
    },
    leaveGame: () => {
        dispatch(leaveGame());
    }
});


const Game = connect(
    mapStateToProps,
    mapDispatchToProps,
)(App);


export default Game;