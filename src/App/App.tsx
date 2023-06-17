import {useState, FC} from 'react'
import styles from './App.module.css'


interface Todo {
    id: number;
    title: string;
    completed: boolean;
    mini_tasks: [];
}

const TodoApp:FC = () => {
    const [tasks, setTasks] = useState<Todo[]>([])
    const [title, setTitle] = useState('')

    const addTodo = (e) => {
        e.preventDefault()

        if (title.length > 0) {
            const newTask: Todo = {
                id: tasks.length + 1,
                title: title,
                completed: false,
                mini_tasks: []
            }

            setTasks([...tasks, newTask])
            setTitle('')
        }
    }

    return (
        <div className={styles.app} >
            <form>
                <input 
                    type="text" 
                    onChange={(e) => setTitle(e.target.value)}
                    value={title} 
                    placeholder='enter todo title...'
                />
                <button onClick={e => addTodo(e)}>create</button>
            </form>
            <div className={styles.app_tasks}>
                {tasks? (
                    <>
                        {tasks.map((todo, index) => (
                            <div key={index} className={styles.app_task}>
                                <input 
                                    type="checkbox" 
                                    className={styles.app_task_checkbox}
                                    checked={todo.completed} 
                                    onChange={() => setTasks(tasks.map(t => t.id == todo.id? {...t, completed:!todo.completed} : t))}
                                />
                                <input 
                                    type="text" 
                                    className={styles.app_task_input}
                                    value={todo.title}
                                    onChange = {(e) => setTasks(tasks.map(t => t.id == todo.id? {...t, title: e.target.value} : t))}
                                />
                            </div>
                        ))}
                    </>
                ): (<p>todos not found</p>)}
            </div>
        </div>
    )
}

export default TodoApp