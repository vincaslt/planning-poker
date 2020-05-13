import React, { useState } from 'react';
import Sidebar from '../../../components/Sidebar';
import Icon from '../../../components/Icon';
import EstimationSession from '../../../state/estimationSession';
import Connection from '../../../state/connection';
import Task from './Task';
import Button from '../../../components/Button';

interface Props {
  selected?: string;
  onSelect: (taskId: string) => void;
}

function Tasks({ onSelect, selected }: Props) {
  const [addingTask, setAddingTask] = useState(false);
  const { estimationSession } = EstimationSession.useContainer();
  const { addTask, renameTask } = Connection.useContainer();

  const tasks = Object.values(estimationSession?.tasks ?? []).reverse();
  const unestimated = tasks.filter((task) => task.estimate === undefined);
  const estimated = tasks.filter((task) => task.estimate !== undefined);

  const handleAddTask = () => {
    setAddingTask(true);
  };

  const handleClickTask = (taskId: string) => () => {
    onSelect(taskId);
  };

  return (
    <Sidebar>
      {addingTask ? (
        <Task
          editable={false}
          onChange={(value) => {
            setAddingTask(false);
            if (value) {
              addTask(value);
            }
          }}
        />
      ) : (
        <Button
          type="custom"
          className="w-full bg-gray-800 text-white mb-2 hover:bg-gray-900 hover:text-gray-100"
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            handleAddTask();
          }}
        >
          <Icon name="plus" size="xs" className="mr-2" />
          <span>Add task</span>
        </Button>
      )}
      {[...unestimated, ...estimated].map((task) => (
        <Task
          key={task.id}
          status={
            selected === task.id
              ? task.estimate !== undefined
                ? 'selected'
                : 'active'
              : undefined
          }
          name={task.name}
          estimate={task.estimate}
          onClick={handleClickTask(task.id)}
          onChange={(value) => {
            if (value) {
              renameTask(task.id, value);
            }
          }}
        />
      ))}
    </Sidebar>
  );
}

export default Tasks;
