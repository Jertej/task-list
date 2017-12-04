import React from 'react';
import IconButton from 'material-ui/IconButton';
import Pause from 'material-ui/svg-icons/av/pause';
import PlayArrow from 'material-ui/svg-icons/av/play-arrow';
import Stop from 'material-ui/svg-icons/av/stop';


class TimerTask extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      running: false,
      elapsed: 0,
      lastTick: 0,
    }
  }

  handleStart = () => {
    this.setState({
      running: true,
      lastTick: Date.now(),
    });
  };
  handleStop = () => {
    this.setState({
      running: false,
      elapsed: 0,
      lastTick: 0,
    });
  };
  handlePause = () => {
    this.setState({running: false});
  };

  format(milliseconds) {
    let totalSeconds = Math.floor(milliseconds / 1000);
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;

    return `${minutes > 9 ? minutes : '0' + minutes}:${seconds > 9 ? seconds : '0' + seconds}`;
  }

  componentDidMount() {
    this.interval = setInterval(this.tick, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  tick = () => {
    if (this.state.running) {
      let now = Date.now();
      let diff = now - this.state.lastTick;

      this.setState({
        elapsed: this.state.elapsed + diff,
        lastTick: now,
      })
    }
  };
  render() {
    let timeTask = this.format(this.state.elapsed);
    return (
      <section className="stopwatch">
        <div className="stopwatch-time">{timeTask}</div>
        <div className="stopwatch-controls">
          {this.state.running ?
            <IconButton onClick={this.handlePause}><Pause color={"black"}/></IconButton>
            :
            <IconButton onClick={this.handleStart}><PlayArrow color={"black"}/></IconButton>
          }
          <IconButton onClick={this.handleStop}><Stop color={"black"}/></IconButton>
        </div>
      </section>
    );
  }
}

export default TimerTask;