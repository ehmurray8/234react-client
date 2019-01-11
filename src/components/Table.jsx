import React from 'react';
import {feltColor} from "../utils/settings";
import {tableHeight, tableWidth} from "../utils/constants";


const Table = () => {
    const style = {
        fill: feltColor,
        stroke: 'black',
        strokeWidth: 2,
    };

    const radius = 250;

    return (
        <rect
            x={-tableWidth / 2} y={225}
            rx={radius} ry={radius}
            width={tableWidth} height={tableHeight}
            style={style}
        />
    );
};

export default Table;
