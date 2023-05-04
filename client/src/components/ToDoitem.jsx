const ToDoItem = ({ task, onDelete, onUpdate }) => {
  return (
    <div className="box">
      <div>{task.challenge}</div>
      <button onClick={() => onUpdate(task._id)}>updated text</button>
      <button onClick={() => onDelete(task._id)}>&times;</button>
    </div>
  );
};

export default ToDoItem;
