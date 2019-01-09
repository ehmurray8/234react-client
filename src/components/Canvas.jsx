import React from 'react';
import {backgroundColor} from "../utils/settings";
import Table from './Table';
import Players from "./Players";


const Canvas = () => {
    const style = {
        border: '1px solid black',
        backgroundColor: backgroundColor,
    };

    const gameHeight = 1000;
    const viewBox = [window.innerWidth / -2, 100 - gameHeight, window.innerWidth, gameHeight];

    const players = [{name: "Player 2", balance: 100}, {name: "Player 3", balance: 120}, {name: "Player 4", balance: 140},
        {name: "Player 5", balance: 200}, {name: "Player 6", balance: 180}, {name: "Player 7", balance: 150},
        {name: "Player 8", balance: 210}];

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