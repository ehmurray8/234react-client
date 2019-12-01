import {OptionTypes} from "../utils/constants";
import {GAME_UPDATE, JOIN_GAME, LEAVE_GAME, LOGGED_IN, SELECT_OPTION} from "../actions";

const defaultCards = [null, null];
const userStackSize = 250;

const testGameState = {
    players : [
        {name: "Player 2", balance: 100, cards: [{rank: "ace", suit: "clubs"}, {rank: "ace", suit: "diamonds"},
                                                 {rank: "2", suit: "clubs"}, {rank: "3", suit: "clubs"}],
            raiseCards: [false, false, false, false]},
        {name: "Player 3", balance: 120, cards: [{rank: "king", suit: "hearts"}, {rank: "king", suit: "diamonds"},
                                                 {rank: "5", suit: "hearts"}], raiseCards: [false, false]},
        {name: "Player 4", balance: 140, cards: [], raiseCards: []},
        {name: "Player 5", balance: 200, cards: [], raiseCards: []},
        {name: "Player 6", balance: 180, cards: defaultCards, raiseCards: []},
        {name: "Player 7", balance: 150, cards: [{rank: "7", suit: "hearts"}, {rank: "6", suit: "hearts"}],
            raiseCards: [true, true]}, {name: "Player 8", balance: 210, cards: [{rank: "jack", suit: "clubs"}, {rank: "10", suit: "clubs"}],
            raiseCards: [false, false]}
    ],
    communityCards: [{rank: "ace", suit: "hearts"}, {rank: "king", suit: "clubs"}, {rank: "8", suit: "hearts"},
        {rank: "queen", suit: "clubs"}, {rank: "2", suit: "hearts"}],
    mainPotAmount: 150,
    userCards: [{rank: "10", suit: "diamonds"}, {rank: "queen", suit: "spades"},
                {rank: "4", suit: "hearts"}, {rank: "9", suit: "diamonds"}],
    userStackSize: userStackSize,
    username: "ehmurray8",
    options: [
        {type: OptionTypes.FOLD, amount: 0},
        {type: OptionTypes.CALL, amount: 2},
        {type: OptionTypes.RAISE, amount: 4},
        {type: OptionTypes.ALLIN, amount: userStackSize},
    ],
    lastUserAmount: 100,
    raiseCommunityCards: [true, false, true, false, true],
    raiseUserCards: [false, false, false, false],
    userHasFolded: true,
    decisionTimeMaxSeconds: 15,
    lastActionAmounts: [100, 100, 100, 100, 100, 100, 100],
};

const initialGameState = {
    gameId: "",
    players : [],
    communityCards: [],
    mainPotAmount: 0,
    userCards: [],
    userStackSize: 0,
    username: "",
    options: [],
    lastUserAmount: 0,
    raiseCommunityCards: [],
    raiseUserCards: [],
    userHasFolded: false,
    decisionTimeMaxSeconds: 0,
    decisionEndTime: 0,
    lastActionAmounts: [],
};



const initialNavigationSettings = {
    loggedIn: false,
    inGame: false,
    isPlaying: false,
    isSpectator: false,
};


// eslint-disable-next-line
const testState = {
    gameState: testGameState,
    navigationSettings: initialNavigationSettings,
};


const initialState = {
    gameState: initialGameState,
    navigationSettings: initialNavigationSettings,
};


function reducer(state = initialState, action) {
    switch (action.type) {
        case LOGGED_IN:
            return {
                gameState: {
                    ...state.gameState,
                    username: action.player.username,
                },
                navigationSettings: {
                    ...state.navigationSettings,
                    loggedIn: true,
                },
                currentPlayer: action.player,
                socket: action.socket,
            };
        case JOIN_GAME:
            state.socket.emit("joinGame", state.currentPlayer);
            console.log("Joining game...");
            console.log(action.gameId);
            return {
                ...state,
                gameId: action.gameId,
                navigationSettings: {
                    ...state.navigationSettings,
                    inGame: true,
                    isPlaying: true,
                },
            };
        case GAME_UPDATE:
            const socket = state.socket;
            const eventId = action.payload.eventId;
            return {
                ...state,
                gameState: action.payload,
                sendOption: (type, amount, gameId) => {
                    socket.emit('option' + gameId, {
                        eventId: eventId,
                        type: type,
                        amount: amount
                    });
                },
            };
        case SELECT_OPTION:
            state.sendOption(action.optionType, action.optionAmount, state.gameId);
            console.log("Sending option via " + state.socket.id);
            return {
                ...state,
                gameState: {
                    ...state.gameState,
                    options: [],
                }
            };
        case LEAVE_GAME:
            return {
                ...state,
                navigationSettings: {
                    ...state.navigationSettings,
                    inGame: false,
                    isPlaying: false,
                    isSpectator: false,
                }
            };
        default:
            return state;
    }
}

export default reducer;