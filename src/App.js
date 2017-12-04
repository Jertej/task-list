import React, {Component} from 'react';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import Add from 'material-ui/svg-icons/content/add';
import {List} from 'material-ui/List';
import TimeTracker from "./components/TimeTracker";
import Task from "./components/Task";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      newTask: {
        id: Date.now(),
        text: '',
        completed: false,
        timeData: {
          lastTick: 0,
          elapsed: 0,
          running: false,
        }
      },
      taskInProgress: null,
    }
  }
  onCheck = (id, isChecked) => {
    const {tasks} = this.state;
    const currentTask = tasks.find((task) => {
      return task.id === id;
    });
    if (currentTask) {
      currentTask.completed = isChecked;
    }
    this.setState({tasks});
  };
  onChange = (event, newValue) => {
    this.setState({
      newTask: {
        id: Date.now(),
        text: newValue,
      },
    });
  };
  addTask = () => {
    const {newTask, tasks} = this.state;
    tasks.push(newTask);
    this.setState({
      tasks,
      newTask: {
        id: Date.now(),
        text: '',
        completed: false,
        timeData: {
          lastTick: 0,
          elapsed: 0,
          running: false,
        }
      },
    });
  };
  removeTask(id) {
    const {tasks} = this.state;
    const taskIndex = tasks.findIndex((task) => {
      return task.id === id;
    });
    if (taskIndex >= 0) {
      tasks.splice(taskIndex, 1);
    }
    this.setState({tasks});
  }

  handleStop = (id, timeData) => {
    const { tasks } = this.state;
    const currentTask = tasks.find(task => task.id === id);
    if (currentTask) {
      currentTask.timeData = timeData;
    }
    debugger
    this.setState({ tasks, taskInProgress: null });
  };

  handleStart = (id) => {
    if (!this.state.taskInProgress) {
      this.setState({ taskInProgress: id });
    }
  };

  render() {
    return (
      <MuiThemeProvider>
        <Paper>
          <header>
            <h1>Список завдань:</h1>
          </header>
          <section className="todo-list">
            <List>
              {
                this.state.tasks.map((task) => {
                  return (
                    <div key={task.id}>
                      <Task onCheck={this.onCheck} removeTask={this.removeTask} task={task}/>
                      <TimeTracker
                        task={task}
                        taskInProgress={this.state.taskInProgress}
                        handleStart={this.handleStart}
                        handleStop={this.handleStop}
                      />
                    </div>
                  );
                })
              }
              <div>
                <div>
                  <TextField
                    fullWidth
                    floatingLabelText="Що потрібно зробити?"
                    onChange={this.onChange}
                    value={this.state.newTask.text}
                  />
                </div>
                <div>
                  <IconButton onClick={this.addTask} disabled={!this.state.newTask.text}><Add/></IconButton>
                </div>
              </div>
            </List>
          </section>
        </Paper>
      </MuiThemeProvider>
    );
  }
}

export default App;
