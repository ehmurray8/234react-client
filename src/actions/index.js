export const LOGGED_IN = 'LOGGED_IN';
export const JOIN_GAME = 'JOIN_GAME';
export const GAME_UPDATE = 'GAME_UPDATE';
export const SELECT_OPTION = 'SELECT_OPTION';
export const LEAVE_GAME = 'LEAVE_GAME';


export const loggedIn = (player, socket) => ({
    type: LOGGED_IN,
    player: player,
    socket: socket,
});

export const joinGame = (gameId) => ({
    type: JOIN_GAME,
    gameId: gameId
});

export const gameUpdate = (payload) => ({
    type: GAME_UPDATE,
    payload: payload,
});

export const leaveGame = () => ({
    type: LEAVE_GAME
});

export const selectOption = (type, amount) => ({
    type: SELECT_OPTION,
    optionType: type,
    optionAmount: amount,
});
