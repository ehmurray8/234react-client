import React from 'react';
import PropTypes from 'prop-types';
import Settings from "../utils/settings";
import {OptionTypes} from "../utils/constants";


const Option = (props) => {
    const width = props.width;
    const height = 100;

    const textStyle = {
        fill: Settings.mainTextColor,
        font: "24px bold sans-serif",
        cursor: "pointer",
    };

    const backgroundStyle = {
        fill: Settings.mainBackgroundColor,
        cursor: "pointer",
    };

    let optionType = props.option.type;
    let optionAmount = props.option.amount;

    let amountTextBox = true;
    if (optionType === OptionTypes.CHECK || optionType === OptionTypes.FOLD) {
        amountTextBox = false;
    }

    let optionTypeString = capitalize(optionType);
    if (optionType === OptionTypes.ALLIN) {
        optionTypeString = "All-in";
    }

    const radius = width/8;

    return (
        <g>
            <rect x={props.xCoordinate} y={props.yCoordinate} height={height} width={width} rx={radius}
                  ry={radius} style={backgroundStyle} onClick={() => props.selectOption(props.option.type, optionAmount)}/>
            { amountTextBox &&
                <text x={props.xCoordinate + 15} y={props.yCoordinate + 50} style={textStyle}
                      onClick={() => props.selectOption(props.option.type, optionAmount)}>{optionTypeString}</text>
            }
            { amountTextBox &&
                <text x={props.xCoordinate + 15} y={props.yCoordinate + 80} style={textStyle}
                      onClick={() => props.selectOption(props.option.type, optionAmount)}>{"$" + optionAmount}</text>
            }
            { !amountTextBox &&
                <text x={props.xCoordinate + 15} y={props.yCoordinate + 50} style={textStyle}
                      onClick={() => props.selectOption(props.option.type, optionAmount)}>{optionTypeString}</text>
            }
        </g>
    );
};


const capitalize = (str) => {
    if (typeof str !== 'string') return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
};


Option.propTypes = {
    option: PropTypes.shape({
        amount: PropTypes.number.isRequired,
        type: PropTypes.string.isRequired,
    }).isRequired,
    xCoordinate: PropTypes.number.isRequired,
    yCoordinate: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    selectOption: PropTypes.func,
};


export default Option;