import { connect } from 'react-redux';
import App from '../App';


const mapStateToProps = state => ({
    gameState: state.gameState,
});


const Game = connect(
    mapStateToProps,
)(App);


export default Game;