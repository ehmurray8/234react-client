import React, { Component } from 'react';
import './App.css';
import PropTypes from 'prop-types';
import Canvas from "./components/Canvas";
import * as Auth0 from 'auth0-web';
import io from 'socket.io-client';
import {SERVER_URL} from "./utils/constants";


Auth0.configure({
    domain: 'ehmurray.auth0.com',
    clientID: 'Dw46VpZuEtCmd7NUjwfYGAsKg3KJu35p',
    redirectUri: 'http://localhost:3000/',
    responseType: 'token id_token',
    scope: 'openid profile manage:points',
    audience: 'http://234-poker.com'
});


class App extends Component {

    componentDidMount() {
        Auth0.handleAuthCallback();

        Auth0.subscribe((auth) => {
            if (!auth) return;

            const playerProfile = Auth0.getProfile();
            const currentPlayer = {
                id: playerProfile.sub,
                name: playerProfile.name,
                username: playerProfile.nickname,
            };

            const socket = io(SERVER_URL, {
                query: `token=${Auth0.getAccessToken()}`,
                'force new connection': true,
            });

            socket.emit("welcomeStatus", {
                username: currentPlayer.username,
            });

            socket.on('returnToGame', payload => {
                this.props.joinGame();
            });

            socket.on('gameUpdate', payload => {
                this.props.gameUpdate(payload);
            });

            socket.on('disconnect', () => {
                this.props.leaveGame();
            });

            this.props.loggedIn(currentPlayer, socket);
        });

        // Allows the app to be responsive to window size changes
        window.onresize = () => {
            const canvas = document.getElementById('main-canvas');
            canvas.style.width = `${window.innerWidth}px`;
            canvas.style.height = `${window.innerHeight}px`;
        };

        window.onresize();
    }

    componentWillReceiveProps(nextProps) {
        this.setState(nextProps);
    }

    render() {
        return (
            <Canvas {...this.props} />
        );
    }
}


App.propTypes = {
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
            amount: PropTypes.number.isRequired, })).isRequired,
        lastUserAmount: PropTypes.number.isRequired,
        raiseCommunityCards: PropTypes.arrayOf(PropTypes.bool).isRequired,
        raiseUserCards: PropTypes.arrayOf(PropTypes.bool).isRequired,
        userHasFolded: PropTypes.bool.isRequired,
        decisionEndTime: PropTypes.number.isRequired,
        decisionTimeMaxSeconds: PropTypes.number.isRequired,
        lastActionAmounts: PropTypes.arrayOf(PropTypes.number).isRequired,
        numberOfCards: PropTypes.number,
        betStepSize: PropTypes.number,
    }).isRequired,
    navigationSettings: PropTypes.shape({
        loggedIn: PropTypes.bool.isRequired,
        inGame: PropTypes.bool.isRequired,
        isPlaying: PropTypes.bool.isRequired,
        isSpectator: PropTypes.bool.isRequired,
    }).isRequired,
    currentPlayer: PropTypes.shape({
        name: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
    }),
    socket: PropTypes.object,
    loggedIn: PropTypes.func.isRequired,
    joinGame: PropTypes.func.isRequired,
    gameUpdate: PropTypes.func.isRequired,
    leaveGame: PropTypes.func.isRequired,
    selectOption: PropTypes.func,
};


export default App;
