import React from 'react';
import PropTypes from 'prop-types';


const height = 175;
const width = 50;

let intervalId;

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

    const currentTimestamp = new Date().getTime();
    if (props.endTime && props.maxSeconds && props.endTime - currentTimestamp > 0) {
        refresh(props.endTime, props.maxSeconds);
    } else {
        try {
            document.getElementById('bar').style.height = "0";
        } catch (err) {};
    }

    return (
        <g>
           { props.endTime && props.endTime - currentTimestamp > 0 &&
                <foreignObject x={xCoordinate} y={yCoordinate} height={height} width={width}>
                    <div style={outerStyle}>
                        <div id="bar" style={barStyle}/>
                    </div>
                </foreignObject>
            }
        </g>
    )
};


function refresh(endTime, maxSeconds) {
    let barHeight = height;
    const interval = 500;
    const multiplier = 1000 / interval;

    const currentTimestamp = new Date().getTime();
    const timeLeft = Math.floor((endTime - currentTimestamp) / 1000);

    barHeight = Math.floor(height * (timeLeft / maxSeconds));

    const decrement = height / (timeLeft * multiplier);
    const lowZone = height * .4;

    if (intervalId) {
        clearInterval(intervalId);
    }

    intervalId = setInterval(() => {
        barHeight -= decrement;
        let barElement;
        try {
            barElement = document.getElementById("bar");
        } catch (err) { }

        if (!barElement) {
            clearInterval(intervalId);
        } else {
            barElement.style.height = barHeight + "px";
            if (barHeight <= lowZone) {
                barElement.style.background = 'red';
            }
            if (barHeight <= 0) {
                clearInterval(intervalId);
            }
        }

    }, interval);
}


TimeBar.propTypes = {
    endTime: PropTypes.number,
    maxSeconds: PropTypes.number,
};


export default TimeBar;