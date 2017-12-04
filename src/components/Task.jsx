import React from 'react';
import PropTypes from 'prop-types';
import {ListItem} from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import Delete from 'material-ui/svg-icons/action/delete';
import IconButton from 'material-ui/IconButton';
import {SortableElement} from 'react-sortable-hoc';

function Task(props) {
  const {task} = props;
  const leftCheckBox = (
    <Checkbox
      checked={task.completed}
      onCheck={(event, isChecked) => {
        return props.onCheck(task.id, isChecked);
      }}
    />
  );
  const rightIconButton = (
    <IconButton
      onClick={() => {
        return props.removeTask(task.id);
      }}
    >
      <Delete/>
    </IconButton>
  );

  const { timeTracker } = props;
  return (
    <div className="task-container">
      <ListItem
        primaryText={task.text}
        leftCheckbox={leftCheckBox}
        rightIconButton={rightIconButton}
      />
      {timeTracker}
    </div>
  );
}

Task.propTypes = {
  onCheck: PropTypes.func.isRequired,
  removeTask: PropTypes.func.isRequired,
  task: PropTypes.shape({
    id: PropTypes.number,
    text: PropTypes.string,
    completed: PropTypes.bool,
  }).isRequired,
};

export default SortableElement(Task);

