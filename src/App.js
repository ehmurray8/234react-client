import React, { Component } from 'react';
import './App.css';
import PropTypes from 'prop-types';
import Canvas from "./components/Canvas";
import * as Auth0 from 'auth0-web';
import io from 'socket.io-client';


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
            this.currentPlayer = {
                id: playerProfile.sub,
                name: playerProfile.name,
                username: playerProfile.nickname,
            };

            // this.props.loggedIn(currentPlayer);

            this.socket = io('http://localhost:3001', {
                query: `token=${Auth0.getAccessToken()}`,
            });

            this.props.navigationSettings.loggedIn = true;
            this.setState(this.props);
        });

        // Allows the app to be responsive to window size changes

        window.onresize = () => {
            const canvas = document.getElementById('main-canvas');
            canvas.style.width = `${window.innerWidth}px`;
            canvas.style.height = `${window.innerHeight}px`;
        };

        window.onresize();
    }

    render() {
        return (
            <Canvas gameState={this.props.gameState} navigationSettings={this.props.navigationSettings}
                    socket={this.socket} currentPlayer={this.currentPlayer} />
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
    navigationSettings: PropTypes.shape({
        loggedIn: PropTypes.bool.isRequired,
        inGame: PropTypes.bool.isRequired,
        isPlaying: PropTypes.bool.isRequired,
        isSpectator: PropTypes.bool.isRequired,
    }).isRequired,
};


export default App;
