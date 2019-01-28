import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {OptionTypes} from "../utils/constants";
import OptionButtons from "./OptionButtons";


class UserOptions extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ...props
        };
        this.updateObject = {
            updateFunction: () => {},
        };
    }

    reload(state, amount) {
        if (needSlider(state)) {
            const options = state.options;
            options.filter(x => x.type === OptionTypes.BET || x.type === OptionTypes.RAISE)[0].amount =
                parseFloat(amount);
            this.updateObject.updateFunction();
        }
    }


    render() {
        const width = 150;
        const xCoordinate = 275;
        const yCoordinate = 880;

        let minValue = 0;
        if (needSlider(this.props)) {
            minValue = this.props.options.filter(x => x.type === OptionTypes.RAISE || x.type === OptionTypes.BET)[0].amount;
        }

        const sliderWidth = 400;
        const sliderHeight = 30;

        const sliderStyle = {
            width: sliderWidth,
            height: sliderHeight,
            cursor: "pointer",
            background: "#d3d3d3",
        };

        return (
            <g>
                { needSlider(this.props) &&
                    <foreignObject x={xCoordinate} y={yCoordinate - 50} width={sliderWidth} height={sliderHeight}>
                        <input id='bet-slider' type="range" min={minValue} max={this.props.stackSize}
                               step={this.props.stepSize} style={sliderStyle}
                               defaultValue={minValue} onChange={() => {
                                   const value = document.getElementById('bet-slider').value;
                                   document.getElementById('bet-text-input').value = value;
                                   this.reload(this.props, value);
                        }}/>
                    </foreignObject>
                }
                { needSlider(this.props) &&
                    <foreignObject x={xCoordinate + sliderWidth + 10} y={yCoordinate - 50} width={sliderHeight * 3} height={sliderHeight * 3}>
                        <input id='bet-text-input' type="number" min={minValue} max={this.props.stackSize} step={this.props.stepSize}
                               defaultValue={minValue} onChange={() => {
                                   const value = document.getElementById('bet-text-input').value;
                                   document.getElementById('bet-slider').value = value;
                                   this.reload(this.props, value);
                        }} />
                    </foreignObject>
                }
                <OptionButtons options={this.props.options} yCoordinate={yCoordinate} xCoordinate={xCoordinate}
                               width={width} update={this.updateObject} selectOption={this.props.selectOption}/>
            </g>
        );
    }
}

function needSlider(props) {
    return props.options.map((element) => element.type)
        .filter(x => x === OptionTypes.BET || x === OptionTypes.RAISE).length > 0;
}



UserOptions.propTypes = {
    options: PropTypes.arrayOf(PropTypes.shape({
        amount: PropTypes.number.isRequired,
        type: PropTypes.string.isRequired,
    })),
    stackSize: PropTypes.number,
    stepSize: PropTypes.number,
    selectOption: PropTypes.func,
};


export default UserOptions;
