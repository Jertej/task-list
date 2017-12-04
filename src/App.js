import React, {Component} from 'react';
import './App.css';
import Checkbox from 'material-ui/Checkbox';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import Add from 'material-ui/svg-icons/content/add';
import {List, ListItem} from 'material-ui/List';
import Delete from 'material-ui/svg-icons/action/delete';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      newTask: {
        id: Date.now(),
        text: '',
        completed: false,
      },
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
    tasks.unshift(newTask);
    this.setState({
      tasks,
      newTask: {
        id: Date.now(),
        text: '',
        completed: false
      }
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
  render() {
    return (
      <MuiThemeProvider>
        <Paper>
          <header>
            <h1>Завдання:</h1>
          </header>
          <section className="todo-list">
            <List>
              {
                this.state.tasks.map((task) => {
                  return (
                    <ListItem
                      key={task.id}
                      primaryText={task.text}
                      leftCheckbox={<Checkbox onCheck={(event, isChecked) => {
                        return this.onCheck(task.id, isChecked);
                      }} checked={task.completed}/>}>
                      <IconButton onClick={() => {
                        return this.removeTask(task.id);
                      }}><Delete/></IconButton>
                    </ListItem>
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
