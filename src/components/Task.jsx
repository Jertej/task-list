import React from 'react';
import PropTypes from 'prop-types';
import { ListItem } from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import Delete from 'material-ui/svg-icons/action/delete';
import IconButton from 'material-ui/IconButton';

export default function Task(props) {
    const {task} = props;
    return(
      <ListItem
        primaryText={task.text}
        leftCheckbox={
          <Checkbox onCheck={(event, isChecked) => {
            return props.onCheck(task.id, isChecked);
          }} checked={task.completed}/>
        }>
        <IconButton onClick={() => {
          return props.removeTask(task.id);
        }}><Delete/></IconButton>
      </ListItem>
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

