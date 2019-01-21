import { connect } from 'react-redux';
import App from '../App';
import {gameUpdate, joinGame, loggedIn, selectOption} from "../actions";


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
});


const Game = connect(
    mapStateToProps,
    mapDispatchToProps,
)(App);


export default Game;