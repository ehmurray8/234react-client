import React from 'react';
import Settings from '../utils/settings';
import Table from './Table';
import Players from "./Players";
import {gameHeight, gameWidth, OptionTypes} from "../utils/constants";
import CommunityCards from "./CommunityCards";
import Pot from "./Pot";
import UserCards from "./UserCards";
import UserInfo from "./UserInfo";
import UserOptions from "./UserOptions";


const Canvas = () => {
    const style = {
        border: '1px solid black',
        backgroundColor: Settings.backgroundColor,
    };

    const viewBox = [gameWidth / -2, 0, gameWidth, gameHeight];
    const defaultCards = [null, null];

    // Input
    const players = [
        {name: "Player 2", balance: 100, cards: [{rank: "ace", suit: "clubs"}, {rank: "ace", suit: "diamonds"},
                                                 {rank: "2", suit: "clubs"}, {rank: "3", suit: "clubs"}]},
        {name: "Player 3", balance: 120, cards: [{rank: "king", suit: "hearts"}, {rank: "king", suit: "diamonds"},
                                                 {rank: "5", suit: "hearts"}]},
        {name: "Player 4", balance: 140, cards: []},
        {name: "Player 5", balance: 200, cards: []},
        {name: "Player 6", balance: 180, cards: defaultCards},
        {name: "Player 7", balance: 150, cards: [{rank: "7", suit: "hearts"}, {rank: "6", suit: "hearts"}]},
        {name: "Player 8", balance: 210, cards: [{rank: "jack", suit: "clubs"}, {rank: "10", suit: "clubs"}]}
    ];

    // Input
    const cards = [{rank: "ace", suit: "hearts"}, {rank: "king", suit: "clubs"}, {rank: "8", suit: "hearts"},
        {rank: "queen", suit: "clubs"}, {rank: "2", suit: "hearts"}];

    // Input
    const mainPotAmount = 150;

    // Input
    const userCards = [{rank: "10", suit: "diamonds"}, {rank: "queen", suit: "spades"},
                       {rank: "4", suit: "hearts"}, {rank: "9", suit: "diamonds"}];

    // Input
    const userStackSize = 250;

    // Input
    const username = "ehmurray8";

    const options = [
        {type: OptionTypes.FOLD, amount: 0, clickFunction: (amount) => console.log("FOLD: " + amount)},
        {type: OptionTypes.CALL, amount: 2, clickFunction: (amount) => console.log("CALL: " + amount)},
        {type: OptionTypes.RAISE, amount: 4, clickFunction: (amount) => console.log("RAISE: " + amount)},
        {type: OptionTypes.ALLIN, amount: userStackSize, clickFunction: (amount) => console.log("ALL-IN: " + amount)},
    ];

    return (
        <svg
            id="main-canvas"
            preserveAspectRatio="xMaxYMax none"
            style={style}
            viewBox={viewBox}
        >
            <Players players={players}/>
            <Table />
            { mainPotAmount > 0 &&
                <Pot mainPotAmount={mainPotAmount}/>
            }
            <CommunityCards cards={cards}/>
            <UserCards cards={userCards} />
            <UserInfo stackSize={userStackSize} username={username}/>
            <UserOptions options={options} stackSize={userStackSize} stepSize={1}/>
        </svg>
    );
};

export default Canvas;