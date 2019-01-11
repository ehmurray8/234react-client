import React from 'react';
import {backgroundColor} from "../utils/settings";
import Table from './Table';
import Players from "./Players";
import {gameHeight, gameWidth} from "../utils/constants";


const Canvas = () => {
    const style = {
        border: '1px solid black',
        backgroundColor: backgroundColor,
    };

    const viewBox = [gameWidth / -2, 0, gameWidth, gameHeight];
    const defaultCards = [null, null];

    const players = [
        {name: "Player 2", balance: 100, cards: [{rank: "ace", suit: "clubs"}, {rank: "ace", suit: "diamonds"}]},
        {name: "Player 3", balance: 120, cards: [{rank: "king", suit: "hearts"}, {rank: "king", suit: "diamonds"}]},
        {name: "Player 4", balance: 140, cards: []},
        {name: "Player 5", balance: 200, cards: []},
        {name: "Player 6", balance: 180, cards: defaultCards},
        {name: "Player 7", balance: 150, cards: [{rank: "7", suit: "hearts"}, {rank: "6", suit: "hearts"}]},
        {name: "Player 8", balance: 210, cards: [{rank: "jack", suit: "clubs"}, {rank: "10", suit: "clubs"}]}
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
        </svg>
    );
};

export default Canvas;