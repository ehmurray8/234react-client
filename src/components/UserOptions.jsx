import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {OptionTypes} from "../utils/constants";
import OptionButtons from "./OptionButtons";


class UserOptions extends Component {

    constructor(props) {
        super(props);
        this.state = {
            options: props.options,
            stackSize: props.stackSize,
            stepSize: props.stepSize,
        };
        this.updateObject = {
            updateFunction: () => {},
        };
    }

    reload(state) {
        if (needSlider(state)) {
            const options = state.options;
            const betSlider = document.getElementById('bet-slider');
            const amount = betSlider.value;
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
        if (needSlider(this.state)) {
            minValue = this.state.options.filter(x => x.type === OptionTypes.RAISE)[0].amount;
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
                {needSlider(this.state) &&
                    <foreignObject x={xCoordinate} y={yCoordinate - 50} width={sliderWidth} height={sliderHeight}>
                        <input id='bet-slider' type="range" min={minValue} max={this.state.stackSize} step={this.state.stepSize}
                               style={sliderStyle} defaultValue={minValue} onChange={() => this.reload(this.state)}/>
                    </foreignObject>
                }
                <OptionButtons options={this.props.options} yCoordinate={yCoordinate} xCoordinate={xCoordinate}
                               width={width} update={this.updateObject} clickFunction={this.state.clickFunction}/>
            </g>
        );
    }
}

function needSlider(state) {
        return state.options.map((element) => element.type)
            .filter(x => x === OptionTypes.BET || x === OptionTypes.RAISE).length > 0;
    }



UserOptions.propTypes = {
    options: PropTypes.arrayOf(PropTypes.shape({
        amount: PropTypes.number.isRequired,
        type: PropTypes.string.isRequired,
    })),
    stackSize: PropTypes.number,
    stepSize: PropTypes.number,
};


export default UserOptions;
