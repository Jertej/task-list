import React from 'react';
import PropTypes from 'prop-types';
import {SortableContainer} from 'react-sortable-hoc';
import {List} from 'material-ui/List';

import TimeTracker from './TimeTracker';
import Task from './Task';

function TasksList(props) {
  return (
    <List>
      {
        props.tasks.map((task, index) => {
          return (
            <Task
              key={task.id}
              index={index}
              onCheck={props.onCheck}
              removeTask={props.removeTask}
              task={task}
              timeTracker={<TimeTracker
                task={task}
                disabled={!!props.taskInProgress}
                taskInProgress={props.taskInProgress}
                handleStart={props.handleStart}
                handleStop={props.handleStop}
              />}
            />
          );
        })
      }
    </List>
  );
}

TasksList.propTypes = {
  tasks: PropTypes.array.isRequired,
  onCheck: PropTypes.func.isRequired,
  removeTask: PropTypes.func.isRequired,
  handleStart: PropTypes.func.isRequired,
  handleStop: PropTypes.func.isRequired,
  taskInProgress: PropTypes.number,
};

export default SortableContainer(TasksList);