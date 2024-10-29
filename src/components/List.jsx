import Item from "./Item"

export const List = ({ tasks, setTasks }) => {
    console.log(tasks);
    
    return (
        <ul>
            {tasks.map(el => <Item key={el.id} {...el} tasks={ tasks} setTasks={setTasks} />)}
        </ul>
    );
}
