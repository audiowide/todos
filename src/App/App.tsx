import {useState, FC, MouseEvent} from 'react'
import styles from './App.module.css'
import Button from '../components/ui/Button/Button';


interface Todo {
    id: number;
    title: string;
    completed: boolean;
    mini_tasks: [];
}

interface UnderTask {
    id: number;
    title: string;
    completed: boolean;
}

const TodoApp:FC = () => {
    const [tasks, setTasks] = useState<Todo[]>([])
    const [title, setTitle] = useState('')
    const [preTitle, setPreTitle] = useState('')

    const addTodo = (e:MouseEvent<HTMLButtonElement>) => {
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

    const addUnderTask = (e:MouseEvent<HTMLButtonElement>, id: number) => {
        e.preventDefault()

        const newTask:UnderTask  = {
            id: tasks.reduce((maxId, task) => (task.id === id ? Math.max(maxId, task.mini_tasks.length) : maxId), 0) + 1,
            title: preTitle,
            completed: false,
        }
        console.log(newTask)

        setTasks((tasks: Todo[]) =>
            tasks.map(t => 
                t.id == id ? 
                    {...t, mini_tasks: [...t.mini_tasks, newTask] }:
                    t
            )
        )

        setPreTitle('')
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
                {tasks.length != 0 ? (
                    <>
                        {tasks.map((todo, index) => (
                            <div className={styles.app_pre_todo} key={index} >
                                <div 
                                    className={styles.app_task}
                                    style={todo.completed? {backgroundColor: 'rgb(244, 63, 94, .5)', opacity: .3} : {}}
                                >
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
                                    <Button 
                                        onClick={() => setTasks(tasks.filter(i => i.id !== todo.id))}
                                    >del</Button>
                                </div>
                                <div className={styles.app_under_tasks}>
                                    <div className={styles.app_task__input}>
                                        <input 
                                            type="text"
                                            placeholder='Enter name for task in task... '
                                            value={preTitle}
                                            onChange={e => setPreTitle(e.target.value)}
                                        />
                                        <Button onClick={(e) => addUnderTask(e, todo.id)}>create</Button>
                                    </div>
                                    <div className={styles.app_under_tasks_all}>
                                        {todo.mini_tasks ? (
                                            <>
                                                {todo.mini_tasks.map(t => 
                                                    <div className={styles.app_task}>
                                                        <input 
                                                            type="checkbox" 
                                                            className={styles.app_task_checkbox}
                                                            checked={t.completed} 
                                                        />
                                                        <input 
                                                            type="text" 
                                                            className={styles.app_task_input}
                                                            value={t.title}
                                                        />
                                                        <Button 
                                                        >del</Button>
                                                    </div>    
                                                )}
                                            </>
                                        ) : (
                                            <p></p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </>
                ): (
                <div className={styles.notfound} >Tasks not found</div>
                )}
            </div>
        </div>
    )
}

export default TodoApp