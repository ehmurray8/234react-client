import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Option from "./Option";


class OptionButtons extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ...props,
        };
        this.state.update.updateFunction = () => {
            console.log("Update");
            this.setState(this.state);
        }
    }

    render() {
        return (
            <g>
                {
                    this.state.options.map((option, index) =>
                        <Option key={option.type + option.amount} option={option}
                                xCoordinate={this.state.xCoordinate + index * (this.state.width + 5)}
                                yCoordinate={this.state.yCoordinate}
                                width={this.state.width}/>
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
        clickFunction: PropTypes.func.isRequired,
    })),
    update: PropTypes.shape({
        updateFunction: PropTypes.func.isRequired,
    }).isRequired,
};


export default OptionButtons;