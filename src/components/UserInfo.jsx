import React from 'react';
import PropTypes from 'prop-types';
import Settings from "../utils/settings";


const UserInfo = (props) => {
    const xCoordinate = -875;
    const yCoordinate = 800;

    const style = {
        fill: Settings.mainTextColor,
        font: 'bold 24px sans-serif',
    };

    return (
       <g>
           <rect x={xCoordinate} y={yCoordinate} height={175} width={400} fill={Settings.mainBackgroundColor}/>
           <text x={xCoordinate + 25} y={yCoordinate + 50} style={style}>{props.username}</text>
           <text x={xCoordinate + 25} y={yCoordinate + 125} style={style}>{"$" + props.stackSize}</text>
       </g>
    );
};

UserInfo.propTypes = {
    stackSize: PropTypes.number.isRequired,
    username: PropTypes.string.isRequired,
};


export default UserInfo;