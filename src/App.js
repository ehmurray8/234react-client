import React, { Component } from 'react';
import './App.css';
import PropTypes from 'prop-types';
import Canvas from "./components/Canvas";


class App extends Component {

  componentDidMount() {

   // Allows the app to be responsive to window size changes
   window.onresize = () => {
       const canvas = document.getElementById('main-canvas');
       canvas.style.width = `${window.innerWidth}px`;
       canvas.style.height = `${window.innerHeight}px`;
   };

    window.onresize();
  }

  render() {
    return (
        <Canvas/>
    );
  }
}


App.propTypes = {
  message: PropTypes.string.isRequired,
};


export default App;
