import { connect } from 'react-redux';
import App from '../App';
import {gameUpdate, joinGame, loggedIn} from "../actions";


const mapStateToProps = state => ({
    gameState: state.gameState,
    navigationSettings: state.navigationSettings,
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
});


const Game = connect(
    mapStateToProps,
    mapDispatchToProps,
)(App);


export default Game;