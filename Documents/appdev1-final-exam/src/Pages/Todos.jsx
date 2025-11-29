import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchTodos } from "../Reducer/todosSlice";
import AddTodoForm from "../Components/AddtodoForm";
import TodoList from "../Components/TodoList";

function Todos () {
    const dispatch = useDispatch()
    const todos = useSelector(state => state.todos.items)

    useEffect(() => {
        dispatch(fetchTodos())
    }, [dispatch])

    return (
        <div>
            <h1>Todos</h1>
            <AddTodoForm />
            <TodoList todos={todos} />
        </div>
    )
}

export default Todos

