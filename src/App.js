import React, {Component} from 'react';
import './App.css';
import Checkbox from 'material-ui/Checkbox';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import Add from 'material-ui/svg-icons/content/add';
import {List, ListItem} from 'material-ui/List';

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

  render() {
    return (
      <MuiThemeProvider>
        <Paper>
          <header>
            <h1>Завдання:</h1>
          </header>

          <div>
            <TextField fullWidth floatingLabelText="Напишіть завдання" onChange={this.onChange} value={this.state.newTask.text}/>
            <IconButton onClick={this.addTask} disabled={!this.state.newTask.text}><Add/></IconButton>
          </div>
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
                      }} checked={task.completed}/>}
                    />
                  );
                })
              }

            </List>
          </section>
        </Paper>
      </MuiThemeProvider>
    );
  }
}

export default App;
