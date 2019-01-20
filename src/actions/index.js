export const LOGGED_IN = 'LOGGED_IN';
export const JOIN_GAME = 'JOIN_GAME';
export const GAME_UPDATE = 'GAME_UPDATE';


export const loggedIn = (player, socket) => ({
    type: LOGGED_IN,
    player: player,
    socket: socket,
});

export const joinGame = () => ({
    type: JOIN_GAME,
});

export const gameUpdate = (payload) => ({
    type: GAME_UPDATE,
    payload: payload,
});