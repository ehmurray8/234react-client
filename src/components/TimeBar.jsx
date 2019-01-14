import React from 'react';
import PropTypes from 'prop-types';


const height = 175;
const width = 50;

const TimeBar = (props) => {
    const outerStyle = {
        width: width,
        height: height,
        border: "4px solid black",
        margin: "auto",
        transform: "rotate(180deg)",
    };

    const barStyle = {
        width: width,
        height: height,
        background: 'green',
    };

    const xCoordinate = -475 - width;
    const yCoordinate = 800;

    if (props.maxSeconds) {
        refresh(props.maxSeconds);
    }

    return (
        <g>
           { props.maxSeconds &&
                <foreignObject x={xCoordinate} y={yCoordinate} height={height} width={width}>
                    <div style={outerStyle}>
                        <div id="bar" style={barStyle}/>
                    </div>
                </foreignObject>
            }
        </g>
    )
};


function refresh(maxSeconds) {
    let barHeight = height;
    const interval = 500;
    const multiplier = 1000 / interval;

    const decrement = height / (maxSeconds * multiplier);
    const lowZone = height * .4;

    let intervalId = setInterval(() => {
        barHeight -= decrement;
        const barElement = document.getElementById("bar");
        barElement.style.height = barHeight + "px";
        if (barHeight <= lowZone) {
            barElement.style.background = 'red';
        }
        if (barHeight <= 0) {
            clearInterval(intervalId);
        }
    }, interval);
}


TimeBar.propTypes = {
    maxSeconds: PropTypes.number,
};


export default TimeBar;