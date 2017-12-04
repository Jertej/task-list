import React from 'react';
import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';
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

  componentWillMount() {
    const {task: {timeData}} = this.props;
    this.setState(timeData);
  }

  handleStart = () => {
    this.setState({
      running: true,
      lastTick: Date.now(),
    });
    this.props.handleStart(this.props.task.id);
  };
  handleStop = () => {
    const {state: timeData, props: {task}} = this;
    this.props.handleStop(task.id, timeData);
    this.setState({running: false});
  };

  format(milliseconds) {
    let totalSeconds = Math.floor(milliseconds / 1000);
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;

    return `${minutes > 9 ? minutes : '0' + minutes}:${seconds > 9 ? seconds : '0' + seconds}`;
  }

  componentDidMount() {
    this.interval = setInterval(this.tick, 1000);
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
        <IconButton disabled={this.props.disabled} onClick={this.handleStart}><PlayArrow color="black"/></IconButton>
        <IconButton onClick={this.handleStop}><Stop color="black"/></IconButton>
      </section>
    );
  }
}

TimerTask.propTypes = {
  handleStart: PropTypes.func.isRequired,
  handleStop: PropTypes.func.isRequired,
  taskInProgress: PropTypes.number,
  task: PropTypes.shape({
    id: PropTypes.number,
    text: PropTypes.string,
    completed: PropTypes.bool,
  }).isRequired,
};
export default TimerTask;