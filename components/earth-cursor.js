

import React from 'react';

function isTouchDevice() {
  return matchMedia('(hover: none)').matches;
}


class EarthCursor extends React.PureComponent {

  constructor(props) {
    // set up
    super(props);

    this.state = {
      isTouchDevice: true,
      currentGlobe: '🌍',
      initialized: false
    }
  }

  componentDidMount() {
    const globes = ['🌍', '🌎', '🌏'];
    let _i = 0;
    setInterval(() => {
      _i = (_i + 1) % globes.length;
      this.setState({
        currentGlobe: globes[_i]
      });
    }, 750)
    if (!isTouchDevice()) {
      const handleMouseMove = (event) =>  {
        this.setState({
          x: +event.clientX,
          y: +event.clientY,
          isTouchDevice: false
        });
      }

      window.addEventListener("mousemove", handleMouseMove);
    }

    this.setState({initialized: true});
  }

  render() {
    const { isTouchDevice, x, y, currentGlobe, initialized } = this.state;
    if (!initialized || (!isTouchDevice && (!x || !y))) {
      return null;
    }
    return (
      <div style={{
        position: 'fixed',
        left: isTouchDevice ? null : x + 20,
        top: isTouchDevice ? null : y + 40,
        right: isTouchDevice ? null : '1em',
        bottom: isTouchDevice ? null : '1em',
        fontSize: 64,
        zIndex: 1000000
      }}>
        {currentGlobe}
      </div>
    )
  }
}
export default EarthCursor;
