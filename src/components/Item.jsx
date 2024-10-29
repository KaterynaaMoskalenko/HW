import { useState } from "react";

export default function Item({ title, id, status, tasks, setTasks, taskTime }) {
  const [checked, setChecked] = useState(status);
  const [isEdit, setIsEdit] = useState(false);
  const [taskEdit, setTaskEdit] = useState(title);

  const classes = ["todo"];
  if (checked) {
    classes.push("status");
  }

  const onUpdateStatus = () => {
    setChecked(!checked);
    tasks.map((item) => {
      if (item.id === id) {
        item.status = !checked;
      }

      return true;
    });

    setTasks([...tasks]);
  };

  const formatDate = (taskTime) => {
    const time = new Date(taskTime);
    return isNaN(time)
      ? "Invalid Date"
      : time.toLocaleDateString() +
          " " +
          time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }); // дата та час - без секунд
  };
  const onRemoveItem = () => {
    setTasks(tasks.filter((item) => item.id !== id)); // видаляє елемент списку
  };

  const onSaveItem = () => {
    const modifiedTasks = tasks.map((item) => {
      if (item.id === id) {
        return { ...item, title: taskEdit };
      }

      return item;
    });

    setTasks(modifiedTasks);

    setIsEdit(false);
  };

  const onEditItem = (e) => {
    setTaskEdit(e.target.value);
  };

  if (isEdit) {
    return (
      <li className={classes.join(" ")}>
        <div>
          <label>
            <input type="text" value={taskEdit} onChange={onEditItem} />
          </label>
          <button onClick={onSaveItem}>Save</button>
          <i className="material-icons red-text" onClick={onRemoveItem}>
            X
          </i>
        </div>
      </li>
    );
  } else {
    return (
      <li className={classes.join(" ")}>
        <div>
          <label>
            <input
              type="checkbox"
              checked={checked}
              onChange={onUpdateStatus}
            />
            <span>
              {title} - <small>{formatDate(taskTime)}</small>
            </span>
          </label>
          <button onClick={() => setIsEdit(true)}>Edit</button>
          <i className="material-icons red-text" onClick={onRemoveItem}>
            X
          </i>
        </div>
      </li>
    );
  }
}
