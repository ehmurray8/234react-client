import {OptionTypes} from "../utils/constants";

const defaultCards = [null, null];
const userStackSize = 250;

const gameState = {
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
    raiseCommunityCards: [true, false, true, false, true],
    raiseUserCards: [false, false, false, false],
    userHasFolded: true,
    decisionTimeMaxSeconds: 15,
    lastActionAmounts: [100, 100, 100, 100, 100, 100, 100],
};


const navigationSettings = {
    inGame: false,
    isPlaying: false,
    isSpectator: false,
};


const testState = {
    gameState: gameState,
    navigationSettings: navigationSettings,
};


function reducer(state = testState) {
    return state;
}

export default reducer;