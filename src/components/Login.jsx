import React from 'react';
import PropTypes from 'prop-types';


const Login = (props) => {
    const width = 400;

    const button = {
        x: -width / 2,
        y: 325,
        width: width,
        height: width / 2,
        style: {
            fill: 'gray',
            cursor: 'pointer',
        },
        onClick: props.authenticate,
    };


    const text = {
        textAnchor: 'middle',
        x: 0,
        y: 440,
        style: {
            fontFamily: 'sans-serif',
            fontSize: 45,
            fill: '#e3e3e3',
            cursor: 'pointer',
        },
        onClick: props.authenticate,
    };


    return (
        <g filter="url(#shadow)">
            <rect {...button} />
            <text {...text} >
                Login
            </text>
        </g>
    )
};


Login.propTypes = {
    authenticate: PropTypes.func.isRequired,
};


export default Login;