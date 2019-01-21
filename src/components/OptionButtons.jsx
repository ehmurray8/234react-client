import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Option from "./Option";


class OptionButtons extends Component {

    render() {
        return (
            <g>
                {
                    this.props.options.map((option, index) =>
                        <Option key={option.type + option.amount} option={option}
                                xCoordinate={this.props.xCoordinate + index * (this.props.width + 5)}
                                yCoordinate={this.props.yCoordinate}
                                width={this.props.width} selectOption={this.props.selectOption}/>
                    )
                }
            </g>
        );
    }
}

OptionButtons.propTypes = {
    xCoordinate: PropTypes.number.isRequired,
    yCoordinate: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    options: PropTypes.arrayOf(PropTypes.shape({
        amount: PropTypes.number.isRequired,
        type: PropTypes.string.isRequired,
    })),
    selectOption: PropTypes.func,
};


export default OptionButtons;
